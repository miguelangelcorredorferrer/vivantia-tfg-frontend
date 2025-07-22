import { formatDateToSpanish } from '../utils/index.js';

class SensorReading {
  constructor(data = {}) {
    this.id = data.id;
    this.device_id = data.device_id;
    this.humidity = data.humidity;
    this.temperature = data.temperature;
    this.received_at = data.received_at;
  }

  // Verificar si los valores están en rango normal
  isInNormalRange(humidityMin = 30, humidityMax = 70, tempMax = 35) {
    return {
      humidity: this.humidity >= humidityMin && this.humidity <= humidityMax,
      temperature: this.temperature <= tempMax,
      overall: (this.humidity >= humidityMin && this.humidity <= humidityMax) && 
               (this.temperature <= tempMax)
    };
  }

  // Obtener nivel de alarma
  getAlarmLevel(humidityMin = 30, humidityMax = 70, tempMax = 35) {
    const humidityOut = this.humidity < humidityMin || this.humidity > humidityMax;
    const tempOut = this.temperature > tempMax;

    if (humidityOut && tempOut) return 'critical';
    if (humidityOut || tempOut) return 'warning';
    return 'normal';
  }

  // Formatear fecha de recepción
  getFormattedReceivedAt() {
    return formatDateToSpanish(this.received_at);
  }
}

export default SensorReading; 