import { pool } from '../config/db.js';
import Alert from '../models/Alert.js';
import { handleNotFoundError, handleBadRequestError, handleInternalServerError, handleSuccessResponse } from '../utils/index.js';

// Crear nueva alerta
const createAlert = async (req, res) => {
  try {
    const {
      user_id, alert_type, alert_subtype, severity = 'info',
      title, message, is_resolved = false
    } = req.body;

    // Validar campos obligatorios
    if (!user_id || !alert_type || !alert_subtype || !title || !message) {
      return handleBadRequestError('Todos los campos obligatorios deben ser proporcionados', res);
    }

    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [user_id, alert_type, alert_subtype, severity, title, message, is_resolved];
    const result = await pool.query(query, values);
    const alert = new Alert(result.rows[0]);

    return handleSuccessResponse(res, alert, 'Alerta creada exitosamente', 201);
  } catch (error) {
    return handleInternalServerError('Error al crear alerta', res, error);
  }
};

// Buscar alerta por ID
const findAlertById = async (id) => {
  try {
    const query = 'SELECT * FROM alerts WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al buscar alerta: ${error.message}`);
  }
};

// Obtener alerta por ID (para API)
const getAlertById = async (req, res) => {
  try {
    const { id } = req.params;
    const alert = await findAlertById(id);

    if (!alert) {
      return handleNotFoundError('Alerta no encontrada', res);
    }

    return handleSuccessResponse(res, alert, 'Alerta obtenida exitosamente');
  } catch (error) {
    return handleInternalServerError('Error al obtener alerta', res, error);
  }
};

// Obtener alertas del usuario autenticado
const getMyAlerts = async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const user_id = req.user.id;

    const query = `
      SELECT * FROM alerts 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [user_id, parseInt(limit), parseInt(offset)]);
    
    const alerts = result.rows.map(row => new Alert(row).toJSON());

    return handleSuccessResponse(res, alerts, `${alerts.length} alertas obtenidas exitosamente`);
  } catch (error) {
    return handleInternalServerError('Error al obtener alertas del usuario', res, error);
  }
};

// Buscar alertas por usuario (para admin o mismo usuario)
const getAlertsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    // Verificar permisos: solo admin o el mismo usuario
    if (req.user.role !== 'admin' && req.user.id.toString() !== user_id) {
      return handleBadRequestError('No tienes permisos para ver estas alertas', res);
    }

    const query = `
      SELECT * FROM alerts 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [user_id, parseInt(limit), parseInt(offset)]);
    
    const alerts = result.rows.map(row => new Alert(row).toJSON());

    return handleSuccessResponse(res, alerts, `${alerts.length} alertas obtenidas exitosamente`);
  } catch (error) {
    return handleInternalServerError('Error al obtener alertas del usuario', res, error);
  }
};

