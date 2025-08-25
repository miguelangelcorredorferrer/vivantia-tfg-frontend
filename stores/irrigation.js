import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import IrrigationAPI from '~/api/IrrigationAPI'
import { useUserStore } from './user'
import { useCropStore } from './crop'
// Las notificaciones se manejan via alertas de base de datos, no toasts

export const useIrrigationStore = defineStore('irrigation', () => {
  // Estado
  const activeMode = ref(null) // 'manual', 'automatic', 'programmed'
  const irrigationConfig = ref(null)
  const specificConfig = ref(null) // irrigation_config (manual), automatic_settings, programmed_settings
  const activePumpActivation = ref(null)
  const lastCompletedConfig = ref(null) // Última configuración completada para mostrar último riego
  const isLoading = ref(false)
  const error = ref(null)
  


  // Intervalos para actualizaciones en tiempo real
  let statusInterval = null
  let countdownInterval = null

  // Stores auxiliares
  const userStore = useUserStore()
  const cropStore = useCropStore()
  
  // Las notificaciones se manejan via alertas de base de datos

  // Computeds
  const hasActiveMode = computed(() => activeMode.value !== null)
  const isManualActive = computed(() => activeMode.value === 'manual')
  const isAutomaticActive = computed(() => activeMode.value === 'automatic')
  const isProgrammedActive = computed(() => activeMode.value === 'programmed')
  
  const isWatering = computed(() => {
    return activePumpActivation.value?.status === 'active'
  })
  
  const isPaused = computed(() => {
    return activePumpActivation.value?.status === 'paused'
  })
  
  const isCompleted = computed(() => {
    return activePumpActivation.value?.status === 'completed'
  })

  const isProgrammedWaiting = computed(() => {
    return activePumpActivation.value?.status === 'programmed'
  })

  // Tiempo restante hasta próxima activación (para daily y custom)
  const timeUntilNextExecution = ref(null)
  
  const nextExecutionFormatted = computed(() => {
    if (!specificConfig.value?.next_execution) return null
    
    try {
      const nextDate = new Date(specificConfig.value.next_execution)
      return nextDate.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (err) {
      console.error('Error formateando next_execution:', err)
      return null
    }
  })

  // Variable para controlar auto-completado (evitar múltiples ejecuciones)
  const autoCompletionTriggered = ref(false)

  // Tiempo restante calculado en tiempo real
  const remainingTime = computed(() => {
    if (!activePumpActivation.value || !isWatering.value) {
      return null
    }

    const startTime = new Date(activePumpActivation.value.started_at)
    const now = new Date()
    const elapsedSeconds = Math.floor((now - startTime) / 1000)
    const durationMinutes = parseFloat(activePumpActivation.value.duration_minutes) || 0
    const totalSeconds = durationMinutes * 60
    const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds)

    // 🚨 AUTO-COMPLETAR cuando llega a 0 (solo una vez por activación)
    if (remainingSeconds <= 0 && 
        activePumpActivation.value.status === 'active' && 
        !autoCompletionTriggered.value) {
      
      console.log('🚨 TIEMPO AGOTADO - Auto-completando riego (ID:', activePumpActivation.value.id, ')')
      autoCompletionTriggered.value = true
      
      // Guardar ID antes de ejecutar para logging
      const activationId = activePumpActivation.value.id
      
      // Ejecutar inmediatamente con protección adicional
      completeIrrigation().then(() => {
        console.log('✅ Auto-completado ejecutado exitosamente para ID:', activationId)
      }).catch((error) => {
        console.error('❌ Error en auto-completado:', error)
        // NO reintentar automáticamente para evitar loops
      })
    }

    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = remainingSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  // Watcher adicional para forzar reactividad del remainingTime
  let timeUpdateInterval = null
  
  const startTimeUpdates = () => {
    if (timeUpdateInterval) clearInterval(timeUpdateInterval)
    
    timeUpdateInterval = setInterval(() => {
      if (activePumpActivation.value && isWatering.value) {
        // Forzar re-evaluación del computed accediendo a él
        const currentTime = remainingTime.value
        
        // Debug
        if (currentTime === '0:00' && activePumpActivation.value.status === 'active') {
          console.log('⏰ Detectado 0:00 con bomba activa')
        }
      } else {
        // Detener updates si no hay riego activo
        if (timeUpdateInterval) {
          clearInterval(timeUpdateInterval)
          timeUpdateInterval = null
        }
      }
    }, 1000) // Cada segundo
  }
  
  const stopTimeUpdates = () => {
    if (timeUpdateInterval) {
      clearInterval(timeUpdateInterval)
      timeUpdateInterval = null
    }
  }

  // Watcher para reiniciar autoCompletionTriggered cuando cambie la activación
  watch(() => activePumpActivation.value?.id, (newId, oldId) => {
    if (newId !== oldId) {
      console.log('🔄 Nueva activación detectada - reiniciando autoCompletionTriggered')
      autoCompletionTriggered.value = false
    }
  })

  // Último riego formateado
  const lastIrrigation = computed(() => {
    // Primero verificar si hay configuración activa con último riego
    if (irrigationConfig.value?.last_irrigation_at) {
      const lastDate = new Date(irrigationConfig.value.last_irrigation_at)
      const now = new Date()
      const diffHours = Math.floor((now - lastDate) / (1000 * 60 * 60))

      if (diffHours < 1) {
        return 'Hace menos de 1 hora'
      } else if (diffHours < 24) {
        return `Hace ${diffHours} horas`
      } else {
        const diffDays = Math.floor(diffHours / 24)
        return `Hace ${diffDays} días`
      }
    }

    // Si no hay configuración activa, buscar en la última configuración completada
    if (lastCompletedConfig.value?.last_irrigation_at) {
      const lastDate = new Date(lastCompletedConfig.value.last_irrigation_at)
      const now = new Date()
      const diffHours = Math.floor((now - lastDate) / (1000 * 60 * 60))

      if (diffHours < 1) {
        return 'Hace menos de 1 hora'
      } else if (diffHours < 24) {
        return `Hace ${diffHours} horas`
      } else {
        const diffDays = Math.floor(diffHours / 24)
        return `Hace ${diffDays} días`
      }
    }

    return 'Nunca'
  })

  const canAccessMode = computed(() => (mode) => {
    return !hasActiveMode.value || activeMode.value === mode
  })

  const canAccessManualMode = computed(() => {
    return !hasActiveMode.value || activeMode.value === 'manual'
  })

  const canAccessAutomaticMode = computed(() => {
    return !hasActiveMode.value || activeMode.value === 'automatic'
  })

  const canAccessProgrammedMode = computed(() => {
    return !hasActiveMode.value || activeMode.value === 'programmed'
  })

  // Actions

  // Buscar configuración manual existente por usuario y cultivo
  const findManualConfigByUserAndCrop = async (userId, cropId) => {
    try {
      console.log('🔍 Buscando configuración manual para usuario:', userId, 'cultivo:', cropId)
      
      const response = await IrrigationAPI.getIrrigationConfigsByUserAndType(userId, 'manual')
      
      if (response.success && response.data.length > 0) {
        // Buscar configuración que coincida con el cultivo
        const existingConfig = response.data.find(config => config.crop_id === cropId)
        
        if (existingConfig) {
          console.log('✅ Configuración manual encontrada:', existingConfig.id)
          return existingConfig
        }
      }
      
      console.log('❌ No se encontró configuración manual existente')
      return null
    } catch (err) {
      console.error('Error buscando configuración manual:', err)
      return null
    }
  }

  // Cargar última configuración completada
  const loadLastCompletedConfiguration = async () => {
    try {
      if (!userStore.user?.id) return

      // Buscar la última configuración que tenga last_irrigation_at
      const response = await IrrigationAPI.getIrrigationConfigsByUserAndType(userStore.user.id, 'manual')
      
      if (response.success && response.data.length > 0) {
        // Buscar la que tenga last_irrigation_at más reciente
        const configsWithLastIrrigation = response.data.filter(config => config.last_irrigation_at)
        
        if (configsWithLastIrrigation.length > 0) {
          const latestConfig = configsWithLastIrrigation.reduce((latest, current) => {
            return new Date(current.last_irrigation_at) > new Date(latest.last_irrigation_at) ? current : latest
          })
          
          lastCompletedConfig.value = latestConfig
          console.log('✅ Última configuración completada cargada:', latestConfig.last_irrigation_at)
        }
      }
    } catch (err) {
      console.error('Error loading last completed configuration:', err)
    }
  }

  // Cargar configuración activa del usuario
  const loadActiveConfiguration = async () => {
    try {

      
      isLoading.value = true
      error.value = null

      if (!userStore.user?.id) {
        throw new Error('Usuario no autenticado')
      }

      // Cargar última configuración completada para mostrar último riego
      await loadLastCompletedConfiguration()

      // Obtener configuraciones activas
      const response = await IrrigationAPI.getActiveIrrigationConfigsByUser(userStore.user.id)
      
      let foundActiveConfig = false
      
      if (response.success && response.data.length > 0) {
        const config = response.data[0] // Solo puede haber una activa
        irrigationConfig.value = config
        activeMode.value = config.mode_type
        foundActiveConfig = true

        // Cargar configuración específica
        await loadSpecificConfiguration(config.id)
        
        // Cargar activación activa de bomba si existe
        await loadActivePumpActivation(config.id)
      }
      
      // Si no hay configuración activa, buscar configuraciones automáticas preparadas o programadas pendientes
      if (!foundActiveConfig) {
        console.log('🔍 No hay configuración activa, buscando configuraciones automáticas preparadas o programadas pendientes...')
        
        // NUEVO: Verificar configuraciones automáticas preparadas (is_active = false)
        try {
          const automaticStatusResponse = await IrrigationAPI.getAutomaticConfigStatus(userStore.user.id)
          
          if (automaticStatusResponse.success && automaticStatusResponse.data) {
            console.log('🤖 Configuración automática preparada encontrada:', automaticStatusResponse.data)
            
            // Crear objeto compatible con el store
            const automaticConfig = {
              id: automaticStatusResponse.data.config_id,
              mode_type: 'automatic',
              is_active: automaticStatusResponse.data.is_active,
              crop_id: automaticStatusResponse.data.crop_id,
              user_id: userStore.user.id
            }
            
            irrigationConfig.value = automaticConfig
            activeMode.value = 'automatic'
            foundActiveConfig = true
            
            console.log('✅ Configuración automática preparada cargada en store - otros modos bloqueados')
          }
        } catch (automaticError) {
          console.log('ℹ️ No hay configuración automática preparada:', automaticError.message)
        }
        
        // Solo buscar configuraciones programadas si no encontramos automática preparada
        if (!foundActiveConfig) {
          try {
            // Obtener todas las configuraciones del usuario
          const allConfigsResponse = await IrrigationAPI.getIrrigationConfigsByUser(userStore.user.id)
          
          if (allConfigsResponse.success && allConfigsResponse.data.length > 0) {
            console.log(`🔍 Encontradas ${allConfigsResponse.data.length} configuraciones para revisar`)
            
            // Para cada configuración, obtener la activación más reciente
            for (const config of allConfigsResponse.data) {
              try {
                const latestActivationResponse = await IrrigationAPI.getLatestPumpActivationByConfig(config.id)
                
                if (latestActivationResponse.success && latestActivationResponse.data) {
                  const latestActivation = latestActivationResponse.data
                  
                  console.log(`🔍 Config ${config.id} - Última activación:`, latestActivation.status)
                  
                  // Si la activación más reciente está programada, esta configuración está activa
                  if (latestActivation.status === 'programmed') {
                    console.log('✅ Encontrada configuración con activación programada pendiente:', {
                      configId: config.id,
                      modeType: config.mode_type,
                      activationStatus: latestActivation.status
                    })
                    
                    // Cargar esta configuración como activa
                    irrigationConfig.value = config
                    activeMode.value = config.mode_type
                    activePumpActivation.value = latestActivation
                    foundActiveConfig = true
                    
                    // Cargar configuración específica
                    await loadSpecificConfiguration(config.id)
                    
                    console.log('✅ Estado restaurado para configuración programada')
                    break // Solo necesitamos una configuración activa
                  }
                }
              } catch (activationError) {
                console.error(`Error obteniendo activación para config ${config.id}:`, activationError)
                // Continuar con la siguiente configuración
              }
            }
          }
          } catch (programmedError) {
            console.error('Error buscando configuraciones programadas:', programmedError)
          }
        }
      }
      
      if (!foundActiveConfig) {
        // No hay configuración activa ni programada
        resetState()
      }
    } catch (err) {
      error.value = err.message
      console.error('Error loading active configuration:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Cargar configuración específica (manual, automática, programada)
  const loadSpecificConfiguration = async (irrigationConfigId) => {
    try {
      const response = await IrrigationAPI.getSpecificConfig(irrigationConfigId)
      if (response.success) {
        specificConfig.value = response.data
        
        // Para modo programado, solo iniciar countdown para next_execution si existe
        // NO reiniciar countdown para start_datetime aquí para evitar activaciones inmediatas
        if (activeMode.value === 'programmed' && specificConfig.value?.next_execution) {
          startNextExecutionCountdown()
        }
      }
    } catch (err) {
      console.error('Error loading specific configuration:', err)
    }
  }

  // Cargar activación activa de bomba
  const loadActivePumpActivation = async (irrigationConfigId) => {
    try {
      const response = await IrrigationAPI.getActivePumpActivation(irrigationConfigId)
      if (response.success) {
        activePumpActivation.value = response.data
        
        // Iniciar monitoreo si está activa
        if (response.data.status === 'active') {
          startStatusMonitoring()
        }
      }
    } catch (err) {
      // No hay activación activa (normal)
      activePumpActivation.value = null
    }
  }

  // Crear configuración manual y activar riego
  const startManualIrrigation = async (config) => {
    try {
      isLoading.value = true
      error.value = null
      console.log('🔄 Iniciando riego manual con configuración:', config)

      if (!userStore.user?.id) {
        throw new Error('Usuario no autenticado')
      }

      if (!cropStore.currentCrop?.id) {
        throw new Error('No hay cultivo seleccionado')
      }

      const userId = userStore.user.id
      const cropId = cropStore.currentCrop.id

      // 1. Buscar configuración manual existente para este usuario y cultivo
      console.log('🔍 Buscando configuración manual existente para usuario:', userId, 'cultivo:', cropId)
      const existingConfigsResponse = await IrrigationAPI.getIrrigationConfigsByUserAndType(userId, 'manual')
      
      let irrigationConfigId = null

      if (existingConfigsResponse.success && existingConfigsResponse.data.length > 0) {
        // Buscar configuración que coincida con el cultivo actual
        const existingConfig = existingConfigsResponse.data.find(config => config.crop_id === cropId)
        
        if (existingConfig) {
          console.log('✅ Configuración manual existente encontrada:', existingConfig.id)
          irrigationConfigId = existingConfig.id
          // Ya no necesitamos obtener configuración manual específica 
          // porque está integrada en irrigation_configs
          console.log('✅ Usando configuración existente (integrada)')
        }
      }

      // 2. Si existe configuración, actualizarla; si no, crear nueva
      if (irrigationConfigId) {
        console.log('🔄 Actualizando configuración manual existente')
        
        // Actualizar configuración manual (ahora directamente en irrigation_configs)
        const updateResponse = await IrrigationAPI.updateManualConfig(irrigationConfigId, {
          duration_minutes: config.duration_minutes
        })
        
        if (!updateResponse.success) {
          throw new Error('Error actualizando configuración manual')
        }
        
        console.log('✅ Configuración manual actualizada')
      } else {
        console.log('🔄 Creando nueva configuración manual')
        
        // Crear nueva configuración de riego (incluye duration_minutes)
        const irrigationResponse = await IrrigationAPI.createIrrigationConfig({
          user_id: userId,
          crop_id: cropId,
          mode_type: 'manual',
          duration_minutes: config.duration_minutes,
          is_active: true
        })
        
        if (!irrigationResponse.success) {
          throw new Error('Error creando configuración de riego')
        }
        
        irrigationConfigId = irrigationResponse.data.id
        console.log('✅ Nueva configuración de riego manual creada:', irrigationConfigId)
      }

      // 3. Activar la configuración (desactivar otras si existen)
      console.log('🔄 Activando configuración de riego')
      const activateResponse = await IrrigationAPI.activateIrrigationConfig(irrigationConfigId)
      
      if (!activateResponse.success) {
        throw new Error('Error activando configuración de riego')
      }
      
      console.log('✅ Configuración de riego activada')

      // 4. Crear nueva activación de bomba
      console.log('🔄 Creando activación de bomba')
      const pumpResponse = await IrrigationAPI.createPumpActivation({
        irrigation_config_id: irrigationConfigId,
        duration_minutes: config.duration_minutes,
        status: 'active'
      })
      
      if (!pumpResponse.success) {
        throw new Error('Error creando activación de bomba')
      }
      
      console.log('✅ Activación de bomba creada:', pumpResponse.data.id)

      // 5. Cargar configuración activa
      await loadActiveConfiguration()
      
      // 6. Iniciar monitoreo de estado
      startStatusMonitoring()

      // 7. Iniciar updates de tiempo para auto-completado
      autoCompletionTriggered.value = false
      startTimeUpdates()

      console.log('✅ Riego manual iniciado exitosamente')
      // Las notificaciones se manejan via alertas de base de datos
      return true
    } catch (err) {
      error.value = err.message
      console.error('❌ Error en startManualIrrigation:', err)
      // Los errores se manejan via respuestas API, no toasts
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Iniciar riego programado
  const startProgrammedIrrigation = async (config) => {
    try {
      isLoading.value = true
      error.value = null

      console.log('🚀 Iniciando configuración de riego programado:', config)

      // Validar datos necesarios
      if (!config.user_id || !config.crop_id) {
        throw new Error('Usuario y cultivo son obligatorios')
      }

      // Crear configuración programada
      const response = await IrrigationAPI.createProgrammedConfig(config)
      
      if (response.success) {
        console.log('✅ Configuración programada creada:', response.data)
        
        // Actualizar estado local DIRECTAMENTE - NO llamar loadActiveConfiguration
        irrigationConfig.value = response.data.irrigationConfig
        specificConfig.value = response.data.programmedConfig
        activePumpActivation.value = response.data.pumpActivation
        activeMode.value = 'programmed'

        // Calcular tiempo hasta la activación y configurar countdown
        const scheduledTime = new Date(config.start_datetime)
        const now = new Date()
        const timeUntilActivation = scheduledTime - now

        console.log('🔍 DEBUG: Comparación de fechas', {
          scheduledTime: scheduledTime.toISOString(),
          scheduledTimeLocal: scheduledTime.toLocaleString(),
          now: now.toISOString(), 
          nowLocal: now.toLocaleString(),
          timeUntilActivation,
          timeUntilActivationMinutes: Math.round(timeUntilActivation / 1000 / 60),
          config: config
        })

        if (timeUntilActivation > 0) {
          console.log(`⏰ Riego programado para: ${scheduledTime.toLocaleString()}`)
          console.log(`⏳ Tiempo hasta activación: ${Math.round(timeUntilActivation / 1000 / 60)} minutos`)
          
          // Iniciar countdown hasta la activación
          startProgrammedCountdown(timeUntilActivation)
        } else {
          console.log('⚠️ La fecha programada ya pasó', {
            scheduledTime: scheduledTime.toLocaleString(),
            now: now.toLocaleString(),
            difference: timeUntilActivation
          })
        }

        console.log('✅ Estado local actualizado - NO llamando loadActiveConfiguration para evitar conflictos')
        
        // Las notificaciones se manejan via alertas de base de datos
        return true
      } else {
        throw new Error(response.message || 'Error al crear configuración programada')
      }
    } catch (err) {
      error.value = err.message
      console.error('❌ Error iniciando riego programado:', err)
      // Los errores se manejan via respuestas API, no toasts
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Countdown para riego programado
  const startProgrammedCountdown = (millisecondsUntilActivation) => {
    // Limpiar countdown anterior si existe
    if (countdownInterval) {
      clearInterval(countdownInterval)
      countdownInterval = null
    }

    const updateCountdown = () => {
      if (!specificConfig.value?.start_datetime) {
        clearInterval(countdownInterval)
        countdownInterval = null
        return
      }

      const now = new Date()
      const scheduledDateTime = new Date(specificConfig.value.start_datetime)
      const timeLeft = scheduledDateTime - now

      if (timeLeft <= 0) {
        clearInterval(countdownInterval)
        countdownInterval = null
        
        // ¡Activar el riego! - SOLO si aún está en estado 'programmed'
        if (activePumpActivation.value?.status === 'programmed') {
          console.log('🔥 ¡Tiempo de activación alcanzado! Iniciando riego...')
          activateScheduledIrrigation()
        } else {
          console.log('⚠️ Tiempo alcanzado pero el estado ya no es "programmed", saltando activación')
        }
      }
    }

    // Actualizar cada segundo para mayor precisión
    countdownInterval = setInterval(updateCountdown, 1000)
  }

  // Iniciar countdown para próxima ejecución (daily/custom)
  const startNextExecutionCountdown = () => {
    if (!specificConfig.value?.next_execution) {
      timeUntilNextExecution.value = null
      return
    }

    const updateNextCountdown = () => {
      if (!specificConfig.value?.next_execution) {
        timeUntilNextExecution.value = null
        return
      }

      const now = new Date()
      const nextDate = new Date(specificConfig.value.next_execution)
      const timeLeft = nextDate - now

      if (timeLeft <= 0) {
        timeUntilNextExecution.value = 'Programado para activarse pronto'
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

        if (days > 0) {
          timeUntilNextExecution.value = `${days}d ${hours}h ${minutes}m`
        } else if (hours > 0) {
          timeUntilNextExecution.value = `${hours}h ${minutes}m`
        } else {
          timeUntilNextExecution.value = `${minutes}m`
        }
      }
    }

    // Actualizar inmediatamente
    updateNextCountdown()
    
    // Actualizar cada minuto
    setInterval(updateNextCountdown, 60000)
  }

  // Activar riego programado cuando llega la hora - SIMPLIFICADO como manual
  const activateScheduledIrrigation = async () => {
    try {
      console.log('🔥 ACTIVANDO RIEGO PROGRAMADO - MÉTODO SIMPLIFICADO')
      
      // PROTECCIÓN: No activar si ya está activo o si ya no es 'programmed'
      if (activePumpActivation.value?.status !== 'programmed') {
        console.log('⚠️ Riego ya no está en estado "programmed", saltando activación')
        return
      }
      
      if (irrigationConfig.value?.is_active === true) {
        console.log('⚠️ Configuración ya está activa, saltando activación')
        return
      }
      
      if (!irrigationConfig.value?.id || !activePumpActivation.value?.id) {
        console.error('❌ Faltan datos necesarios:', {
          irrigationConfigId: irrigationConfig.value?.id,
          pumpActivationId: activePumpActivation.value?.id
        })
        throw new Error('Faltan configuraciones necesarias')
      }

      // PASO 1: Activar configuración de riego (is_active = true) - IGUAL QUE MANUAL
      console.log('1️⃣ Activando configuración de riego...')
      await IrrigationAPI.activateIrrigationConfig(irrigationConfig.value.id)
      irrigationConfig.value.is_active = true
      console.log('✅ is_active = true establecido')

      // PASO 2: Cambiar pump_status a 'active' - IGUAL QUE MANUAL
      console.log('2️⃣ Activando bomba (status = active)...')
      const pumpResponse = await IrrigationAPI.updatePumpActivationStatus(
        activePumpActivation.value.id, 
        { status: 'active' }
      )
      
      if (pumpResponse.success) {
        activePumpActivation.value = pumpResponse.data
        console.log('✅ pump_status = active establecido')
        
        // PASO 3: Iniciar monitoreo para auto-completar cuando termine duration_minutes
        startStatusMonitoring()
        console.log('✅ Monitoreo iniciado')
        
        // PASO 4: Iniciar updates de tiempo para auto-completado
        autoCompletionTriggered.value = false
        startTimeUpdates()
        console.log('✅ Updates de tiempo iniciados')
        
        // Las notificaciones se manejan via alertas de base de datos
        console.log('✅ Activación completada - alerta creada en BD')
        
        console.log('🎉 RIEGO PROGRAMADO ACTIVADO EXITOSAMENTE')
        
        // NOTA: updateLastExecution se llamará cuando el riego se COMPLETE, no al iniciar
      } else {
        throw new Error('Error activando bomba')
      }
      
    } catch (err) {
      console.error('❌ ERROR ACTIVANDO RIEGO PROGRAMADO:', err)
      // Los errores se manejan via alertas o respuestas API, no toasts
    }
  }

  // Actualizar traza de ejecución (last_execution) y programar siguiente si es necesario
  const updateLastExecution = async () => {
    try {
      console.log('📝 Actualizando traza de ejecución...')
      
      if (!specificConfig.value?.id) {
        console.log('❌ No hay specificConfig para actualizar traza')
        return
      }

      const now = new Date()
      
      // Datos para actualizar: marcar cuando se ejecutó y cuándo será la próxima
      const updateData = {
        last_execution: now.toISOString()
      }

      // Calcular next_execution solo para trazabilidad (daily, custom days)
      const nextExecution = calculateNextExecution()
      if (nextExecution) {
        updateData.next_execution = nextExecution.toISOString()
        console.log(`📅 Próxima ejecución calculada: ${nextExecution.toLocaleString()}`)
        
        // Si hay próxima ejecución, programar countdown
        const timeUntilNext = nextExecution - now
        if (timeUntilNext > 0) {
          console.log('⏰ Programando próximo riego...')
          startProgrammedCountdown(timeUntilNext)
          
          // También iniciar countdown para mostrar en index.vue
          startNextExecutionCountdown()
        }
      } else {
        // No hay más ejecuciones (frequency = 'once' o custom_days agotados)
        updateData.next_execution = null
        console.log('🔚 No hay más ejecuciones programadas')
      }

      // Actualizar en BD
      await IrrigationAPI.updateProgrammedExecution(specificConfig.value.id, updateData)
      console.log('✅ Traza actualizada en BD')
      
    } catch (err) {
      console.error('❌ Error actualizando traza:', err)
    }
  }

  // Calcular próxima ejecución basada en frequency_type
  const calculateNextExecution = () => {
    if (!specificConfig.value) return null

    const { frequency_type, custom_days, start_datetime } = specificConfig.value
    const now = new Date()
    const originalDate = new Date(start_datetime)

    switch (frequency_type) {
      case 'once':
        // Solo una vez, no hay próxima ejecución
        return null

      case 'daily':
        // Diariamente: añadir 24 horas a la fecha original
        const nextDaily = new Date(originalDate)
        nextDaily.setDate(nextDaily.getDate() + 1)
        return nextDaily

      case 'custom':
        if (!custom_days || custom_days.length === 0) return null
        
        // Remover el día actual del array
        const currentDay = now.getDay() === 0 ? 7 : now.getDay() // Convertir domingo (0) a 7
        const remainingDays = custom_days.filter(day => day !== currentDay)
        
        if (remainingDays.length === 0) {
          // No quedan más días, terminar
          return null
        }

        // Encontrar el próximo día en el array
        const nextDay = Math.min(...remainingDays)
        const daysUntilNext = nextDay > currentDay ? 
          nextDay - currentDay : 
          7 - currentDay + nextDay

        const nextCustom = new Date(originalDate)
        nextCustom.setDate(nextCustom.getDate() + daysUntilNext)
        
        // Actualizar el array custom_days en la configuración
        updateCustomDaysArray(remainingDays)
        
        return nextCustom

      default:
        return null
    }
  }

  // Actualizar el array custom_days en la base de datos
  const updateCustomDaysArray = async (newCustomDays) => {
    try {
      if (!specificConfig.value?.id) return

      // Actualizar local
      specificConfig.value.custom_days = newCustomDays
      
      // Actualizar en base de datos (necesitaremos agregar esta función al API)
      // Por ahora solo actualizamos local
      console.log('📅 Días restantes:', newCustomDays)
      
    } catch (err) {
      console.error('❌ Error actualizando custom_days:', err)
    }
  }

  // Pausar riego
  const pauseIrrigation = async () => {
    try {
      if (!activePumpActivation.value?.id) {
        throw new Error('No hay riego activo para pausar')
      }

      const response = await IrrigationAPI.pausePumpActivation(activePumpActivation.value.id)
      if (response.success) {
        activePumpActivation.value = response.data
        stopStatusMonitoring()
        // Las notificaciones se manejan via alertas de base de datos
        return true
      }
    } catch (err) {
      error.value = err.message
      // Los errores se manejan via respuestas API, no toasts
      return false
    }
  }

  // Reanudar riego
  const resumeIrrigation = async () => {
    try {
      if (!activePumpActivation.value?.id) {
        throw new Error('No hay riego pausado para reanudar')
      }

      const response = await IrrigationAPI.resumePumpActivation(activePumpActivation.value.id)
      if (response.success) {
        activePumpActivation.value = response.data
        startStatusMonitoring()
        // Las notificaciones se manejan via alertas de base de datos
        return true
      }
    } catch (err) {
      error.value = err.message
      // Los errores se manejan via respuestas API, no toasts
      return false
    }
  }

  // Completar riego
  const completeIrrigation = async () => {
    try {
      if (!activePumpActivation.value?.id) {
        console.log('❌ No hay activación de bomba activa para completar')
        return false
      }

      console.log('🔄 Completando riego...')
      
      // PREVENIR MÚLTIPLES LLAMADAS - revisar si ya está en proceso
      if (activePumpActivation.value.status === 'completed') {
        console.log('⚠️ El riego ya está completado, ignorando llamada duplicada')
        return true
      }
      
      // Detener updates de tiempo INMEDIATAMENTE
      stopTimeUpdates()
      autoCompletionTriggered.value = false

      // Actualizar estado de la activación de bomba
      const response = await IrrigationAPI.updatePumpActivationStatus(activePumpActivation.value.id, {
        status: 'completed',
        ended_at: new Date().toISOString()
      })

      if (!response.success) {
        throw new Error('Error completando riego')
      }

      // Actualizar última fecha de riego en la configuración
      if (irrigationConfig.value?.id) {
        await IrrigationAPI.updateLastIrrigation(irrigationConfig.value.id)
      }

      // Lógica específica por modo
      if (activeMode.value === 'manual' && irrigationConfig.value?.id) {
        // Para modo manual, desactivar la configuración cuando termina
        console.log('🔄 Desactivando configuración manual (riego completado)')
        const deactivateResponse = await IrrigationAPI.deactivateIrrigationConfig(irrigationConfig.value.id)
        
        if (!deactivateResponse.success) {
          console.error('❌ Error desactivando configuración manual')
        } else {
          console.log('✅ Configuración manual desactivada')
        }
      } else if (activeMode.value === 'programmed') {
        // Para modo programado, calcular próxima ejecución y programar siguiente riego
        console.log('🔄 Procesando finalización de riego programado...')
        
        // Desactivar temporalmente la configuración 
        if (irrigationConfig.value?.id) {
          await IrrigationAPI.deactivateIrrigationConfig(irrigationConfig.value.id)
          console.log('✅ Configuración programada desactivada temporalmente')
        }
        
        // Calcular y programar próxima ejecución
        await updateLastExecution()
        console.log('✅ Próxima ejecución programada')
      }

      // Limpiar estado local
      resetState()
      stopStatusMonitoring()

      // Recargar configuración activa para verificar estado
      await loadActiveConfiguration()

      console.log('✅ Riego completado exitosamente')
              // Las notificaciones se manejan via alertas de base de datos
      return true
    } catch (err) {
      error.value = err.message
      console.error('❌ Error en completeIrrigation:', err)
      // Los errores se manejan via respuestas API, no toasts
      return false
    }
  }

  // Cancelar riego y configuración
  const cancelActiveMode = async () => {
    try {
      isLoading.value = true
      console.log('🔄 Iniciando cancelación de modo activo...', activeMode.value)

      // Si es modo programado, usar la función específica
      if (activeMode.value === 'programmed') {
        console.log('🔄 Cancelando modo programado...')
        
        // Detener countdown si existe
        if (countdownInterval) {
          clearInterval(countdownInterval)
          countdownInterval = null
          console.log('✅ Countdown detenido')
        }
        
        // Determinar si es cancelación de configuración o solo de riego activo
        const isActiveIrrigation = activePumpActivation.value?.status === 'active' || activePumpActivation.value?.status === 'paused'
        
        if (isActiveIrrigation) {
          console.log('🔄 Cancelando SOLO riego activo (mantener configuración)')
          // Cancelar solo el riego activo, mantener configuración para futuros riegos
          const response = await IrrigationAPI.cancelProgrammedIrrigation(irrigationConfig.value.id)
          if (!response.success) {
            throw new Error('Error al cancelar riego programado')
          }
          console.log('✅ Riego programado cancelado (configuración mantenida)')
          // Las notificaciones se manejan via alertas de base de datos
        } else {
          console.log('🔄 Cancelando configuración programada (SIN eliminar tupla)')
          // Solo desactivar la configuración, NO eliminar la tupla programmed_configs
          // Esto preserva la configuración para daily, custom, y once
          
          // 1. NO cancelar pump_activations programadas (evita envío de OFF innecesario)
          // Solo desactivamos la configuración, las pump_activations programadas se limpiarán automáticamente
          
          // 2. Eliminar programmed_settings (deshacer configuración)
          if (irrigationConfig.value?.id) {
            console.log('🔄 Eliminando configuración programada específica')
            const deleteResponse = await IrrigationAPI.deleteProgrammedSettings(irrigationConfig.value.id)
            if (!deleteResponse.success) {
              throw new Error('Error al eliminar configuración programada')
            }
            console.log('✅ Configuración programada eliminada')
          }
          
          // 3. Desactivar configuración de riego (is_active = false)
          if (irrigationConfig.value?.id) {
            console.log('🔄 Desactivando configuración de riego')
            const response = await IrrigationAPI.deactivateIrrigationConfig(irrigationConfig.value.id)
            if (!response.success) {
              throw new Error('Error al desactivar configuración programada')
            }
            console.log('✅ Configuración programada desactivada (tupla irrigation_configs conservada)')
          }
          
          // Las notificaciones se manejan via alertas de base de datos
        }
      } else {
        // Para otros modos (manual, automático)
        
        // 1. Cancelar activación de bomba si existe
        if (activePumpActivation.value?.id && 
            (activePumpActivation.value.status === 'active' || activePumpActivation.value.status === 'paused')) {
          
          console.log('🔄 Cancelando activación de bomba:', activePumpActivation.value.id)
          const pumpResponse = await IrrigationAPI.updatePumpActivationStatus(activePumpActivation.value.id, {
            status: 'cancelled'
          })
          
          if (!pumpResponse.success) {
            throw new Error('Error cancelando activación de bomba')
          }
          
          console.log('✅ Activación de bomba cancelada')
          
          // IMPORTANTE: Actualizar last_irrigation_at cuando se cancela un riego activo
          if (irrigationConfig.value?.id) {
            console.log('🔄 Actualizando last_irrigation_at (riego cancelado)')
            try {
              await IrrigationAPI.updateLastIrrigation(irrigationConfig.value.id)
              console.log('✅ last_irrigation_at actualizado')
            } catch (err) {
              console.error('❌ Error actualizando last_irrigation_at:', err)
            }
          }
        }

        // 2. Desactivar configuración de riego (no eliminar, solo desactivar)
        if (irrigationConfig.value?.id) {
          console.log('🔄 Desactivando configuración de riego:', irrigationConfig.value.id)
          
          // Usar la función específica para desactivar
          const configResponse = await IrrigationAPI.deactivateIrrigationConfig(irrigationConfig.value.id)
          
          if (!configResponse.success) {
            throw new Error('Error desactivando configuración de riego')
          }
          
          console.log('✅ Configuración de riego desactivada')
        }
        
        // Las notificaciones se manejan via alertas de base de datos
      }

      // 3. Limpiar estado local
      resetState()
      stopStatusMonitoring()
      


      // 4. Recargar configuración activa para verificar que no hay ninguna activa
      await loadActiveConfiguration()

      console.log('✅ Modo activo cancelado exitosamente')
      return true
    } catch (err) {
      error.value = err.message
      console.error('❌ Error en cancelActiveMode:', err)
      // Los errores se manejan via respuestas API, no toasts
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Monitoreo de estado en tiempo real
  const startStatusMonitoring = () => {
    stopStatusMonitoring() // Limpiar intervalos existentes

    statusInterval = setInterval(async () => {
      if (irrigationConfig.value?.id) {
        await loadActivePumpActivation(irrigationConfig.value.id)
        
        // Auto-completar si el tiempo se agotó
        if (activePumpActivation.value && 
            activePumpActivation.value.status === 'active') {
          
          // Calcular tiempo transcurrido
          const startTime = new Date(activePumpActivation.value.started_at)
          const now = new Date()
          const elapsedMinutes = (now - startTime) / (1000 * 60)
          const durationMinutes = parseFloat(activePumpActivation.value.duration_minutes) || 0
          
          // Debug: Verificar datos de la activación
          if (!activePumpActivation.value.started_at || !activePumpActivation.value.duration_minutes) {
            console.warn('⚠️ [MONITOR] Datos incompletos:', {
              started_at: activePumpActivation.value.started_at,
              duration_minutes: activePumpActivation.value.duration_minutes,
              activationData: activePumpActivation.value
            })
          }
          
          console.log('⏱️ [MONITOR] Estado del riego:', {
            elapsed: elapsedMinutes.toFixed(2),
            duration: durationMinutes,
            remainingTime: remainingTime.value,
            status: activePumpActivation.value.status
          })
          
          // 🚨 NOTA: Auto-completado se maneja SOLO desde remainingTime computed
          // NO hacer auto-completado aquí para evitar duplicados
        }
      }
    }, 5000) // Cada 5 segundos
  }

  const stopStatusMonitoring = () => {
    if (statusInterval) {
      clearInterval(statusInterval)
      statusInterval = null
    }
  }

  // Obtener descripción del modo activo
  const getModeDescription = () => {
    if (!activeMode.value || !specificConfig.value) return ''
    
    switch (activeMode.value) {
      case 'manual':
        const duration = specificConfig.value.duration_minutes
        const totalMinutes = Math.floor(duration || 0)
        const totalSeconds = Math.round((duration - totalMinutes) * 60)
        return `Duración: ${totalMinutes}min ${totalSeconds}seg`
      
      case 'programmed':
        if (specificConfig.value.start_datetime) {
          const scheduledDate = new Date(specificConfig.value.start_datetime)
          const now = new Date()
          
          if (isWatering.value) {
            // Si está regando, mostrar duración
            return `Duración: ${specificConfig.value.duration_minutes}min`
          } else {
            // Si está programado pero no activo, mostrar tiempo hasta activación
            const timeUntilActivation = scheduledDate - now
            if (timeUntilActivation > 0) {
              const days = Math.floor(timeUntilActivation / (1000 * 60 * 60 * 24))
              const hours = Math.floor((timeUntilActivation % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
              const minutes = Math.floor((timeUntilActivation % (1000 * 60 * 60)) / (1000 * 60))
              
              if (days > 0) {
                return `Activa en ${days}d ${hours}h ${minutes}m`
              } else if (hours > 0) {
                return `Activa en ${hours}h ${minutes}m`
              } else {
                return `Activa en ${minutes}m`
              }
            } else {
              return 'Activándose...'
            }
          }
        }
        return 'Programado para ejecutarse automáticamente'
      
      case 'automatic':
        // Para modo automático, mostrar umbrales
        return 'Monitoreando sensores automáticamente'
      
      default:
        return ''
    }
  }

  // Limpiar estado
  const resetState = () => {
    activeMode.value = null
    irrigationConfig.value = null
    specificConfig.value = null
    activePumpActivation.value = null
    lastCompletedConfig.value = null
    error.value = null
  }

  // Limpiar al cerrar
  const cleanup = () => {
    stopStatusMonitoring()
    resetState()
  }

  return {
    // Estado
    activeMode,
    irrigationConfig,
    specificConfig,
    activePumpActivation,
    lastCompletedConfig,
    isLoading,
    error,

    // Computeds
    hasActiveMode,
    isManualActive,
    isAutomaticActive,
    isProgrammedActive,
    isWatering,
    isPaused,
    isCompleted,
    isProgrammedWaiting,
    remainingTime,
    lastIrrigation,
    canAccessMode,
    canAccessManualMode,
    canAccessAutomaticMode,
    canAccessProgrammedMode,
    timeUntilNextExecution,
    nextExecutionFormatted,

    // Actions
    loadActiveConfiguration,
    startManualIrrigation,
    startProgrammedIrrigation,
    pauseIrrigation,
    resumeIrrigation,
    completeIrrigation,
    cancelActiveMode,
    findManualConfigByUserAndCrop,
    getModeDescription,
    startTimeUpdates,
    stopTimeUpdates,
    cleanup
  }
}) 