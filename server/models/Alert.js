import { formatDateToSpanish, getTimeAgo } from '../utils/index.js';

class Alert {
  constructor(data = {}) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.alert_type = data.alert_type; // 'user', 'environmental', 'device', 'crop', 'irrigation'
    this.alert_subtype = data.alert_subtype;
    this.severity = data.severity || 'info'; // 'info', 'success', 'warning', 'error'
    this.title = data.title;
    this.message = data.message;
    this.is_resolved = data.is_resolved || false;
    this.created_at = data.created_at;
  }

  // Verificar si la alerta es crítica
  isCritical() {
    return this.severity === 'error';
  }

  // Verificar si la alerta es de advertencia
  isWarning() {
    return this.severity === 'warning';
  }

  // Verificar si la alerta está resuelta
  isResolved() {
    return this.is_resolved;
  }

  // Obtener color según la severidad
  getSeverityColor() {
    const colorMap = {
      'info': '#3b82f6',
      'success': '#10b981',
      'warning': '#f59e0b',
      'error': '#ef4444'
    };
    return colorMap[this.severity] || '#6b7280';
  }

  // Formatear fecha de creación
  getFormattedCreatedAt() {
    return formatDateToSpanish(this.created_at);
  }

  // Obtener tiempo transcurrido desde la creación
  getTimeAgo() {
    return getTimeAgo(this.created_at);
  }

  // Obtener descripción corta para notificaciones
  getShortDescription() {
    return this.message.length > 50 
      ? this.message.substring(0, 50) + '...'
      : this.message;
  }
}

export default Alert; 