import { ref, computed } from 'vue'

// Estado global compartido entre todas las páginas de modos
const activeMode = ref(null) // 'manual', 'programado', 'automatico', null
const modeConfig = ref({})
const isWatering = ref(false)
const remainingTime = ref(null)
const startTime = ref(null)
const isPaused = ref(false)
const pausedTime = ref(null)

// Variable para controlar el intervalo del tiempo restante
let currentInterval = null
let countdownInterval = null

export const useIrrigationModes = () => {
  
  // Computeds
  const hasActiveMode = computed(() => activeMode.value !== null)
  
  const isManualActive = computed(() => activeMode.value === 'manual')
  const isProgrammedActive = computed(() => activeMode.value === 'programado')
  const isAutomaticActive = computed(() => activeMode.value === 'automatico')
  
  const canAccessMode = computed(() => (mode) => {
    return !hasActiveMode.value || activeMode.value === mode
  })

  // Métodos para activar modos
  const activateManualMode = (config) => {
    activeMode.value = 'manual'
    modeConfig.value = config
    isWatering.value = true
    startTime.value = new Date()
    
    // Configurar tiempo restante
    const totalSeconds = (config.duration.minutes || 0) * 60 + (config.duration.seconds || 0)
    setRemainingTime(totalSeconds)
    
    // Guardar en localStorage para persistencia
    saveToStorage()
  }

  const activateProgrammedMode = (config) => {
    console.log('activateProgrammedMode llamado con config:', config)
    
    // Cancelar cualquier modo activo
    if (activeMode.value) {
      cancelActiveMode()
    }
    
    activeMode.value = 'programado'
    modeConfig.value = config
    isWatering.value = false // Inicialmente solo configurado, no regando
    remainingTime.value = null
    startTime.value = null
    
    // Programar la activación del riego
    const scheduledDateTime = new Date(config.scheduledDateTime)
    const now = new Date()
    const timeUntilActivation = scheduledDateTime - now
    
    console.log('Tiempo hasta activación:', timeUntilActivation, 'ms')
    
    if (timeUntilActivation > 0) {
      // Iniciar countdown hasta la activación
      startCountdownToActivation(timeUntilActivation)
      
      // Programar la activación
      setTimeout(() => {
        console.log('Timeout ejecutado - activando riego programado')
        startProgrammedWatering()
      }, timeUntilActivation)
    } else {
      // Si la fecha ya pasó, activar inmediatamente
      console.log('Fecha ya pasó - activando inmediatamente')
      startProgrammedWatering()
    }
    
    saveToStorage()
  }

  // Función para iniciar countdown hasta la activación
  const startCountdownToActivation = (milliseconds) => {
    // Cancelar countdown anterior si existe
    if (countdownInterval) {
      clearInterval(countdownInterval)
      countdownInterval = null
    }
    
    const updateCountdown = () => {
      const now = new Date()
      const scheduledDateTime = new Date(modeConfig.value.scheduledDateTime)
      const timeLeft = scheduledDateTime - now
      
      if (timeLeft <= 0) {
        clearInterval(countdownInterval)
        countdownInterval = null
        remainingTime.value = null
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
        
        if (days > 0) {
          remainingTime.value = `${days}d ${hours}h ${minutes}m`
        } else if (hours > 0) {
          remainingTime.value = `${hours}h ${minutes}m ${seconds}s`
        } else {
          remainingTime.value = `${minutes}m ${seconds}s`
        }
      }
    }
    
    // Actualizar inmediatamente
    updateCountdown()
    
    // Actualizar cada segundo
    countdownInterval = setInterval(updateCountdown, 1000)
  }

  // Método para iniciar el riego programado
  const startProgrammedWatering = () => {
    console.log('startProgrammedWatering llamado - activeMode:', activeMode.value, 'modeConfig:', modeConfig.value)
    if (activeMode.value === 'programado' && modeConfig.value) {
      isWatering.value = true
      startTime.value = new Date()
      
      const totalDuration = (modeConfig.value.duration.minutes || 0) * 60
      console.log('Iniciando riego programado con duración:', totalDuration, 'segundos')
      setRemainingTime(totalDuration)
      
      saveToStorage()
    }
  }

  const activateAutomaticMode = (config) => {
    console.log('activateAutomaticMode llamado con config:', config)
    
    // Cancelar cualquier modo activo (incluyendo programado)
    if (activeMode.value) {
      // Si hay un modo programado activo, guardar su estado antes de cancelarlo
      if (activeMode.value === 'programado') {
        const currentState = {
          activeMode: activeMode.value,
          modeConfig: modeConfig.value,
          isWatering: isWatering.value,
          remainingTime: remainingTime.value,
          startTime: startTime.value,
          isPaused: isPaused.value,
          pausedTime: pausedTime.value
        }
        localStorage.setItem('programmedModeBackup', JSON.stringify(currentState))
        console.log('Estado del modo programado guardado como backup')
      }
      
      // Cancelar el modo activo
      cancelActiveMode()
    }
    
    activeMode.value = 'automatico'
    modeConfig.value = config
    isWatering.value = false // Inicialmente solo configurado, no regando
    remainingTime.value = null
    startTime.value = null
    
    // Iniciar monitoreo automático
    startAutomaticMonitoring()
    
    saveToStorage()
  }

  // Función para monitorear sensores automáticamente
  const startAutomaticMonitoring = () => {
    console.log('Iniciando monitoreo automático')
    
    // Simular monitoreo cada 5 segundos
    if (currentInterval) {
      clearInterval(currentInterval)
    }
    
    currentInterval = setInterval(() => {
      if (activeMode.value === 'automatico' && modeConfig.value) {
        checkAutomaticConditions()
      }
    }, 5000)
  }

  // Función para verificar condiciones automáticas
  const checkAutomaticConditions = () => {
    if (!modeConfig.value || activeMode.value !== 'automatico') {
      return
    }
    
    // Simular valores de sensores (en una implementación real vendrían del IoT)
    const currentTemperature = 25 + Math.random() * 10 // 25-35°C
    const currentSoilHumidity = 40 + Math.random() * 30 // 40-70%
    const currentAirHumidity = 50 + Math.random() * 30 // 50-80%
    
    const { maxTemperature, minSoilHumidity, maxSoilHumidity, minAirHumidity, maxAirHumidity } = modeConfig.value.thresholds
    
    // Verificar si se deben activar las condiciones (usando ambos tipos de humedad)
    const shouldActivate = currentTemperature >= maxTemperature || 
                          currentSoilHumidity <= minSoilHumidity || 
                          currentAirHumidity <= minAirHumidity
    
    // SOLO mostrar logs de las condiciones, NO activar automáticamente
    if (shouldActivate && !isWatering.value && !isPaused.value) {
      console.log('Condiciones automáticas cumplidas - pero NO activando riego automáticamente')
      console.log('Temperatura:', currentTemperature, '°C, Humedad suelo:', currentSoilHumidity, '%, Humedad aire:', currentAirHumidity, '%')
      console.log('Umbrales - Temp max:', maxTemperature, '°C, Humedad suelo min:', minSoilHumidity, '%, Humedad aire min:', minAirHumidity, '%')
    } else if (isWatering.value && (currentSoilHumidity >= maxSoilHumidity || currentAirHumidity >= maxAirHumidity)) {
      console.log('Humedad máxima alcanzada - deteniendo riego')
      stopAutomaticWatering()
    }
  }

  // Método para iniciar el riego automático
  const startAutomaticWatering = () => {
    console.log('startAutomaticWatering llamado')
    if (activeMode.value === 'automatico' && modeConfig.value) {
      isWatering.value = true
      startTime.value = new Date()
      
      const totalDuration = (modeConfig.value.duration.minutes || 0) * 60 + (modeConfig.value.duration.seconds || 0)
      console.log('Iniciando riego automático con duración:', totalDuration, 'segundos')
      setRemainingTime(totalDuration)
      
      saveToStorage()
    }
  }

  // Método para detener el riego automático
  const stopAutomaticWatering = () => {
    console.log('stopAutomaticWatering llamado')
    if (activeMode.value === 'automatico' && isWatering.value) {
      isWatering.value = false
      remainingTime.value = null
      startTime.value = null
      
      // Cancelar intervalo de tiempo restante
      if (currentInterval) {
        clearInterval(currentInterval)
        currentInterval = null
      }
      
      // Reiniciar monitoreo
      startAutomaticMonitoring()
      
      saveToStorage()
    }
  }

  // Método para simular activación manual del riego automático (para testing)
  const triggerAutomaticWatering = () => {
    console.log('triggerAutomaticWatering llamado')
    if (activeMode.value === 'automatico' && modeConfig.value && !isWatering.value && !isPaused.value) {
      startAutomaticWatering()
    }
  }

  // Método para cancelar cualquier modo
  const cancelActiveMode = () => {
    console.log('cancelActiveMode llamado - activeMode:', activeMode.value, 'isWatering:', isWatering.value)
    
    try {
      // Cancelar intervalos si existen
      if (currentInterval) {
        clearInterval(currentInterval)
        currentInterval = null
      }
      
      if (countdownInterval) {
        clearInterval(countdownInterval)
        countdownInterval = null
      }
      
      activeMode.value = null
      modeConfig.value = {}
      isWatering.value = false
      remainingTime.value = null
      startTime.value = null
      isPaused.value = false
      pausedTime.value = null
      
      clearStorage()
      
      console.log('Modo activo cancelado exitosamente')
    } catch (error) {
      console.error('Error en cancelActiveMode:', error)
      throw error
    }
  }

  // Método específico para cancelar solo el modo automático
  const cancelAutomaticMode = () => {
    console.log('cancelAutomaticMode llamado - activeMode:', activeMode.value)
    
    try {
      // Solo cancelar si el modo activo es automático
      if (activeMode.value === 'automatico') {
        // Cancelar intervalo de monitoreo automático
        if (currentInterval) {
          clearInterval(currentInterval)
          currentInterval = null
        }
        
        // Si hay un modo programado en backup, restaurarlo
        const backupData = localStorage.getItem('programmedModeBackup')
        if (backupData) {
          const data = JSON.parse(backupData)
          if (data.activeMode === 'programado') {
            activeMode.value = 'programado'
            modeConfig.value = data.modeConfig || {}
            isWatering.value = data.isWatering || false
            remainingTime.value = data.remainingTime || null
            startTime.value = data.startTime ? new Date(data.startTime) : null
            isPaused.value = data.isPaused || false
            pausedTime.value = data.pausedTime || null
            
            // Reiniciar countdown si es necesario
            if (data.modeConfig && data.modeConfig.scheduledDateTime) {
              const scheduledDateTime = new Date(data.modeConfig.scheduledDateTime)
              const now = new Date()
              const timeUntilActivation = scheduledDateTime - now
              
              if (timeUntilActivation > 0) {
                startCountdownToActivation(timeUntilActivation)
                setTimeout(() => {
                  startProgrammedWatering()
                }, timeUntilActivation)
              }
            }
            
            // Limpiar el backup
            localStorage.removeItem('programmedModeBackup')
            
            console.log('Modo programado restaurado después de cancelar automático')
            saveToStorage()
            return
          }
        }
        
        // Si no hay modo programado, cancelar completamente
        activeMode.value = null
        modeConfig.value = {}
        isWatering.value = false
        remainingTime.value = null
        startTime.value = null
        isPaused.value = false
        pausedTime.value = null
        
        clearStorage()
      }
      
      console.log('Modo automático cancelado exitosamente')
    } catch (error) {
      console.error('Error en cancelAutomaticMode:', error)
      throw error
    }
  }

  // Método para pausar el riego
  const pauseIrrigation = () => {
    console.log('pauseIrrigation llamado - isWatering:', isWatering.value, 'isPaused:', isPaused.value)
    if (isWatering.value && !isPaused.value) {
      isPaused.value = true
      pausedTime.value = remainingTime.value
      
      // Cancelar el intervalo actual
      if (currentInterval) {
        clearInterval(currentInterval)
        currentInterval = null
      }
      
      // Pausar la bomba (simulado)
      isWatering.value = false
      
      console.log('Riego pausado - tiempo pausado:', pausedTime.value)
      saveToStorage()
    }
  }

  // Método para reanudar el riego
  const resumeIrrigation = () => {
    console.log('resumeIrrigation llamado - isPaused:', isPaused.value, 'pausedTime:', pausedTime.value)
    if (isPaused.value && pausedTime.value) {
      isPaused.value = false
      
      // Convertir el tiempo pausado de vuelta a segundos
      const timeParts = pausedTime.value.split(':')
      const minutes = parseInt(timeParts[0])
      const seconds = parseInt(timeParts[1])
      const totalSeconds = minutes * 60 + seconds
      
      // Reanudar la bomba
      isWatering.value = true
      
      // Reiniciar el contador
      setRemainingTime(totalSeconds)
      
      console.log('Riego reanudado - tiempo restante:', totalSeconds, 'segundos')
      pausedTime.value = null
      saveToStorage()
    }
  }

  // Gestión de tiempo restante
  const setRemainingTime = (totalSeconds) => {
    // Cancelar cualquier intervalo existente
    if (currentInterval) {
      clearInterval(currentInterval)
      currentInterval = null
    }
    
    // Validar que totalSeconds sea un número válido
    if (!totalSeconds || totalSeconds <= 0) {
      remainingTime.value = null
      return
    }
    
    remainingTime.value = formatTime(totalSeconds)
    
    currentInterval = setInterval(() => {
      totalSeconds--
      
      if (totalSeconds <= 0) {
        clearInterval(currentInterval)
        currentInterval = null
        completeIrrigation()
      } else {
        remainingTime.value = formatTime(totalSeconds)
      }
    }, 1000)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const completeIrrigation = () => {
    // Cancelar intervalo si existe
    if (currentInterval) {
      clearInterval(currentInterval)
      currentInterval = null
    }
    
    isWatering.value = false
    remainingTime.value = null
    
    // Solo limpiar el modo si es manual (programado y automático pueden repetir)
    if (activeMode.value === 'manual') {
      cancelActiveMode()
    } else {
      // Para modos programado y automático, solo guardar el estado actualizado
      saveToStorage()
    }
  }

  // Persistencia en localStorage
  const saveToStorage = () => {
    const state = {
      activeMode: activeMode.value,
      modeConfig: modeConfig.value,
      isWatering: isWatering.value,
      remainingTime: remainingTime.value,
      startTime: startTime.value,
      isPaused: isPaused.value,
      pausedTime: pausedTime.value
    }
    localStorage.setItem('irrigationState', JSON.stringify(state))
  }

  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem('irrigationState')
      if (stored) {
        const state = JSON.parse(stored)
        activeMode.value = state.activeMode
        modeConfig.value = state.modeConfig || {}
        isWatering.value = state.isWatering || false
        startTime.value = state.startTime ? new Date(state.startTime) : null
        isPaused.value = state.isPaused || false
        pausedTime.value = state.pausedTime || null
        
        // Si hay un riego en progreso y no está pausado, recalcular el tiempo restante
        if (isWatering.value && startTime.value && activeMode.value === 'manual' && !isPaused.value) {
          const config = modeConfig.value
          if (config && config.duration) {
            const totalDuration = (config.duration.minutes || 0) * 60
            const elapsed = Math.floor((new Date() - startTime.value) / 1000)
            const remaining = totalDuration - elapsed
            
            if (remaining > 0) {
              setRemainingTime(remaining)
            } else {
              // El tiempo ya expiró
              completeIrrigation()
            }
          }
        } else if (activeMode.value === 'programado' && !isWatering.value && modeConfig.value.scheduledDateTime) {
          // Restaurar countdown para modo programado
          const scheduledDateTime = new Date(modeConfig.value.scheduledDateTime)
          const now = new Date()
          const timeUntilActivation = scheduledDateTime - now
          
          if (timeUntilActivation > 0) {
            startCountdownToActivation(timeUntilActivation)
          } else {
            // Si ya pasó la hora, activar inmediatamente
            startProgrammedWatering()
          }
        } else if (activeMode.value === 'programado' && isWatering.value && !isPaused.value && startTime.value) {
          // Si el riego programado está activo, restaurar el tiempo restante del riego
          const config = modeConfig.value
          if (config && config.duration) {
            const totalDuration = (config.duration.minutes || 0) * 60
            const elapsed = Math.floor((new Date() - startTime.value) / 1000)
            const remaining = totalDuration - elapsed
            
            if (remaining > 0) {
              setRemainingTime(remaining)
            } else {
              // El tiempo ya expiró
              completeIrrigation()
            }
          }
        } else {
          remainingTime.value = state.remainingTime
        }
      }
    } catch (error) {
      console.error('Error loading irrigation state:', error)
      clearStorage()
    }
  }

  const clearStorage = () => {
    console.log('clearStorage llamado')
    localStorage.removeItem('irrigationState')
    console.log('Storage limpiado')
  }

  // Limpiar todos los intervalos activos
  const clearAllIntervals = () => {
    if (currentInterval) {
      clearInterval(currentInterval)
      currentInterval = null
    }
    
    if (countdownInterval) {
      clearInterval(countdownInterval)
      countdownInterval = null
    }
  }

  // Obtener descripción del modo activo
  const getModeDescription = () => {
    if (!activeMode.value || !modeConfig.value) return ''
    
    switch (activeMode.value) {
      case 'manual':
        const duration = modeConfig.value.duration
        const totalMinutes = (duration?.minutes || 0)
        return `Duración: ${totalMinutes}min`
      
      case 'programado':
        const scheduledDateTime = modeConfig.value.scheduledDateTime
        if (scheduledDateTime) {
          const date = new Date(scheduledDateTime)
          const formattedDate = date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
          const formattedTime = date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
          })
          return `Programado para: ${formattedDate} a las ${formattedTime}`
        }
        return 'Programado'
      
      case 'automatico':
        const thresholds = modeConfig.value.thresholds
        return `Temp máx: ${thresholds?.maxTemperature || 0}°C, H.Suelo: ${thresholds?.minSoilHumidity || 0}-${thresholds?.maxSoilHumidity || 0}%, H.Aire: ${thresholds?.minAirHumidity || 0}-${thresholds?.maxAirHumidity || 0}%`
      
      default:
        return ''
    }
  }

  // Inicializar al montar (solo una vez)
if (process.client && !window.irrigationInitialized) {
  loadFromStorage()
  window.irrigationInitialized = true
}

  return {
    // Estado
    activeMode,
    modeConfig,
    isWatering,
    remainingTime,
    startTime,
    isPaused,
    pausedTime,
    
    // Computeds
    hasActiveMode,
    isManualActive,
    isProgrammedActive, 
    isAutomaticActive,
    canAccessMode,
    
    // Métodos
    activateManualMode,
    activateProgrammedMode,
    activateAutomaticMode,
    cancelActiveMode,
    cancelAutomaticMode,
    pauseIrrigation,
    resumeIrrigation,
    getModeDescription,
    loadFromStorage,
    clearAllIntervals,
    startProgrammedWatering,
    startAutomaticWatering,
    stopAutomaticWatering,
    triggerAutomaticWatering
  }
} 