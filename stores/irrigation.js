import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import IrrigationAPI from '~/api/IrrigationAPI'
import { useUserStore } from './user'
import { useCropStore } from './crop'
import { useToastNotifications } from '~/composables/useToastNotifications'

export const useIrrigationStore = defineStore('irrigation', () => {
  // Estado
  const activeMode = ref(null) // 'manual', 'automatic', 'programmed'
  const irrigationConfig = ref(null)
  const specificConfig = ref(null) // manual_config, automatic_config, programmed_config
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
  const toast = useToastNotifications()

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

  // Tiempo restante calculado en tiempo real
  const remainingTime = computed(() => {
    if (!activePumpActivation.value || !isWatering.value) {
      return null
    }

    const startTime = new Date(activePumpActivation.value.started_at)
    const now = new Date()
    const elapsedSeconds = Math.floor((now - startTime) / 1000)
    const totalSeconds = activePumpActivation.value.duration_minutes * 60
    const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds)

    if (remainingSeconds <= 0) {
      return null
    }

    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = remainingSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
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
      
      if (response.success && response.data.length > 0) {
        const config = response.data[0] // Solo puede haber una activa
        irrigationConfig.value = config
        activeMode.value = config.mode_type

        // Cargar configuración específica
        await loadSpecificConfiguration(config.id)
        
        // Cargar activación activa de bomba si existe
        await loadActivePumpActivation(config.id)
      } else {
        // No hay configuración activa
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
      let manualConfigId = null

      if (existingConfigsResponse.success && existingConfigsResponse.data.length > 0) {
        // Buscar configuración que coincida con el cultivo actual
        const existingConfig = existingConfigsResponse.data.find(config => config.crop_id === cropId)
        
        if (existingConfig) {
          console.log('✅ Configuración manual existente encontrada:', existingConfig.id)
          irrigationConfigId = existingConfig.id
          
          // Obtener configuración manual específica
          const specificConfigResponse = await IrrigationAPI.getSpecificConfig(existingConfig.id)
          if (specificConfigResponse.success && specificConfigResponse.data) {
            manualConfigId = specificConfigResponse.data.id
            console.log('✅ Configuración manual específica encontrada:', manualConfigId)
          }
        }
      }

      // 2. Si existe configuración, actualizarla; si no, crear nueva
      if (irrigationConfigId && manualConfigId) {
        console.log('🔄 Actualizando configuración manual existente')
        
        // Actualizar configuración manual
        const updateResponse = await IrrigationAPI.updateManualConfig(manualConfigId, {
          duration_minutes: config.duration_minutes,
          begin_notification: config.begin_notification,
          final_notification: config.final_notification
        })
        
        if (!updateResponse.success) {
          throw new Error('Error actualizando configuración manual')
        }
        
        console.log('✅ Configuración manual actualizada')
      } else {
        console.log('🔄 Creando nueva configuración manual')
        
        // Crear nueva configuración de riego
        const irrigationResponse = await IrrigationAPI.createIrrigationConfig({
          user_id: userId,
          crop_id: cropId,
          mode_type: 'manual',
          is_active: true
        })
        
        if (!irrigationResponse.success) {
          throw new Error('Error creando configuración de riego')
        }
        
        irrigationConfigId = irrigationResponse.data.id
        console.log('✅ Nueva configuración de riego creada:', irrigationConfigId)
        
        // Crear configuración manual específica
        const manualResponse = await IrrigationAPI.createManualConfig({
          irrigation_config_id: irrigationConfigId,
          duration_minutes: config.duration_minutes,
          begin_notification: config.begin_notification,
          final_notification: config.final_notification
        })
        
        if (!manualResponse.success) {
          throw new Error('Error creando configuración manual')
        }
        
        manualConfigId = manualResponse.data.id
        console.log('✅ Nueva configuración manual creada:', manualConfigId)
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

      console.log('✅ Riego manual iniciado exitosamente')
      toast.success('Riego iniciado', 'El riego manual se ha iniciado correctamente')
      return true
    } catch (err) {
      error.value = err.message
      console.error('❌ Error en startManualIrrigation:', err)
      toast.error('Error', err.message)
      return false
    } finally {
      isLoading.value = false
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
        toast.info('Riego pausado', 'El riego se ha pausado correctamente')
        return true
      }
    } catch (err) {
      error.value = err.message
      toast.error('Error', err.message)
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
        toast.success('Riego reanudado', 'El riego se ha reanudado correctamente')
        return true
      }
    } catch (err) {
      error.value = err.message
      toast.error('Error', err.message)
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

      // Para modo manual, desactivar la configuración cuando termina
      if (activeMode.value === 'manual' && irrigationConfig.value?.id) {
        console.log('🔄 Desactivando configuración manual (riego completado)')
        const deactivateResponse = await IrrigationAPI.deactivateIrrigationConfig(irrigationConfig.value.id)
        
        if (!deactivateResponse.success) {
          console.error('❌ Error desactivando configuración manual')
        } else {
          console.log('✅ Configuración manual desactivada')
        }
      }

      // Limpiar estado local
      resetState()
      stopStatusMonitoring()

      // Recargar configuración activa para verificar estado
      await loadActiveConfiguration()

      console.log('✅ Riego completado exitosamente')
      toast.success('Riego completado', 'El riego se ha completado correctamente')
      return true
    } catch (err) {
      error.value = err.message
      console.error('❌ Error en completeIrrigation:', err)
      toast.error('Error', err.message)
      return false
    }
  }

  // Cancelar riego y configuración
  const cancelActiveMode = async () => {
    try {
      isLoading.value = true
      console.log('🔄 Iniciando cancelación de modo activo...')

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

      // 3. Limpiar estado local
      resetState()
      stopStatusMonitoring()

      // 4. Recargar configuración activa para verificar que no hay ninguna activa
      await loadActiveConfiguration()

      console.log('✅ Modo activo cancelado exitosamente')
      toast.info('Configuración cancelada', 'Se ha cancelado la configuración de riego')
      return true
    } catch (err) {
      error.value = err.message
      console.error('❌ Error en cancelActiveMode:', err)
      toast.error('Error', err.message)
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
          
          // Verificar si el tiempo se agotó
          const shouldComplete = 
            remainingTime.value === null || 
            remainingTime.value === '0:00' ||
            (activePumpActivation.value.started_at && 
             activePumpActivation.value.duration_minutes &&
             (new Date() - new Date(activePumpActivation.value.started_at)) >= 
             (activePumpActivation.value.duration_minutes * 60 * 1000))
          
          if (shouldComplete) {
            console.log('⏰ Tiempo agotado, completando riego automáticamente')
            await completeIrrigation()
          }
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
        // Para modo programado, mostrar información de programación
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
    remainingTime,
    lastIrrigation,
    canAccessMode,
    canAccessManualMode,
    canAccessAutomaticMode,
    canAccessProgrammedMode,

    // Actions
    loadActiveConfiguration,
    startManualIrrigation,
    pauseIrrigation,
    resumeIrrigation,
    completeIrrigation,
    cancelActiveMode,
    findManualConfigByUserAndCrop,
    getModeDescription,
    cleanup
  }
}) 