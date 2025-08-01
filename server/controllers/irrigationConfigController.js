import { pool } from '../config/db.js';
import { IrrigationConfig, AutomaticConfig, ProgrammedConfig } from '../models/IrrigationConfig.js';
import { handleNotFoundError, handleBadRequestError, handleInternalServerError, handleSuccessResponse } from '../utils/index.js';

// Crear nueva configuración de riego
const createIrrigationConfig = async (req, res) => {
  try {
    const { user_id, crop_id, mode_type, duration_minutes, is_active = false } = req.body;

    if (!user_id || !crop_id || !mode_type || !duration_minutes) {
      return handleBadRequestError('User ID, crop ID, tipo de modo y duración son obligatorios', res);
    }

    const query = `
      INSERT INTO irrigation_configs (user_id, crop_id, mode_type, duration_minutes, is_active)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const values = [user_id, crop_id, mode_type, duration_minutes, is_active];
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

// Las configuraciones manuales ahora están integradas en irrigation_configs
// No se necesita función separada para crear configuración manual

// Crear configuración automática
const createAutomaticConfig = async (req, res) => {
  try {
    const {
      config_id, humidity_min_threshold, humidity_max_threshold,
      temperature_max_threshold, use_crop_thresholds = true
    } = req.body;

    if (!config_id || !humidity_min_threshold || !humidity_max_threshold || !temperature_max_threshold) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos obligatorios deben ser proporcionados'
      });
    }

    const query = `
      INSERT INTO automatic_settings (
        config_id, humidity_min_threshold, humidity_max_threshold,
        temperature_max_threshold, use_crop_thresholds
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const values = [
      config_id, humidity_min_threshold, humidity_max_threshold,
      temperature_max_threshold, use_crop_thresholds
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

// Buscar todas las configuraciones por usuario
const getIrrigationConfigsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const query = 'SELECT * FROM irrigation_configs WHERE user_id = $1 ORDER BY created_at DESC';
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
      message: 'Error al obtener configuraciones del usuario',
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
        // Para manual, devolver la configuración principal (ya incluye duration_minutes)
        return res.status(200).json({
          success: true,
          data: config
        });
      case 'automatic':
        tableName = 'automatic_settings';
        break;
      case 'programmed':
        tableName = 'programmed_settings';
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Tipo de configuración no válido'
        });
    }

    query = `SELECT * FROM ${tableName} WHERE config_id = $1`;
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
  const client = await pool.connect();
  try {
    console.log('📝 Datos recibidos en createProgrammedConfig:', req.body);
    
    const {
      user_id,
      crop_id, 
      start_datetime, 
      end_date, 
      duration_minutes,
      frequency_type, 
      custom_days,
      notify_before_minutes = 5,
      notify_at_start = true, 
      notify_at_end = true
    } = req.body;

    console.log('🔍 Validando datos:', {
      user_id,
      crop_id,
      start_datetime,
      duration_minutes,
      frequency_type,
      custom_days
    });

    if (!user_id || !crop_id || !start_datetime || !duration_minutes || !frequency_type) {
      return res.status(400).json({
        success: false,
        message: 'Los campos user_id, crop_id, start_datetime, duration_minutes y frequency_type son obligatorios'
      });
    }

    // Validar frequency_type
    if (!['once', 'daily', 'custom'].includes(frequency_type)) {
      return res.status(400).json({
        success: false,
        message: 'frequency_type debe ser: once, daily o custom'
      });
    }

    // Validar custom_days si frequency_type es 'custom'
    if (frequency_type === 'custom' && (!custom_days || !Array.isArray(custom_days) || custom_days.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'custom_days es obligatorio cuando frequency_type es custom'
      });
    }

    console.log('🚀 Iniciando transacción...');
    await client.query('BEGIN');

    // 1. Buscar o crear configuración de riego programado
    console.log('1️⃣ Buscando configuración existente...');
    let irrigationConfig;
    const existingConfigQuery = `
      SELECT * FROM irrigation_configs 
      WHERE user_id = $1 AND crop_id = $2 AND mode_type = 'programmed'
    `;
    const existingConfigResult = await client.query(existingConfigQuery, [user_id, crop_id]);
    console.log('📊 Configuraciones existentes encontradas:', existingConfigResult.rows.length);

    if (existingConfigResult.rows.length > 0) {
      // Actualizar configuración existente
      irrigationConfig = existingConfigResult.rows[0];
      console.log('✅ Configuración programada existente encontrada:', irrigationConfig.id);
    } else {
      // Crear nueva configuración
      const createConfigQuery = `
        INSERT INTO irrigation_configs (user_id, crop_id, mode_type, is_active)
        VALUES ($1, $2, 'programmed', false)
        RETURNING *
      `;
      const createConfigResult = await client.query(createConfigQuery, [user_id, crop_id]);
      irrigationConfig = createConfigResult.rows[0];
      console.log('✅ Nueva configuración programada creada:', irrigationConfig.id);
    }

    // 2. Actualizar duration_minutes en irrigation_config
    const updateDurationQuery = `
      UPDATE irrigation_configs 
      SET duration_minutes = $1 
      WHERE id = $2
    `;
    await client.query(updateDurationQuery, [duration_minutes, irrigationConfig.id]);

    // 3. Eliminar configuración programada anterior si existe
    const deletePrevProgrammedQuery = `
      DELETE FROM programmed_settings 
      WHERE config_id = $1
    `;
    await client.query(deletePrevProgrammedQuery, [irrigationConfig.id]);

    // 4. Crear nueva configuración programada
    console.log('4️⃣ Creando nueva configuración programada...');
    const createProgrammedQuery = `
      INSERT INTO programmed_settings (
        config_id, start_datetime, frequency_type, custom_days, 
        notify_before_minutes, notify_at_start, notify_at_end, next_execution
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $2)
      RETURNING *
    `;
    
    const programmedValues = [
      irrigationConfig.id, 
      start_datetime, 
      frequency_type, 
      custom_days || [],
      notify_before_minutes,
      notify_at_start, 
      notify_at_end
    ];
    
    console.log('📋 Valores para programmed_settings:', programmedValues);
    const programmedResult = await client.query(createProgrammedQuery, programmedValues);
    console.log('✅ Programmed settings creada:', programmedResult.rows[0]);
    
    // Crear el modelo ProgrammedConfig
    let programmedConfig;
    try {
      programmedConfig = new ProgrammedConfig(programmedResult.rows[0]);
      console.log('📦 Modelo ProgrammedConfig creado correctamente');
    } catch (modelError) {
      console.error('❌ Error creando modelo ProgrammedConfig:', modelError);
      throw new Error(`Error en modelo ProgrammedConfig: ${modelError.message}`);
    }

    // 5. Crear registro en pump_activations con status 'programmed'
    const createPumpActivationQuery = `
      INSERT INTO pump_activations (
        irrigation_config_id, started_at, duration_minutes, status
      )
      VALUES ($1, $2, $3, 'programmed')
      RETURNING *
    `;
    
    const pumpActivationResult = await client.query(createPumpActivationQuery, [
      irrigationConfig.id,
      start_datetime,
      duration_minutes
    ]);

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Configuración programada creada exitosamente',
      data: {
        irrigationConfig: new IrrigationConfig(irrigationConfig),
        programmedConfig,
        pumpActivation: pumpActivationResult.rows[0]
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error completo creando configuración programada:', error);
    console.error('❌ Stack trace:', error.stack);
    console.error('❌ Tipo de error:', error.constructor.name);
    res.status(500).json({
      success: false,
      message: 'Error al crear configuración programada',
      error: error.message,
      debug: process.env.NODE_ENV === 'development' ? {
        stack: error.stack,
        type: error.constructor.name
      } : undefined
    });
  } finally {
    client.release();
  }
};

