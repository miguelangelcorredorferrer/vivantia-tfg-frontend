import { a as useNuxtApp } from './server.mjs';

const useToastNotifications = () => {
  const { $toast } = useNuxtApp();
  const deviceAdded = (deviceName) => {
    $toast.success(`\u2705 Dispositivo "${deviceName}" agregado correctamente`);
  };
  const deviceAddError = () => {
    $toast.error("\u274C Error al agregar el dispositivo. Int\xE9ntalo de nuevo.");
  };
  const deviceActivated = (deviceName) => {
    $toast.info(`\u{1F4E1} Dispositivo "${deviceName}" est\xE1 enviando informaci\xF3n a la base de datos`);
  };
  const deviceDeactivated = (deviceName) => {
    $toast.warning(`\u23F9\uFE0F Dispositivo "${deviceName}" ha dejado de enviar informaci\xF3n a la base de datos`);
  };
  const appKeyCopied = () => {
    $toast.success(`\u{1F4CB} AppKey copiado al portapapeles`);
  };
  const appKeyCopyError = () => {
    $toast.error(`\u274C No se pudo copiar el AppKey`);
  };
  const cropSelected = (cropName) => {
    $toast.success(`\u{1F331} Cultivo "${cropName}" seleccionado para monitoreo`);
  };
  const irrigationStarted = (deviceName) => {
    $toast.info(`\u{1F4A7} Riego iniciado desde "${deviceName}"`);
  };
  const irrigationStopped = (deviceName) => {
    $toast.warning(`\u{1F6B0} Riego detenido desde "${deviceName}"`);
  };
  const irrigationCompleted = (mode, cropName) => {
    const cropText = cropName ? ` para "${cropName}"` : "";
    switch (mode) {
      case "manual":
        $toast.success(`\u2705 Riego manual completado${cropText}`);
        break;
      case "automatic":
        $toast.success(`\u{1F916} Riego autom\xE1tico completado${cropText}`);
        break;
      case "programmed":
        $toast.success(`\u23F0 Riego programado completado${cropText}`);
        break;
      default:
        $toast.success(`\u2705 Riego completado${cropText}`);
    }
  };
  const cropDeleted = (cropName) => {
    $toast.error(`\u{1F5D1}\uFE0F Cultivo "${cropName}" eliminado`);
  };
  const cropDeselected = (cropName) => {
    $toast.info(`\u274C Cultivo "${cropName}" deseleccionado`);
  };
  const cropUpdated = (cropName) => {
    $toast.success(`\u2705 Cultivo "${cropName}" editado correctamente`);
  };
  const sensorAlert = (sensorType, value, threshold) => {
    if (sensorType === "humidity" && value < threshold) {
      $toast.warning(`\u{1F335} Alerta: Humedad baja detectada (${value}% < ${threshold}%)`);
    } else if (sensorType === "temperature" && value > threshold) {
      $toast.warning(`\u{1F321}\uFE0F Alerta: Temperatura alta detectada (${value}\xB0C > ${threshold}\xB0C)`);
    }
  };
  const systemConnected = () => {
    $toast.success(`\u{1F517} Conectado a la red IoT`);
  };
  const systemDisconnected = () => {
    $toast.error(`\u{1F4E1} Desconectado de la red IoT`);
  };
  const showSuccess = (message) => {
    $toast.success(message);
  };
  const showError = (message) => {
    $toast.error(message);
  };
  const showInfo = (message) => {
    $toast.info(message);
  };
  const showWarning = (message) => {
    $toast.warning(message);
  };
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
    toast: $toast
  };
};

export { useToastNotifications as u };
//# sourceMappingURL=useToastNotifications-DaJGJiXK.mjs.map
