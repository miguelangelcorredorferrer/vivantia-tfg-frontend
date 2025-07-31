import { pool } from '../config/db.js';
import { handleNotFoundError, handleBadRequestError, handleInternalServerError, handleSuccessResponse } from '../utils/index.js';

// Modelo para PumpActivation
class PumpActivation {
  constructor(data = {}) {
    this.id = data.id;
    this.irrigation_config_id = data.irrigation_config_id;
    this.started_at = data.started_at;
    this.ended_at = data.ended_at;
    this.duration_minutes = data.duration_minutes;
    this.status = data.status || 'inactive';
    this.created_at = data.created_at;
  }

  // Calcular tiempo restante en segundos
  getRemainingTimeInSeconds() {
    if (!this.started_at || !this.duration_minutes || this.status !== 'active') {
      return 0;
    }

    const startTime = new Date(this.started_at);
    const now = new Date();
    const elapsedSeconds = Math.floor((now - startTime) / 1000);
    const totalSeconds = this.duration_minutes * 60;
    const remainingSeconds = totalSeconds - elapsedSeconds;

    return Math.max(0, remainingSeconds);
  }

  // Verificar si el riego está activo
  isActive() {
    return this.status === 'active';
  }

  // Verificar si el riego está pausado
  isPaused() {
    return this.status === 'paused';
  }

  // Verificar si el riego está completado
  isCompleted() {
    return this.status === 'completed';
  }

  // Calcular ended_at estimado basado en duración
  getEstimatedEndTime() {
    if (!this.started_at || !this.duration_minutes) return null;
    
    const startTime = new Date(this.started_at);
    const estimatedEnd = new Date(startTime.getTime() + (this.duration_minutes * 60 * 1000));
    return estimatedEnd;
  }
}

// Crear nueva activación de bomba
const createPumpActivation = async (req, res) => {
  const client = await pool.connect();
  try {
    const { irrigation_config_id, duration_minutes } = req.body;

    if (!irrigation_config_id || !duration_minutes) {
      return handleBadRequestError('ID de configuración y duración son obligatorios', res);
    }

    await client.query('BEGIN');

    // Verificar que no hay otra activación activa para esta configuración
    const activeCheck = await client.query(
      'SELECT id FROM pump_activations WHERE irrigation_config_id = $1 AND status IN ($2, $3)',
      [irrigation_config_id, 'active', 'paused']
    );

    if (activeCheck.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        success: false,
        message: 'Ya existe una activación activa o pausada para esta configuración'
      });
    }

    // Crear nueva activación
    const query = `
      INSERT INTO pump_activations (irrigation_config_id, started_at, duration_minutes, status)
      VALUES ($1, NOW(), $2, 'active')
      RETURNING *
    `;
    
    const result = await client.query(query, [irrigation_config_id, duration_minutes]);
    
    // Actualizar last_irrigation_at en irrigation_configs
    await client.query(
      'UPDATE irrigation_configs SET last_irrigation_at = NOW() WHERE id = $1',
      [irrigation_config_id]
    );

    await client.query('COMMIT');

    const activation = new PumpActivation(result.rows[0]);

    res.status(201).json({
      success: true,
      message: 'Activación de bomba creada exitosamente',
      data: activation
    });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({
      success: false,
      message: 'Error al crear activación de bomba',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Obtener activación activa por configuración
const getActivePumpActivation = async (req, res) => {
  try {
    const { irrigation_config_id } = req.params;

    const query = `
      SELECT * FROM pump_activations 
      WHERE irrigation_config_id = $1 AND status IN ('active', 'paused')
      ORDER BY started_at DESC 
      LIMIT 1
    `;
    
    const result = await pool.query(query, [irrigation_config_id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No hay activación activa para esta configuración'
      });
    }

    const activation = new PumpActivation(result.rows[0]);

    res.status(200).json({
      success: true,
      data: activation
    });
  } catch (error) {
    return handleInternalServerError('Error al obtener activación activa', res, error);
  }
};

// Actualizar estado de activación
const updatePumpActivationStatus = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return handleBadRequestError('Estado es obligatorio', res);
    }

    const validStatuses = ['active', 'completed', 'cancelled', 'paused', 'inactive'];
    if (!validStatuses.includes(status)) {
      return handleBadRequestError('Estado no válido', res);
    }

    await client.query('BEGIN');

    // Obtener activación actual
    const currentResult = await client.query('SELECT * FROM pump_activations WHERE id = $1', [id]);
    
    if (currentResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return handleNotFoundError('Activación no encontrada', res);
    }

    const currentActivation = currentResult.rows[0];
    let updateQuery = 'UPDATE pump_activations SET status = $1';
    let values = [status, id];

    // Si el estado es 'completed' o 'cancelled', establecer ended_at
    if (status === 'completed' || status === 'cancelled') {
      updateQuery += ', ended_at = NOW()';
      
      // Actualizar last_irrigation_at solo si se completó exitosamente
      if (status === 'completed') {
        await client.query(
          'UPDATE irrigation_configs SET last_irrigation_at = NOW() WHERE id = $1',
          [currentActivation.irrigation_config_id]
        );
      }
    }

    updateQuery += ' WHERE id = $2 RETURNING *';
    
    const result = await client.query(updateQuery, values);

    await client.query('COMMIT');

    const activation = new PumpActivation(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Estado de activación actualizado exitosamente',
      data: activation
    });
  } catch (error) {
    await client.query('ROLLBACK');
    return handleInternalServerError('Error al actualizar estado de activación', res, error);
  } finally {
    client.release();
  }
};

