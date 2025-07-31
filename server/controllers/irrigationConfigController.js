import { pool } from '../config/db.js';
import { IrrigationConfig, ManualConfig, AutomaticConfig, ProgrammedConfig } from '../models/IrrigationConfig.js';
import { handleNotFoundError, handleBadRequestError, handleInternalServerError, handleSuccessResponse } from '../utils/index.js';

// Crear nueva configuración de riego
const createIrrigationConfig = async (req, res) => {
  try {
    const { user_id, crop_id, mode_type, is_active = false } = req.body;

    if (!user_id || !crop_id || !mode_type) {
      return handleBadRequestError('User ID, crop ID y tipo de modo son obligatorios', res);
    }

    const query = `
      INSERT INTO irrigation_configs (user_id, crop_id, mode_type, is_active)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const values = [user_id, crop_id, mode_type, is_active];
    const result = await pool.query(query, values);
    const config = new IrrigationConfig(result.rows[0]);

    res.status(201).json({
      success: true,
      message: 'Configuración de riego creada exitosamente',
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear configuración de riego',
      error: error.message
    });
  }
};

// Buscar por ID
const findIrrigationConfigById = async (id) => {
  try {
    const query = 'SELECT * FROM irrigation_configs WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return new IrrigationConfig(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al buscar configuración: ${error.message}`);
  }
};

// Obtener configuración por ID
const getIrrigationConfigById = async (req, res) => {
  try {
    const { id } = req.params;
    const config = await findIrrigationConfigById(id);

    if (!config) {
      return handleNotFoundError('Configuración no encontrada', res);
    }

    return handleSuccessResponse(res, config, 'Configuración obtenida exitosamente');
  } catch (error) {
    return handleInternalServerError('Error al obtener configuración', res, error);
  }
};

// Buscar configuraciones activas por usuario
const getActiveIrrigationConfigsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const query = 'SELECT * FROM irrigation_configs WHERE user_id = $1 AND is_active = true';
    const result = await pool.query(query, [user_id]);
    
    const configs = result.rows.map(row => new IrrigationConfig(row));

    res.status(200).json({
      success: true,
      count: configs.length,
      data: configs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener configuraciones activas',
      error: error.message
    });
  }
};

