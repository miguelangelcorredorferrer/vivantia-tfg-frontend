import { pool } from '../config/db.js';
import { handleNotFoundError, handleBadRequestError, handleInternalServerError, handleSuccessResponse } from '../utils/index.js';
import { sendDownlinkForConfig } from '../services/ttnService.js';
import { 
  createManualStartedAlert, 
  createEmergencyStopAlert, 
  createManualCancelledAlert 
} from '../services/irrigationAlertService.js';

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

    // Obtener información del usuario para la alerta
    const configQuery = `
      SELECT ic.user_id, ic.mode_type, c.name as crop_name
      FROM irrigation_configs ic
      LEFT JOIN crops c ON ic.crop_id = c.id
      WHERE ic.id = $1
    `;
    const configResult = await client.query(configQuery, [irrigation_config_id]);
    const configData = configResult.rows[0];

    // Enviar ON al iniciar riego (usa el dispositivo activo del usuario dueño de la config)
    try {
      const r = await sendDownlinkForConfig(irrigation_config_id, 'ON');
      console.log('[DOWNLINK][ON] OK:', r);
    } catch (e) {
      console.error('[DOWNLINK][ON] Error:', e?.message || e);
    }

    // Crear alerta de riego iniciado
    try {
      if (configData) {
        await createManualStartedAlert(configData.user_id, configData.crop_name || 'Cultivo', duration_minutes);
      }
    } catch (alertError) {
      console.warn('Error al crear alerta de riego iniciado:', alertError.message);
    }

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
      WHERE irrigation_config_id = $1 AND status IN ('active', 'paused', 'programmed')
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

    // Obtener información del usuario para la alerta
    const configQuery = `
      SELECT ic.user_id, ic.mode_type, c.name as crop_name
      FROM irrigation_configs ic
      LEFT JOIN crops c ON ic.crop_id = c.id
      WHERE ic.id = $1
    `;
    const configResult = await client.query(configQuery, [currentActivation.irrigation_config_id]);
    const configData = configResult.rows[0];

    // Enviar OFF si se cancela/completa, no enviar nada para otros estados
    if (status === 'completed' || status === 'cancelled') {
      try {
        const r = await sendDownlinkForConfig(currentActivation.irrigation_config_id, 'OFF');
        console.log('[DOWNLINK][OFF] OK:', r);
      } catch (e) {
        console.error('[DOWNLINK][OFF] Error:', e?.message || e);
      }

      // Crear alerta según el estado
      try {
        if (configData) {
          if (status === 'cancelled') {
            if (currentActivation.status === 'active') {
              // Era un riego activo que se canceló - parada de emergencia
              await createEmergencyStopAlert(configData.user_id, configData.crop_name || 'Cultivo');
            } else {
              // Era un riego pausado que se canceló
              await createManualCancelledAlert(configData.user_id, configData.crop_name || 'Cultivo');
            }
          }
          // Para 'completed' no necesitamos alerta específica, ya se envió cuando inició
        }
      } catch (alertError) {
        console.warn('Error al crear alerta de riego:', alertError.message);
      }
    }

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

    // Enviar OFF al pausar
    try {
      const r = await sendDownlinkForConfig(activation.irrigation_config_id, 'OFF');
      console.log('[DOWNLINK][OFF][pause] OK:', r);
    } catch (e) {
      console.error('[DOWNLINK][OFF][pause] Error:', e?.message || e);
    }

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

    // Enviar ON al reanudar
    try {
      const r = await sendDownlinkForConfig(activation.irrigation_config_id, 'ON');
      console.log('[DOWNLINK][ON][resume] OK:', r);
    } catch (e) {
      console.error('[DOWNLINK][ON][resume] Error:', e?.message || e);
    }

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

    // Enviar OFF al completar
    try {
      const r = await sendDownlinkForConfig(activation.irrigation_config_id, 'OFF');
      console.log('[DOWNLINK][OFF][complete] OK:', r);
    } catch (e) {
      console.error('[DOWNLINK][OFF][complete] Error:', e?.message || e);
    }

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

// Obtener la activación más reciente por irrigation_config_id
const getLatestPumpActivationByConfig = async (req, res) => {
  try {
    const { irrigation_config_id } = req.params;

    if (!irrigation_config_id) {
      return handleBadRequestError('irrigation_config_id es obligatorio', res);
    }

    const query = `
      SELECT * FROM pump_activations 
      WHERE irrigation_config_id = $1 
      ORDER BY created_at DESC 
      LIMIT 1
    `;

    const result = await pool.query(query, [irrigation_config_id]);
    
    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        data: null,
        message: 'No se encontraron activaciones para esta configuración'
      });
    }

    const activation = new PumpActivation(result.rows[0]);

    res.status(200).json({
      success: true,
      data: activation
    });
  } catch (error) {
    return handleInternalServerError('Error al obtener activación más reciente', res, error);
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
  getPumpActivationsByUser,
  getLatestPumpActivationByConfig
};
