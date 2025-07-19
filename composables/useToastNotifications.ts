import { useToast } from 'vue-toastification'

export const useToastNotifications = () => {
  const toast = useToast()

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

  // Notificaciones para operaciones de cultivos (futuras)
  const cropSelected = (cropName: string) => {
    toast.success(`🌱 Cultivo "${cropName}" seleccionado para monitoreo`)
  }

  const irrigationStarted = (deviceName: string) => {
    toast.info(`💧 Riego iniciado desde "${deviceName}"`)
  }

  const irrigationStopped = (deviceName: string) => {
    toast.warning(`🚰 Riego detenido desde "${deviceName}"`)
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

  // Notificaciones para sensores (futuras)
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
    // Sensores
    sensorAlert,
    // Sistema
    systemConnected,
    systemDisconnected,
    // Toast directo para casos especiales
    toast
  }
} 