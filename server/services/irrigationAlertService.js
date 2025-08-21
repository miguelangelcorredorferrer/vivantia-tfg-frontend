import { pool } from '../config/db.js';
import Alert from '../models/Alert.js';

/**
 * Servicio para manejar alertas relacionadas con riego
 */

// Función auxiliar para crear alertas de riego
const createIrrigationAlert = async (user_id, alert_subtype, title, message, severity = 'info') => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [user_id, 'irrigation', alert_subtype, severity, title, message, false];
    const result = await pool.query(query, values);
    
    return new Alert(result.rows[0]);
  } catch (error) {
    console.error(`Error creando alerta de riego (${alert_subtype}):`, error.message);
    throw error;
  }
};

// Crear alerta de riego manual iniciado
export const createManualStartedAlert = async (user_id, cropName, durationMinutes) => {
  const title = 'Riego manual iniciado';
  const message = `Se ha iniciado el riego manual para ${cropName} con una duración de ${durationMinutes} minutos.`;
  
  return await createIrrigationAlert(user_id, 'manual_started', title, message, 'info');
};

// Crear alerta de parada de emergencia
export const createEmergencyStopAlert = async (user_id, cropName) => {
  const title = '🚨 Parada de emergencia';
  const message = `El riego de ${cropName} ha sido detenido de forma manual. Revisa el estado del sistema.`;
  
  return await createIrrigationAlert(user_id, 'emergency_stop', title, message, 'warning');
};

// Crear alerta de riego manual cancelado
export const createManualCancelledAlert = async (user_id, cropName) => {
  const title = 'Riego manual cancelado';
  const message = `El riego manual de ${cropName} ha sido cancelado antes de completarse.`;
  
  return await createIrrigationAlert(user_id, 'manual_cancelled', title, message, 'info');
};

// Crear alerta de riego completado
export const createIrrigationCompletedAlert = async (user_id, cropName, modeType) => {
  const title = 'Riego completado exitosamente';
  const message = `El riego ${modeType} de ${cropName} se ha completado exitosamente.`;
  
  return await createIrrigationAlert(user_id, 'irrigation_completed', title, message, 'success');
};

// Crear alerta de riego programado iniciado
export const createProgrammedStartedAlert = async (user_id, cropName, durationMinutes) => {
  const title = 'Riego programado iniciado';
  const message = `Se ha iniciado automáticamente el riego programado para ${cropName} con una duración de ${durationMinutes} minutos.`;
  
  return await createIrrigationAlert(user_id, 'programmed_started', title, message, 'info');
};

// Crear alerta de riego automático iniciado
export const createAutomaticStartedAlert = async (user_id, cropName, durationMinutes, triggerReason) => {
  const title = 'Riego automático activado';
  const message = `El sistema ha iniciado automáticamente el riego de ${cropName} por ${durationMinutes} minutos. Motivo: ${triggerReason}`;
  
  return await createIrrigationAlert(user_id, 'automatic_started', title, message, 'info');
};

// Crear alerta de configuración de riego actualizada
export const createIrrigationConfigUpdatedAlert = async (user_id, modeType, cropName) => {
  const title = 'Configuración de riego actualizada';
  const message = `La configuración del riego ${modeType} para ${cropName} ha sido actualizada exitosamente.`;
  
  return await createIrrigationAlert(user_id, 'config_updated', title, message, 'info');
};

// ========== ALERTAS PARA MODO PROGRAMADO ==========

// Crear alerta de configuración programada guardada
export const createProgrammedSavedAlert = async (user_id, cropName, startDateTime, frequencyType) => {
  const title = 'Configuración programada guardada';
  const scheduledDate = new Date(startDateTime).toLocaleString('es-ES');
  let frequencyText = '';
  
  switch (frequencyType) {
    case 'once':
      frequencyText = 'una vez';
      break;
    case 'daily':
      frequencyText = 'diariamente';
      break;
    case 'custom':
      frequencyText = 'días personalizados';
      break;
  }
  
  const message = `Se ha programado el riego de ${cropName} para ${scheduledDate} (${frequencyText}).`;
  
  return await createIrrigationAlert(user_id, 'programmed_saved', title, message, 'success');
};

// Crear alerta de recordatorio programado (5 min antes)
export const createProgrammedReminderAlert = async (user_id, cropName, minutesUntilStart) => {
  const title = '⏰ Recordatorio de riego programado';
  const message = `El riego programado de ${cropName} comenzará en ${minutesUntilStart} minutos.`;
  
  return await createIrrigationAlert(user_id, 'programmed_reminder', title, message, 'info');
};

// Crear alerta de riego programado iniciado automáticamente
export const createProgrammedScheduleAlert = async (user_id, cropName, durationMinutes) => {
  const title = '🌱 Riego programado iniciado';
  const message = `Se ha iniciado automáticamente el riego programado de ${cropName} con duración de ${durationMinutes} minutos.`;
  
  return await createIrrigationAlert(user_id, 'programmed_schedule', title, message, 'info');
};

// Crear alerta de configuración programada cancelada
export const createProgrammedCancelledAlert = async (user_id, cropName, wasActive = false) => {
  const title = wasActive ? 'Riego programado cancelado' : 'Configuración programada cancelada';
  const message = wasActive 
    ? `El riego programado activo de ${cropName} ha sido cancelado.`
    : `La configuración programada de ${cropName} ha sido cancelada.`;
  
  return await createIrrigationAlert(user_id, 'programmed_cancelled', title, message, 'warning');
};