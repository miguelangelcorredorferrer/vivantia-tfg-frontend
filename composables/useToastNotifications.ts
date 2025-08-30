// Composable completamente seguro para SSR
export const useToastNotifications = () => {
  // Función de fallback que nunca falla
  const createSafeToast = () => ({
    success: (msg: string) => {
      if (process.client) console.log('SUCCESS:', msg)
    },
    error: (msg: string) => {
      if (process.client) console.log('ERROR:', msg)
    },
    info: (msg: string) => {
      if (process.client) console.log('INFO:', msg)
    },
    warning: (msg: string) => {
      if (process.client) console.log('WARNING:', msg)
    }
  })

  // Obtener toast de forma completamente segura
  let toast = createSafeToast()
  
  // Solo intentar obtener el toast real en el cliente
  if (process.client) {
    try {
      const nuxtApp = useNuxtApp()
      if (nuxtApp && nuxtApp.$toast) {
        toast = nuxtApp.$toast
      }
    } catch (error) {
      // Si algo falla, usar el fallback
      console.warn('Toast not available, using fallback')
    }
  }

  // Notificaciones para dispositivos
  const deviceAdded = (deviceName: string) => {
    toast.success(`✅ Dispositivo "${deviceName}" agregado correctamente`)
  }

  const deviceAddError = () => {
    toast.error('❌ Error al agregar el dispositivo. Inténtalo de nuevo.')
  }

  const deviceActivated = (deviceName: string) => {
    toast.info(`📡 Dispositivo "${deviceName}" está enviando información a la base de datos`)
  }

  const deviceDeactivated = (deviceName: string) => {
    toast.warning(`⏹️ Dispositivo "${deviceName}" ha dejado de enviar información a la base de datos`)
  }

  // Notificaciones para AppKey
  const appKeyCopied = () => {
    toast.success(`📋 AppKey copiado al portapapeles`)
  }

  const appKeyCopyError = () => {
    toast.error(`❌ No se pudo copiar el AppKey`)
  }

  // Notificaciones para operaciones de cultivos
  const cropSelected = (cropName: string) => {
    toast.success(`🌱 Cultivo "${cropName}" seleccionado para monitoreo`)
  }

  const irrigationStarted = (deviceName: string) => {
    toast.info(`💧 Riego iniciado desde "${deviceName}"`)
  }

  const irrigationStopped = (deviceName: string) => {
    toast.warning(`🚰 Riego detenido desde "${deviceName}"`)
  }

  const irrigationCompleted = (mode: string, cropName?: string) => {
    const cropText = cropName ? ` para "${cropName}"` : ''
    
    switch (mode) {
      case 'manual':
        toast.success(`✅ Riego manual completado${cropText}`)
        break
      case 'automatic':
        toast.success(`🤖 Riego automático completado${cropText}`)
        break
      case 'programmed':
        toast.success(`⏰ Riego programado completado${cropText}`)
        break
      default:
        toast.success(`✅ Riego completado${cropText}`)
    }
  }

  const cropDeleted = (cropName: string) => {
    toast.error(`🗑️ Cultivo "${cropName}" eliminado`)
  }

  const cropDeselected = (cropName: string) => {
    toast.info(`❌ Cultivo "${cropName}" deseleccionado`)
  }

  const cropUpdated = (cropName: string) => {
    toast.success(`✅ Cultivo "${cropName}" editado correctamente`)
  }

  // Notificaciones para sensores
  const sensorAlert = (sensorType: string, value: number, threshold: number) => {
    if (sensorType === 'humidity' && value < threshold) {
      toast.warning(`🌵 Alerta: Humedad baja detectada (${value}% < ${threshold}%)`)
    } else if (sensorType === 'temperature' && value > threshold) {
      toast.warning(`🌡️ Alerta: Temperatura alta detectada (${value}°C > ${threshold}°C)`)
    }
  }

  // Notificaciones generales del sistema
  const systemConnected = () => {
    toast.success(`🔗 Conectado a la red IoT`)
  }

  const systemDisconnected = () => {
    toast.error(`📡 Desconectado de la red IoT`)
  }

  // Funciones genéricas para uso directo
  const showSuccess = (message: string) => {
    toast.success(message)
  }

  const showError = (message: string) => {
    toast.error(message)
  }

  const showInfo = (message: string) => {
    toast.info(message)
  }

  const showWarning = (message: string) => {
    toast.warning(message)
  }

  return {
    // Dispositivos
    deviceAdded,
    deviceAddError,
    deviceActivated,
    deviceDeactivated,
    // AppKey
    appKeyCopied,
    appKeyCopyError,
    // Cultivos
    cropSelected,
    cropDeleted,
    cropDeselected,
    cropUpdated,
    irrigationStarted,
    irrigationStopped,
    irrigationCompleted,
    // Sensores
    sensorAlert,
    // Sistema
    systemConnected,
    systemDisconnected,
    // Funciones genéricas
    showSuccess,
    showError,
    showInfo,
    showWarning,
    // Toast directo para casos especiales
    toast
  }
} 