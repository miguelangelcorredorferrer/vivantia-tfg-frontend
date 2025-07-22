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

// Buscar alertas por usuario
const getAlertsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    const query = `
      SELECT * FROM alerts 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [user_id, parseInt(limit), parseInt(offset)]);
    
    const alerts = result.rows.map(row => new Alert(row));

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

// Buscar alertas por tipo
const getAlertsByType = async (req, res) => {
  try {
    const { user_id, alert_type } = req.params;
    const { limit = 50 } = req.query;

    const query = `
      SELECT * FROM alerts 
      WHERE user_id = $1 AND alert_type = $2 
      ORDER BY created_at DESC 
      LIMIT $3
    `;
    const result = await pool.query(query, [user_id, alert_type, parseInt(limit)]);
    
    const alerts = result.rows.map(row => new Alert(row));

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener alertas por tipo',
      error: error.message
    });
  }
};

// Buscar alertas por severidad
const getAlertsBySeverity = async (req, res) => {
  try {
    const { user_id, severity } = req.params;
    const { limit = 50 } = req.query;

    const query = `
      SELECT * FROM alerts 
      WHERE user_id = $1 AND severity = $2 
      ORDER BY created_at DESC 
      LIMIT $3
    `;
    const result = await pool.query(query, [user_id, severity, parseInt(limit)]);
    
    const alerts = result.rows.map(row => new Alert(row));

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener alertas por severidad',
      error: error.message
    });
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

// Marcar todas las alertas de un usuario como resueltas
const resolveAllAlertsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const query = 'UPDATE alerts SET is_resolved = true WHERE user_id = $1 AND is_resolved = false';
    const result = await pool.query(query, [user_id]);

    res.status(200).json({
      success: true,
      message: `${result.rowCount} alertas marcadas como resueltas`,
      count: result.rowCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al resolver todas las alertas',
      error: error.message
    });
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

// Obtener conteo de alertas por tipo
const getAlertCountByType = async (req, res) => {
  try {
    const { user_id } = req.params;

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

    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener conteo por tipo',
      error: error.message
    });
  }
};

// Obtener conteo de alertas por severidad
const getAlertCountBySeverity = async (req, res) => {
  try {
    const { user_id } = req.params;

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

    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener conteo por severidad',
      error: error.message
    });
  }
};

// Funciones de conveniencia para crear alertas específicas

// Crear alerta de usuario registrado
const createUserRegisteredAlert = async (user_id, userName) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'user',
      'user_registered',
      'success',
      'Usuario registrado',
      `Bienvenido ${userName}! Tu cuenta ha sido creada exitosamente.`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de usuario registrado: ${error.message}`);
  }
};

// Crear alerta de dispositivo offline
const createDeviceOfflineAlert = async (user_id, deviceName) => {
  try {
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'device',
      'device_offline',
      'warning',
      'Dispositivo desconectado',
      `El dispositivo "${deviceName}" se ha desconectado.`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de dispositivo offline: ${error.message}`);
  }
};

// Crear alerta de umbral de humedad
const createHumidityThresholdAlert = async (user_id, currentHumidity, threshold, isMin = true) => {
  try {
    const condition = isMin ? 'por debajo' : 'por encima';
    const subtype = isMin ? 'humidity_min_threshold' : 'humidity_max_threshold';
    
    const query = `
      INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      user_id,
      'environmental',
      subtype,
      'warning',
      'Umbral de humedad superado',
      `La humedad está ${condition} del umbral (${currentHumidity}% vs ${threshold}%).`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de umbral de humedad: ${error.message}`);
  }
};

// Crear alerta de riego iniciado
const createIrrigationStartedAlert = async (user_id, duration, mode) => {
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
      'Riego iniciado',
      `Riego ${mode} iniciado por ${duration} minutos.`,
      false
    ];
    
    const result = await pool.query(query, values);
    return new Alert(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al crear alerta de riego iniciado: ${error.message}`);
  }
};

export {
  createAlert,
  findAlertById,
  getAlertById,
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
  createUserRegisteredAlert,
  createDeviceOfflineAlert,
  createHumidityThresholdAlert,
  createIrrigationStartedAlert
};
