class Crop {
  constructor(data = {}) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.category = data.category;
    this.growth_days = data.growth_days;
    this.humidity_min = data.humidity_min;
    this.humidity_max = data.humidity_max;
    this.temperature_max = data.temperature_max;
    this.created_at = data.created_at;
    this.selected = data.selected || false;
  }

  // Verificar si el cultivo está seleccionado
  isSelected() {
    return this.selected;
  }

  // Obtener rango óptimo de humedad
  getOptimalHumidityRange() {
    return {
      min: this.humidity_min,
      max: this.humidity_max,
      range: `${this.humidity_min}% - ${this.humidity_max}%`
    };
  }

  // Verificar si una humedad está en el rango óptimo
  isHumidityOptimal(humidity) {
    if (!this.humidity_min || !this.humidity_max) return null;
    return humidity >= this.humidity_min && humidity <= this.humidity_max;
  }

  // Verificar si la temperatura está en rango seguro
  isTemperatureSafe(temperature) {
    if (!this.temperature_max) return null;
    return temperature <= this.temperature_max;
  }

  // Verificar si necesita atención basado en condiciones
  needsAttention(currentHumidity, currentTemperature) {
    const issues = [];
    
    if (currentHumidity !== undefined && !this.isHumidityOptimal(currentHumidity)) {
      if (currentHumidity < this.humidity_min) {
        issues.push('Humedad muy baja');
      } else if (currentHumidity > this.humidity_max) {
        issues.push('Humedad muy alta');
      }
    }
    
    if (currentTemperature !== undefined && !this.isTemperatureSafe(currentTemperature)) {
      issues.push('Temperatura muy alta');
    }
    
    return {
      needsAttention: issues.length > 0,
      issues
    };
  }
}

export default Crop; 