// Buscar alertas no resueltas por usuario
const getUnresolvedAlertsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const query = `
      SELECT * FROM alerts 
      WHERE user_id = $1 AND is_resolved = false 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [user_id]);
    
    const alerts = result.rows.map(row => new Alert(row));

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts
    });
  } catch (error) {
    return handleInternalServerError('Error al obtener alertas no resueltas', res, error);
  }
};

// Buscar alertas por tipo (usuario autenticado)
const getAlertsByType = async (req, res) => {
  try {
    const { alert_type } = req.params;
    const { limit = 50 } = req.query;
    const user_id = req.user.id;

    const query = `
      SELECT * FROM alerts 
      WHERE user_id = $1 AND alert_type = $2 
      ORDER BY created_at DESC 
      LIMIT $3
    `;
    const result = await pool.query(query, [user_id, alert_type, parseInt(limit)]);
    
    const alerts = result.rows.map(row => new Alert(row).toJSON());

    return handleSuccessResponse(res, alerts, `${alerts.length} alertas obtenidas exitosamente`);
  } catch (error) {
    return handleInternalServerError('Error al obtener alertas por tipo', res, error);
  }
};

// Buscar alertas por severidad (usuario autenticado)
const getAlertsBySeverity = async (req, res) => {
  try {
    const { severity } = req.params;
    const { limit = 50 } = req.query;
    const user_id = req.user.id;

    const query = `
      SELECT * FROM alerts 
      WHERE user_id = $1 AND severity = $2 
      ORDER BY created_at DESC 
      LIMIT $3
    `;
    const result = await pool.query(query, [user_id, severity, parseInt(limit)]);
    
    const alerts = result.rows.map(row => new Alert(row).toJSON());

    return handleSuccessResponse(res, alerts, `${alerts.length} alertas obtenidas exitosamente`);
  } catch (error) {
    return handleInternalServerError('Error al obtener alertas por severidad', res, error);
  }
};

// Marcar alerta como resuelta
const resolveAlert = async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'UPDATE alerts SET is_resolved = true WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return handleNotFoundError('Alerta no encontrada', res);
    }
    
    const alert = new Alert(result.rows[0]);

    return handleSuccessResponse(res, alert, 'Alerta marcada como resuelta');
  } catch (error) {
    return handleInternalServerError('Error al resolver alerta', res, error);
  }
};

// Marcar alerta como no resuelta
const unresolveAlert = async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'UPDATE alerts SET is_resolved = false WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Alerta no encontrada'
      });
    }
    
    const alert = new Alert(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Alerta marcada como no resuelta',
      data: alert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al marcar alerta como no resuelta',
      error: error.message
    });
  }
};

// Marcar todas las alertas del usuario autenticado como resueltas
const resolveAllAlertsByUserId = async (req, res) => {
  try {
    const user_id = req.user.id;

    const query = 'UPDATE alerts SET is_resolved = true WHERE user_id = $1 AND is_resolved = false';
    const result = await pool.query(query, [user_id]);

    return handleSuccessResponse(res, { count: result.rowCount }, `${result.rowCount} alertas marcadas como resueltas`);
  } catch (error) {
    return handleInternalServerError('Error al resolver todas las alertas', res, error);
  }
};

// Eliminar alerta
const deleteAlert = async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'DELETE FROM alerts WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Alerta no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Alerta eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar alerta',
      error: error.message
    });
  }
};

// Eliminar alertas antiguas
const deleteOldAlerts = async (req, res) => {
  try {
    const { days = 30 } = req.query;

    const query = `
      DELETE FROM alerts 
      WHERE created_at < NOW() - INTERVAL '${parseInt(days)} days'
      AND is_resolved = true
    `;
    const result = await pool.query(query);

    res.status(200).json({
      success: true,
      message: `${result.rowCount} alertas antiguas eliminadas`,
      count: result.rowCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar alertas antiguas',
      error: error.message
    });
  }
};

// Obtener conteo de alertas por tipo (usuario autenticado)
const getAlertCountByType = async (req, res) => {
  try {
    const user_id = req.user.id;

    const query = `
      SELECT 
        alert_type,
        COUNT(*) as total,
        COUNT(CASE WHEN is_resolved = false THEN 1 END) as unresolved
      FROM alerts 
      WHERE user_id = $1 
      GROUP BY alert_type
    `;
    const result = await pool.query(query, [user_id]);

    return handleSuccessResponse(res, result.rows, 'Estadísticas por tipo obtenidas exitosamente');
  } catch (error) {
    return handleInternalServerError('Error al obtener conteo por tipo', res, error);
  }
};

// Obtener conteo de alertas por severidad (usuario autenticado)
const getAlertCountBySeverity = async (req, res) => {
  try {
    const user_id = req.user.id;

    const query = `
      SELECT 
        severity,
        COUNT(*) as total,
        COUNT(CASE WHEN is_resolved = false THEN 1 END) as unresolved
      FROM alerts 
      WHERE user_id = $1 
      GROUP BY severity
    `;
    const result = await pool.query(query, [user_id]);

    return handleSuccessResponse(res, result.rows, 'Estadísticas por severidad obtenidas exitosamente');
  } catch (error) {
    return handleInternalServerError('Error al obtener conteo por severidad', res, error);
  }
};

// Funciones de conveniencia para crear alertas específicas

// ==================== ALERTAS DE USUARIO ====================
// NOTA: Las funciones de alertas de autenticación se han movido a authAlertService.js

// ==================== ALERTAS DE DISPOSITIVOS ====================
// NOTA: Las funciones de alertas de dispositivos se han movido a deviceAlertService.js



// NOTA: Las funciones createDeviceOfflineAlert y createDeviceOnlineAlert se han movido a deviceAlertService.js

// ==================== ALERTAS AMBIENTALES ====================

// Crear alerta de umbral máximo de temperatura
const createTemperatureMaxThresholdAlert = async (user_id, currentTemperature, threshold) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'environmental',
      'temperature_max_threshold',
      'warning',
      'Temperatura crítica',
      `La temperatura ha superado el umbral máximo (${currentTemperature}°C vs ${threshold}°C).`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de temperatura máxima: ${error.message}`);
  }
};