// Pausar activación
const pausePumpActivation = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      UPDATE pump_activations 
      SET status = 'paused'
      WHERE id = $1 AND status = 'active'
      RETURNING *
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se puede pausar: activación no encontrada o no está activa'
      });
    }

    const activation = new PumpActivation(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Activación pausada exitosamente',
      data: activation
    });
  } catch (error) {
    return handleInternalServerError('Error al pausar activación', res, error);
  }
};

// Reanudar activación
const resumePumpActivation = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      UPDATE pump_activations 
      SET status = 'active'
      WHERE id = $1 AND status = 'paused'
      RETURNING *
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se puede reanudar: activación no encontrada o no está pausada'
      });
    }

    const activation = new PumpActivation(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Activación reanudada exitosamente',
      data: activation
    });
  } catch (error) {
    return handleInternalServerError('Error al reanudar activación', res, error);
  }
};

// Completar activación
const completePumpActivation = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;

    await client.query('BEGIN');

    // Obtener activación actual
    const currentResult = await client.query('SELECT * FROM pump_activations WHERE id = $1', [id]);
    
    if (currentResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return handleNotFoundError('Activación no encontrada', res);
    }

    const currentActivation = currentResult.rows[0];

    // Actualizar activación como completada
    const result = await client.query(
      `UPDATE pump_activations 
       SET status = 'completed', ended_at = NOW() 
       WHERE id = $1 
       RETURNING *`,
      [id]
    );

    // Actualizar last_irrigation_at en irrigation_configs
    await client.query(
      'UPDATE irrigation_configs SET last_irrigation_at = NOW() WHERE id = $1',
      [currentActivation.irrigation_config_id]
    );

    await client.query('COMMIT');

    const activation = new PumpActivation(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Activación completada exitosamente',
      data: activation
    });
  } catch (error) {
    await client.query('ROLLBACK');
    return handleInternalServerError('Error al completar activación', res, error);
  } finally {
    client.release();
  }
};

// Obtener historial de activaciones por usuario
const getPumpActivationsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const limit = req.query.limit || 10;

    const query = `
      SELECT pa.*, ic.crop_id, ic.mode_type 
      FROM pump_activations pa
      JOIN irrigation_configs ic ON pa.irrigation_config_id = ic.id
      WHERE ic.user_id = $1
      ORDER BY pa.started_at DESC
      LIMIT $2
    `;
    
    const result = await pool.query(query, [user_id, limit]);
    
    const activations = result.rows.map(row => new PumpActivation(row));

    res.status(200).json({
      success: true,
      count: activations.length,
      data: activations
    });
  } catch (error) {
    return handleInternalServerError('Error al obtener historial de activaciones', res, error);
  }
};

export {
  PumpActivation,
  createPumpActivation,
  getActivePumpActivation,
  updatePumpActivationStatus,
  pausePumpActivation,
  resumePumpActivation,
  completePumpActivation,
  getPumpActivationsByUser
};
