import { ref, computed } from 'vue'

// Estado global compartido entre todas las páginas de modos
const activeMode = ref(null) // 'manual', 'programado', 'automatico', null
const modeConfig = ref({})
const isWatering = ref(false)
const remainingTime = ref(null)
const startTime = ref(null)

// Variable para controlar el intervalo del tiempo restante
let currentInterval = null

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
    // Cancelar cualquier modo activo
    if (activeMode.value) {
      cancelActiveMode()
    }
    
    activeMode.value = 'programado'
    modeConfig.value = config
    isWatering.value = false
    remainingTime.value = null
    startTime.value = null
    
    // Programar la activación del riego
    const scheduledDateTime = new Date(config.scheduledDateTime)
    const now = new Date()
    const timeUntilActivation = scheduledDateTime - now
    
    if (timeUntilActivation > 0) {
      // Programar la activación
      setTimeout(() => {
        startProgrammedWatering()
      }, timeUntilActivation)
    } else {
      // Si la fecha ya pasó, activar inmediatamente
      startProgrammedWatering()
    }
    
    saveToStorage()
  }

  // Método para iniciar el riego programado
  const startProgrammedWatering = () => {
    if (activeMode.value === 'programado' && modeConfig.value) {
      isWatering.value = true
      startTime.value = new Date()
      
      const totalDuration = (modeConfig.value.duration.minutes || 0) * 60 + (modeConfig.value.duration.seconds || 0)
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
    // Cancelar intervalo si existe
    if (currentInterval) {
      clearInterval(currentInterval)
      currentInterval = null
    }
    
    activeMode.value = null
    modeConfig.value = {}
    isWatering.value = false
    remainingTime.value = null
    startTime.value = null
    
    clearStorage()
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
      startTime: startTime.value
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
        
        // Si hay un riego en progreso, recalcular el tiempo restante
        if (isWatering.value && startTime.value && activeMode.value === 'manual') {
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
    localStorage.removeItem('irrigationState')
  }

  // Limpiar todos los intervalos activos
  const clearAllIntervals = () => {
    if (currentInterval) {
      clearInterval(currentInterval)
      currentInterval = null
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

  // Inicializar al montar
  if (process.client) {
    loadFromStorage()
  }

  return {
    // Estado
    activeMode,
    modeConfig,
    isWatering,
    remainingTime,
    startTime,
    
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
    getModeDescription,
    loadFromStorage,
    clearAllIntervals,
    startProgrammedWatering
  }
} 