// Crear alerta de umbral mínimo de humedad
const createHumidityMinThresholdAlert = async (user_id, currentHumidity, threshold) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'environmental',
      'humidity_min_threshold',
      'warning',
      'Humedad crítica baja',
      `La humedad del suelo está por debajo del umbral mínimo (${currentHumidity}% vs ${threshold}%).`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de humedad mínima: ${error.message}`);
  }
};

// Crear alerta de umbral máximo de humedad
const createHumidityMaxThresholdAlert = async (user_id, currentHumidity, threshold) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'environmental',
      'humidity_max_threshold',
      'warning',
      'Humedad crítica alta',
      `La humedad del suelo está por encima del umbral máximo (${currentHumidity}% vs ${threshold}%).`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de humedad máxima: ${error.message}`);
  }
};

// Crear alerta de umbral de humedad (función genérica - mantener compatibilidad)
const createHumidityThresholdAlert = async (user_id, currentHumidity, threshold, isMin = true) => {
  if (isMin) {
    return await createHumidityMinThresholdAlert(user_id, currentHumidity, threshold);
  } else {
    return await createHumidityMaxThresholdAlert(user_id, currentHumidity, threshold);
  }
};

// ==================== ALERTAS DE CULTIVOS ====================

// Crear alerta de cultivo seleccionado
const createCropSelectedAlert = async (user_id, cropName) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'crop',
      'crop_selected',
      'success',
      'Cultivo seleccionado',
      `El cultivo "${cropName}" ha sido seleccionado como activo para el riego.`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de cultivo seleccionado: ${error.message}`);
  }
};

// Crear alerta de cultivo deseleccionado
const createCropDeselectedAlert = async (user_id, cropName) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'crop',
      'crop_deselected',
      'info',
      'Cultivo deseleccionado',
      `El cultivo "${cropName}" ya no está activo para el riego.`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de cultivo deseleccionado: ${error.message}`);
  }
};

// Crear alerta de cultivo editado
const createCropEditedAlert = async (user_id, cropName) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'crop',
      'crop_edited',
      'info',
      'Cultivo actualizado',
      `El cultivo "${cropName}" ha sido actualizado exitosamente.`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de cultivo editado: ${error.message}`);
  }
};

// Crear alerta de cultivo eliminado
const createCropDeletedAlert = async (user_id, cropName) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'crop',
      'crop_deleted',
      'warning',
      'Cultivo eliminado',
      `El cultivo "${cropName}" ha sido eliminado del sistema.`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de cultivo eliminado: ${error.message}`);
  }
};

// Crear alerta de cultivo agregado
const createCropAddedAlert = async (user_id, cropName) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'crop',
      'crop_added',
      'success',
      'Cultivo agregado',
      `El cultivo "${cropName}" ha sido agregado exitosamente al sistema.`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de cultivo agregado: ${error.message}`);
  }
};

// ==================== ALERTAS DE RIEGO ====================

// Crear alerta de riego manual iniciado
const createManualStartedAlert = async (user_id, duration, cropName) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'irrigation',
      'manual_started',
      'info',
      'Riego manual iniciado',
      `Riego manual iniciado por ${duration} minutos para el cultivo "${cropName}".`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de riego manual iniciado: ${error.message}`);
  }
};