// Cancelar configuración programada COMPLETA (eliminar configuración)
const cancelProgrammedConfig = async (req, res) => {
  const client = await pool.connect();
  try {
    const { irrigation_config_id } = req.params;

    await client.query('BEGIN');

    // 1. Actualizar pump_activations a 'cancelled'
    const updatePumpActivationQuery = `
      UPDATE pump_activations 
      SET status = 'cancelled', ended_at = NOW() 
      WHERE irrigation_config_id = $1 AND status IN ('programmed', 'active', 'paused')
      RETURNING *
    `;
    await client.query(updatePumpActivationQuery, [irrigation_config_id]);

    // 2. Eliminar configuración programada
    const deleteProgrammedQuery = `
      DELETE FROM programmed_settings 
      WHERE config_id = $1
      RETURNING *
    `;
    const deleteResult = await client.query(deleteProgrammedQuery, [irrigation_config_id]);

    // 3. Desactivar configuración de riego
    const deactivateConfigQuery = `
      UPDATE irrigation_configs 
      SET is_active = false 
      WHERE id = $1
      RETURNING *
    `;
    const configResult = await client.query(deactivateConfigQuery, [irrigation_config_id]);

    await client.query('COMMIT');

    res.status(200).json({
      success: true,
      message: 'Configuración programada cancelada exitosamente',
      data: {
        irrigationConfig: configResult.rows[0],
        deletedProgrammedConfig: deleteResult.rows[0]
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error cancelando configuración programada:', error);
    res.status(500).json({
      success: false,
      message: 'Error al cancelar configuración programada',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Cancelar SOLO el riego programado activo (mantener configuración para futuros riegos)
const cancelProgrammedIrrigation = async (req, res) => {
  const client = await pool.connect();
  try {
    const { irrigation_config_id } = req.params;

    await client.query('BEGIN');

    // 1. Actualizar pump_activations a 'cancelled' solo si está activo o pausado
    const updatePumpActivationQuery = `
      UPDATE pump_activations 
      SET status = 'cancelled', ended_at = NOW() 
      WHERE irrigation_config_id = $1 AND status IN ('active', 'paused')
      RETURNING *
    `;
    const pumpResult = await client.query(updatePumpActivationQuery, [irrigation_config_id]);

    // 2. Actualizar last_irrigation_at en irrigation_configs si había riego activo
    if (pumpResult.rows.length > 0) {
      const updateLastIrrigationQuery = `
        UPDATE irrigation_configs 
        SET last_irrigation_at = NOW() 
        WHERE id = $1
        RETURNING *
      `;
      await client.query(updateLastIrrigationQuery, [irrigation_config_id]);
    }

    // 3. Desactivar configuración temporalmente (is_active = false)
    const deactivateConfigQuery = `
      UPDATE irrigation_configs 
      SET is_active = false 
      WHERE id = $1
      RETURNING *
    `;
    const configResult = await client.query(deactivateConfigQuery, [irrigation_config_id]);

    // NOTA: NO eliminamos programmed_settings para mantener configuración futura

    await client.query('COMMIT');

    res.status(200).json({
      success: true,
      message: 'Riego programado cancelado exitosamente (configuración mantenida)',
      data: {
        irrigationConfig: configResult.rows[0],
        cancelledPumpActivations: pumpResult.rows
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error cancelando riego programado:', error);
    res.status(500).json({
      success: false,
      message: 'Error al cancelar riego programado',
      error: error.message
    });
  } finally {
    client.release();
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

    const query = 'UPDATE programmed_settings SET next_execution = $1 WHERE config_id = $2 RETURNING *';
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

// Actualizar ejecuciones (última y próxima) de configuración programada
const updateProgrammedExecution = async (req, res) => {
  try {
    const { id } = req.params;
    const { last_execution, next_execution } = req.body;

    console.log('📝 Actualizando ejecuciones para config:', id, {
      last_execution,
      next_execution
    });

    // Construir la consulta dinámicamente
    let setParts = [];
    let values = [];
    let paramCount = 1;

    if (last_execution !== undefined) {
      setParts.push(`last_execution = $${paramCount}`);
      values.push(last_execution);
      paramCount++;
    }

    if (next_execution !== undefined) {
      setParts.push(`next_execution = $${paramCount}`);
      values.push(next_execution);
      paramCount++;
    }

    if (setParts.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Se debe proporcionar al menos last_execution o next_execution'
      });
    }

    const query = `UPDATE programmed_settings SET ${setParts.join(', ')} WHERE config_id = $${paramCount} RETURNING *`;
    values.push(id);

    console.log('🔍 Ejecutando query:', query, 'con valores:', values);

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Configuración programada no encontrada'
      });
    }
    
    const updatedConfig = new ProgrammedConfig(result.rows[0]);
    console.log('✅ Configuración actualizada:', updatedConfig);

    res.status(200).json({
      success: true,
      message: 'Ejecuciones actualizadas exitosamente',
      data: updatedConfig
    });
  } catch (error) {
    console.error('❌ Error actualizando ejecuciones:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar ejecuciones',
      error: error.message
    });
  }
};

// Actualizar configuración manual (ahora en irrigation_configs)
const updateManualConfig = async (req, res) => {
  try {
    const { id } = req.params;
    const { duration_minutes } = req.body;

    if (!duration_minutes) {
      return res.status(400).json({
        success: false,
        message: 'Duración es obligatoria'
      });
    }

    const query = `
      UPDATE irrigation_configs 
      SET duration_minutes = $1
      WHERE id = $2 AND mode_type = 'manual'
      RETURNING *
    `;
    
    const result = await pool.query(query, [duration_minutes, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Configuración manual no encontrada'
      });
    }

    const config = new IrrigationConfig(result.rows[0]);

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

// Buscar configuración manual (ahora en irrigation_configs)
const findManualConfigByIrrigationId = async (irrigation_config_id) => {
  try {
    const query = 'SELECT * FROM irrigation_configs WHERE id = $1 AND mode_type = \'manual\'';
    const result = await pool.query(query, [irrigation_config_id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return new IrrigationConfig(result.rows[0]);
  } catch (error) {
    throw new Error(`Error al buscar configuración manual: ${error.message}`);
  }
};

const findAutomaticConfigByIrrigationId = async (irrigation_config_id) => {
  try {
    const query = 'SELECT * FROM automatic_settings WHERE config_id = $1';
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
    const query = 'SELECT * FROM programmed_settings WHERE config_id = $1';
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
  getIrrigationConfigsByUser,
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
  cancelProgrammedConfig,
  cancelProgrammedIrrigation,
  updateNextExecution,
  updateProgrammedExecution,
  findProgrammedConfigByIrrigationId
};
