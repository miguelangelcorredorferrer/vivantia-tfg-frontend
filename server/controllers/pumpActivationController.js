import { pool } from '../config/db.js';
import PumpActivation from '../models/PumpActivation.js';
import { handleNotFoundError, handleBadRequestError, handleInternalServerError, handleSuccessResponse } from '../utils/index.js';

// Crear nueva activación de bomba
const createPumpActivation = async (req, res) => {
  try {
    const { irrigation_config_id, duration_minutes, status = 'active' } = req.body;

    if (!irrigation_config_id || !duration_minutes) {
      return res.status(400).json({
        success: false,
        message: 'ID de configuración de riego y duración son obligatorios'
      });
    }

    const query = `
      INSERT INTO pump_activations (irrigation_config_id, started_at, duration_minutes, status)
      VALUES ($1, NOW(), $2, $3)
      RETURNING *
    `;
    
    const values = [irrigation_config_id, duration_minutes, status];
    const result = await pool.query(query, values);
    const activation = new PumpActivation(result.rows[0]);

    res.status(201).json({
      success: true,
      message: 'Activación de bomba creada exitosamente',
      data: activation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear activación de bomba',
      error: error.message
    });
  }
};

// Buscar por ID
const findPumpActivationById = async (id) => {
  try {
    const query = 'SELECT * FROM pump_activations WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return new PumpActivation(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al buscar activación: ${error.message}`);
  }
};

// Obtener activación por ID
const getPumpActivationById = async (req, res) => {
  try {
    const { id } = req.params;
    const activation = await findPumpActivationById(id);

    if (!activation) {
      return handleNotFoundError('Activación no encontrada', res);
    }

    return handleSuccessResponse(res, activation, 'Activación obtenida exitosamente');
  } catch (error) {
    return handleInternalServerError('Error al obtener activación', res, error);
  }
};

// Buscar activaciones activas
const getActivePumpActivations = async (req, res) => {
  try {
    const query = 'SELECT * FROM pump_activations WHERE status = $1 ORDER BY started_at DESC';
    const result = await pool.query(query, ['active']);
    
    const activations = result.rows.map(row => new PumpActivation(row));

    res.status(200).json({
      success: true,
      count: activations.length,
      data: activations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener activaciones activas',
      error: error.message
    });
  }
};

// Buscar activaciones por usuario
const getPumpActivationsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { limit = 50 } = req.query;

    const query = `
      SELECT pa.* FROM pump_activations pa
      JOIN irrigation_configs ic ON pa.irrigation_config_id = ic.id
      WHERE ic.user_id = $1
      ORDER BY pa.started_at DESC
      LIMIT $2
    `;
    const result = await pool.query(query, [user_id, parseInt(limit)]);
    
    const activations = result.rows.map(row => new PumpActivation(row));

    res.status(200).json({
      success: true,
      count: activations.length,
      data: activations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener activaciones del usuario',
      error: error.message
    });
  }
};

// Completar activación
const completePumpActivation = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      UPDATE pump_activations 
      SET status = 'completed', ended_at = NOW() 
      WHERE id = $1 
      RETURNING *
    `;
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Activación no encontrada'
      });
    }
    
    const completedActivation = new PumpActivation(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Activación completada exitosamente',
      data: completedActivation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al completar activación',
      error: error.message
    });
  }
};

// Cancelar activación
const cancelPumpActivation = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      UPDATE pump_activations 
      SET status = 'cancelled', ended_at = NOW() 
      WHERE id = $1 
      RETURNING *
    `;
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Activación no encontrada'
      });
    }
    
    const cancelledActivation = new PumpActivation(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Activación cancelada exitosamente',
      data: cancelledActivation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cancelar activación',
      error: error.message
    });
  }
};

// Obtener estadísticas de activaciones
const getPumpActivationStats = async (req, res) => {
  try {
    const { irrigation_config_id } = req.params;
    const { days = 30 } = req.query;

    const query = `
      SELECT 
        COUNT(*) as total_activations,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_activations,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_activations,
        COUNT(CASE WHEN status = 'error' THEN 1 END) as error_activations,
        AVG(duration_minutes) as avg_duration_minutes,
        SUM(duration_minutes) as total_duration_minutes
      FROM pump_activations 
      WHERE irrigation_config_id = $1 
      AND started_at >= NOW() - INTERVAL '${parseInt(days)} days'
    `;
    const result = await pool.query(query, [irrigation_config_id]);

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
};

export {
  createPumpActivation,
  findPumpActivationById,
  getPumpActivationById,
  getActivePumpActivations,
  getPumpActivationsByUserId,
  completePumpActivation,
  cancelPumpActivation,
  getPumpActivationStats
};