// Crear alerta de parada de emergencia
const createEmergencyStopAlert = async (user_id) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'irrigation',
      'emergency_stop',
      'warning',
      'Parada de emergencia',
      'El riego ha sido detenido por una parada de emergencia.',
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de parada de emergencia: ${error.message}`);
  }
};

// Crear alerta de riego manual cancelado
const createManualCancelledAlert = async (user_id) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'irrigation',
      'manual_cancelled',
      'info',
      'Riego cancelado',
      'El riego manual ha sido cancelado por el usuario.',
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de riego cancelado: ${error.message}`);
  }
};

// Crear alerta de riego programado guardado
const createProgrammedSavedAlert = async (user_id, scheduleInfo) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'irrigation',
      'programmed_saved',
      'success',
      'Riego programado configurado',
      `Riego programado configurado exitosamente. ${scheduleInfo}`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de riego programado guardado: ${error.message}`);
  }
};

// Crear alerta de recordatorio de riego programado
const createProgrammedReminderAlert = async (user_id, timeUntil, cropName) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'irrigation',
      'programmed_reminder',
      'warning',
      'Recordatorio de riego',
      `Tu riego programado para "${cropName}" comenzará en ${timeUntil}.`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de recordatorio: ${error.message}`);
  }
};

// Crear alerta de riego programado ejecutado
const createProgrammedScheduleAlert = async (user_id, cropName) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'irrigation',
      'programmed_schedule',
      'info',
      'Riego programado ejecutado',
      `El riego programado para "${cropName}" se ha ejecutado automáticamente.`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de riego programado ejecutado: ${error.message}`);
  }
};

// Crear alerta de riego programado cancelado
const createProgrammedCancelledAlert = async (user_id) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'irrigation',
      'programmed_cancelled',
      'warning',
      'Riego programado cancelado',
      'El riego programado ha sido cancelado por el usuario.',
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de riego programado cancelado: ${error.message}`);
  }
};

// Crear alerta de riego automático guardado
const createAutomaticSavedAlert = async (user_id, thresholdInfo) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'irrigation',
      'automatic_saved',
      'success',
      'Riego automático configurado',
      `Riego automático configurado exitosamente. ${thresholdInfo}`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de riego automático guardado: ${error.message}`);
  }
};

// Función de compatibilidad con el código existente
const createIrrigationStartedAlert = async (user_id, duration, mode, cropName = 'Cultivo') => {
  return await createManualStartedAlert(user_id, duration, cropName);
};

export {
  createAlert,
  findAlertById,
  getAlertById,
  getMyAlerts,
  getAlertsByUserId,
  getUnresolvedAlertsByUserId,
  getAlertsByType,
  getAlertsBySeverity,
  resolveAlert,
  unresolveAlert,
  resolveAllAlertsByUserId,
  deleteAlert,
  deleteOldAlerts,
  getAlertCountByType,
  getAlertCountBySeverity,
  // Alertas de dispositivo - movidas a deviceAlertService.js
  // Alertas ambientales
  createTemperatureMaxThresholdAlert,
  createHumidityMinThresholdAlert,
  createHumidityMaxThresholdAlert,
  createHumidityThresholdAlert,
  // Alertas de cultivo
  createCropSelectedAlert,
  createCropDeselectedAlert,
  createCropEditedAlert,
  createCropDeletedAlert,
  createCropAddedAlert,
  // Alertas de riego
  createManualStartedAlert,
  createEmergencyStopAlert,
  createManualCancelledAlert,
  createProgrammedSavedAlert,
  createProgrammedReminderAlert,
  createProgrammedScheduleAlert,
  createProgrammedCancelledAlert,
  createAutomaticSavedAlert,
  createIrrigationStartedAlert
};
