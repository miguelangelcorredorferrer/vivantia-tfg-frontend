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
      
      const totalDuration = (modeConfig.value.duration.minutes || 0) * 60 + (modeConfig.value.duration.seconds || 0)
      console.log('Iniciando riego programado con duración:', totalDuration, 'segundos')
      setRemainingTime(totalDuration)
      
      saveToStorage()
    }
  }

  const activateAutomaticMode = (config) => {
    activeMode.value = 'automatico'
    modeConfig.value = config
    isWatering.value = false // Se activará según sensores
    startTime.value = null
    
    saveToStorage()
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
            const totalDuration = (config.duration.minutes || 0) * 60 + (config.duration.seconds || 0)
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
            const totalDuration = (config.duration.minutes || 0) * 60 + (config.duration.seconds || 0)
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
        const totalSeconds = (duration?.seconds || 0)
        return `Duración: ${totalMinutes}min ${totalSeconds}seg`
      
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
        return `Temp máx: ${thresholds?.maxTemperature || 0}°C, Humedad: ${thresholds?.minHumidity || 0}-${thresholds?.maxHumidity || 0}%`
      
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
    pauseIrrigation,
    resumeIrrigation,
    getModeDescription,
    loadFromStorage,
    clearAllIntervals,
    startProgrammedWatering
  }
} 