// Activar configuración
const activateIrrigationConfig = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;

    const existingConfig = await findIrrigationConfigById(id);
    if (!existingConfig) {
      return res.status(404).json({
        success: false,
        message: 'Configuración no encontrada'
      });
    }

    await client.query('BEGIN');

    // Desactivar todas las configuraciones del usuario
    await client.query(
      'UPDATE irrigation_configs SET is_active = false WHERE user_id = $1',
      [existingConfig.user_id]
    );

    // Activar esta configuración
    const result = await client.query(
      'UPDATE irrigation_configs SET is_active = true WHERE id = $1 RETURNING *',
      [id]
    );

    await client.query('COMMIT');
    
    const activatedConfig = new IrrigationConfig(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Configuración activada exitosamente',
      data: activatedConfig
    });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({
      success: false,
      message: 'Error al activar configuración',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Desactivar configuración de riego
const deactivateIrrigationConfig = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;

    const existingConfig = await findIrrigationConfigById(id);
    if (!existingConfig) {
      return res.status(404).json({
        success: false,
        message: 'Configuración no encontrada'
      });
    }

    await client.query('BEGIN');

    // Desactivar esta configuración específica
    const result = await client.query(
      'UPDATE irrigation_configs SET is_active = false WHERE id = $1 RETURNING *',
      [id]
    );

    await client.query('COMMIT');
    
    const deactivatedConfig = new IrrigationConfig(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Configuración desactivada exitosamente',
      data: deactivatedConfig
    });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({
      success: false,
      message: 'Error al desactivar configuración',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Crear configuración manual
const createManualConfig = async (req, res) => {
  try {
    const { 
      irrigation_config_id, 
      duration_minutes, 
      begin_notification = false, 
      final_notification = false 
    } = req.body;

    if (!irrigation_config_id || !duration_minutes) {
      return res.status(400).json({
        success: false,
        message: 'ID de configuración de riego y duración son obligatorios'
      });
    }

    const query = `
      INSERT INTO manual_configs (irrigation_config_id, duration_minutes, begin_notification, final_notification)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      irrigation_config_id, 
      duration_minutes, 
      begin_notification, 
      final_notification
    ]);
    const config = new ManualConfig(result.rows[0]);

    res.status(201).json({
      success: true,
      message: 'Configuración manual creada exitosamente',
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear configuración manual',
      error: error.message
    });
  }
};

// Crear configuración automática
const createAutomaticConfig = async (req, res) => {
  try {
    const {
      irrigation_config_id, humidity_min_threshold, humidity_max_threshold,
      temperature_max_threshold, duration_minutes, use_crop_thresholds = true
    } = req.body;

    if (!irrigation_config_id || !humidity_min_threshold || !humidity_max_threshold || !temperature_max_threshold || !duration_minutes) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos obligatorios deben ser proporcionados'
      });
    }

    const query = `
      INSERT INTO automatic_configs (
        irrigation_config_id, humidity_min_threshold, humidity_max_threshold,
        temperature_max_threshold, duration_minutes, use_crop_thresholds
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const values = [
      irrigation_config_id, humidity_min_threshold, humidity_max_threshold,
      temperature_max_threshold, duration_minutes, use_crop_thresholds
    ];
    
    const result = await pool.query(query, values);
    const config = new AutomaticConfig(result.rows[0]);

    res.status(201).json({
      success: true,
      message: 'Configuración automática creada exitosamente',
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear configuración automática',
      error: error.message
    });
  }
};

// Eliminar configuración de riego
const deleteIrrigationConfig = async (req, res) => {
  try {
    const { id } = req.params;

    const existingConfig = await findIrrigationConfigById(id);
    if (!existingConfig) {
      return res.status(404).json({
        success: false,
        message: 'Configuración no encontrada'
      });
    }

    const query = 'DELETE FROM irrigation_configs WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Configuración no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Configuración eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar configuración',
      error: error.message
    });
  }
};

// Buscar configuraciones por usuario y tipo
const getIrrigationConfigsByUserAndType = async (req, res) => {
  try {
    const { user_id, mode_type } = req.params;

    const query = 'SELECT * FROM irrigation_configs WHERE user_id = $1 AND mode_type = $2';
    const result = await pool.query(query, [user_id, mode_type]);
    
    const configs = result.rows.map(row => new IrrigationConfig(row));

    res.status(200).json({
      success: true,
      count: configs.length,
      data: configs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener configuraciones por tipo',
      error: error.message
    });
  }
};

// Actualizar última fecha de riego
const updateLastIrrigation = async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'UPDATE irrigation_configs SET last_irrigation_at = NOW() WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Configuración no encontrada'
      });
    }
    
    const updatedConfig = new IrrigationConfig(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Última fecha de riego actualizada',
      data: updatedConfig
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar último riego',
      error: error.message
    });
  }
};

// Obtener última fecha de riego del usuario
const getLastIrrigationDate = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Obtener la configuración con la fecha de último riego más reciente
    const query = `
      SELECT last_irrigation_at, mode_type, crop_id
      FROM irrigation_configs 
      WHERE user_id = $1 
      AND last_irrigation_at IS NOT NULL
      ORDER BY last_irrigation_at DESC 
      LIMIT 1
    `;
    
    const result = await pool.query(query, [user_id]);
    
    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        data: null,
        message: 'No hay registros de riego'
      });
    }
    
    const lastIrrigation = result.rows[0];

    res.status(200).json({
      success: true,
      data: {
        last_irrigation_at: lastIrrigation.last_irrigation_at,
        mode_type: lastIrrigation.mode_type,
        crop_id: lastIrrigation.crop_id
      },
      message: 'Última fecha de riego obtenida'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener última fecha de riego',
      error: error.message
    });
  }
};

// Obtener configuración específica según el tipo
const getSpecificConfig = async (req, res) => {
  try {
    const { id } = req.params;

    // Primero obtener la configuración principal
    const config = await findIrrigationConfigById(id);
    if (!config) {
      return res.status(404).json({
        success: false,
        message: 'Configuración no encontrada'
      });
    }

    let query, tableName;
    
    switch (config.mode_type) {
      case 'manual':
        tableName = 'manual_configs';
        break;
      case 'automatic':
        tableName = 'automatic_configs';
        break;
      case 'programmed':
        tableName = 'programmed_configs';
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Tipo de configuración no válido'
        });
    }

    query = `SELECT * FROM ${tableName} WHERE irrigation_config_id = $1`;
    const result = await pool.query(query, [id]);

    res.status(200).json({
      success: true,
      data: result.rows[0] || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener configuración específica',
      error: error.message
    });
  }
};

