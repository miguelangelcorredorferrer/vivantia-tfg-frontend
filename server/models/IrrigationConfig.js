import { 
  getTimeAgo, 
  needsIrrigation, 
  formatDuration, 
  formatDurationWithSeconds, 
  formatDateToSpanish, 
  isScheduledForToday 
} from '../utils/index.js';

class IrrigationConfig {
  constructor(data = {}) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.crop_id = data.crop_id;
    this.mode_type = data.mode_type; // 'manual', 'automatic', 'programmed'
    this.is_active = data.is_active || false;
    this.created_at = data.created_at;
    this.last_irrigation_at = data.last_irrigation_at;
  }

  // Verificar si la configuración está activa
  isActive() {
    return this.is_active;
  }


  // Verificar si necesita riego (basado en última vez)
  needsIrrigation(hoursThreshold = 24) {
    return needsIrrigation(this.last_irrigation_at, hoursThreshold);
  }

  // Obtener tiempo desde el último riego
  getTimeSinceLastIrrigation() {
    if (!this.last_irrigation_at) return 'Nunca';
    return getTimeAgo(this.last_irrigation_at);
  }
}

// Modelo para configuración manual
class ManualConfig {
  constructor(data = {}) {
    this.id = data.id;
    this.irrigation_config_id = data.irrigation_config_id;
    this.duration_minutes = data.duration_minutes;
    this.begin_notification = data.begin_notification || false;
    this.final_notification = data.final_notification || false;
    this.created_at = data.created_at;
  }

  // Obtener duración formateada
  getFormattedDuration() {
    return formatDuration(this.duration_minutes);
  }

  // Verificar si debe notificar al inicio
  shouldNotifyAtStart() {
    return this.begin_notification;
  }

  // Verificar si debe notificar al final
  shouldNotifyAtEnd() {
    return this.final_notification;
  }
}

// Modelo para configuración automática
class AutomaticConfig {
  constructor(data = {}) {
    this.id = data.id;
    this.irrigation_config_id = data.irrigation_config_id;
    this.humidity_min_threshold = data.humidity_min_threshold;
    this.humidity_max_threshold = data.humidity_max_threshold;
    this.temperature_max_threshold = data.temperature_max_threshold;
    this.duration_minutes = data.duration_minutes;
    this.use_crop_thresholds = data.use_crop_thresholds || true;
    this.created_at = data.created_at;
  }

  // Verificar si debería activarse el riego automático
  shouldTriggerIrrigation(currentHumidity, currentTemperature) {
    const humidityLow = currentHumidity < this.humidity_min_threshold;
    const temperatureHigh = currentTemperature > this.temperature_max_threshold;
    
    return {
      shouldTrigger: humidityLow || temperatureHigh,
      reasons: {
        humidityLow,
        temperatureHigh,
        currentHumidity,
        currentTemperature,
        thresholds: {
          humidity_min: this.humidity_min_threshold,
          humidity_max: this.humidity_max_threshold,
          temperature_max: this.temperature_max_threshold
        }
      }
    };
  }

  // Obtener duración formateada
  getFormattedDuration() {
    return formatDuration(this.duration_minutes);
  }
}

// Modelo para configuración programada
class ProgrammedConfig {
  constructor(data = {}) {
    this.id = data.id;
    this.irrigation_config_id = data.irrigation_config_id;
    this.start_date = data.start_date;
    this.start_time = data.start_time;
    this.end_date = data.end_date;
    this.duration_minutes = data.duration_minutes;
    this.duration_seconds = data.duration_seconds || 0;
    this.frequency_type = data.frequency_type; // 'once', 'daily', 'custom'
    this.custom_days = data.custom_days; // Array de días
    this.notify_before_start = data.notify_before_start || true;
    this.notify_before_minutes = data.notify_before_minutes || 5;
    this.notify_at_start = data.notify_at_start || true;
    this.notify_at_end = data.notify_at_end || true;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.last_execution = data.last_execution;
    this.next_execution = data.next_execution;
  }

  // Verificar si está programado para ejecutarse hoy
  isScheduledForToday() {
    return isScheduledForToday(this.start_date, this.frequency_type, this.custom_days);
  }

  // Obtener próxima ejecución formateada
  getNextExecutionFormatted() {
    if (!this.next_execution) return 'No programada';
    return formatDateToSpanish(this.next_execution);
  }

  // Obtener duración formateada
  getFormattedDuration() {
    return formatDurationWithSeconds(this.duration_minutes, this.duration_seconds);
  }

  // Obtener tipo de frecuencia formateado
  getFormattedFrequency() {
    const frequencyMap = {
      'once': 'Una vez',
      'daily': 'Diariamente',
      'custom': 'Días personalizados'
    };
    return frequencyMap[this.frequency_type] || 'Desconocido';
  }
}

export { IrrigationConfig, ManualConfig, AutomaticConfig, ProgrammedConfig }; 