// Crear configuración programada
const createProgrammedConfig = async (req, res) => {
  try {
    const {
      irrigation_config_id, start_date, start_time, end_date, duration_minutes,
      duration_seconds = 0, frequency_type, custom_days,
      notify_before_start = true, notify_before_minutes = 5,
      notify_at_start = true, notify_at_end = true
    } = req.body;

    if (!irrigation_config_id || !start_date || !start_time || !end_date || !duration_minutes || !frequency_type) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos obligatorios deben ser proporcionados'
      });
    }

    const query = `
      INSERT INTO programmed_configs (
        irrigation_config_id, start_date, start_time, end_date, duration_minutes,
        duration_seconds, frequency_type, custom_days, notify_before_start,
        notify_before_minutes, notify_at_start, notify_at_end
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;
    
    const values = [
      irrigation_config_id, start_date, start_time, end_date, duration_minutes,
      duration_seconds, frequency_type, custom_days, notify_before_start,
      notify_before_minutes, notify_at_start, notify_at_end
    ];
    
    const result = await pool.query(query, values);
    const config = new ProgrammedConfig(result.rows[0]);

    res.status(201).json({
      success: true,
      message: 'Configuración programada creada exitosamente',
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear configuración programada',
      error: error.message
    });
  }
};

// Actualizar próxima ejecución de configuración programada
const updateNextExecution = async (req, res) => {
  try {
    const { id } = req.params;
    const { nextExecution } = req.body;

    if (!nextExecution) {
      return res.status(400).json({
        success: false,
        message: 'Próxima ejecución es obligatoria'
      });
    }

    const query = 'UPDATE programmed_configs SET next_execution = $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [nextExecution, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Configuración programada no encontrada'
      });
    }
    
    const updatedConfig = new ProgrammedConfig(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Próxima ejecución actualizada',
      data: updatedConfig
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar próxima ejecución',
      error: error.message
    });
  }
};

// Actualizar configuración manual
const updateManualConfig = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      duration_minutes, 
      begin_notification, 
      final_notification 
    } = req.body;

    if (!duration_minutes) {
      return res.status(400).json({
        success: false,
        message: 'Duración es obligatoria'
      });
    }

    const query = `
      UPDATE manual_configs 
      SET duration_minutes = $1, 
          begin_notification = $2, 
          final_notification = $3
      WHERE id = $4
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      duration_minutes, 
      begin_notification, 
      final_notification, 
      id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Configuración manual no encontrada'
      });
    }

    const config = new ManualConfig(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Configuración manual actualizada exitosamente',
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar configuración manual',
      error: error.message
    });
  }
};

// Buscar configuración por tipo específico
const findManualConfigByIrrigationId = async (irrigation_config_id) => {
  try {
    const query = 'SELECT * FROM manual_configs WHERE irrigation_config_id = $1';
    const result = await pool.query(query, [irrigation_config_id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return new ManualConfig(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al buscar configuración manual: ${error.message}`);
  }
};

const findAutomaticConfigByIrrigationId = async (irrigation_config_id) => {
  try {
    const query = 'SELECT * FROM automatic_configs WHERE irrigation_config_id = $1';
    const result = await pool.query(query, [irrigation_config_id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return new AutomaticConfig(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al buscar configuración automática: ${error.message}`);
  }
};

const findProgrammedConfigByIrrigationId = async (irrigation_config_id) => {
  try {
    const query = 'SELECT * FROM programmed_configs WHERE irrigation_config_id = $1';
    const result = await pool.query(query, [irrigation_config_id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return new ProgrammedConfig(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al buscar configuración programada: ${error.message}`);
  }
};

// ===== FUNCIONES PRINCIPALES DE IRRIGATION CONFIG =====
export {
  createIrrigationConfig,
  findIrrigationConfigById,
  getIrrigationConfigById,
  getActiveIrrigationConfigsByUser,
  getIrrigationConfigsByUserAndType,
  activateIrrigationConfig,
  deactivateIrrigationConfig,
  updateLastIrrigation,
  getLastIrrigationDate,
  getSpecificConfig,
  deleteIrrigationConfig
};

// ===== FUNCIONES DE MANUAL CONFIG =====
export {
  createManualConfig,
  findManualConfigByIrrigationId,
  updateManualConfig
};

// ===== FUNCIONES DE AUTOMATIC CONFIG =====
export {
  createAutomaticConfig,
  findAutomaticConfigByIrrigationId
};

// ===== FUNCIONES DE PROGRAMMED CONFIG =====
export {
  createProgrammedConfig,
  updateNextExecution,
  findProgrammedConfigByIrrigationId
};
