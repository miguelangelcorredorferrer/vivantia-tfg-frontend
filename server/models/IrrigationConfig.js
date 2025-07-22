import { pool } from '../config/db.js';

class IrrigationConfig {
  constructor(data = {}) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.crop_id = data.crop_id;
    this.mode_type = data.mode_type; // 'manual', 'automatic', 'programmed'
    this.is_active = data.is_active || false;
    this.created_at = data.created_at;
    this.last_irrigation_at = data.last_irrigation_at;
  }

  // Crear nueva configuración de riego
  static async create(configData) {
    try {
      const { user_id, crop_id, mode_type, is_active = false } = configData;

      const query = `
        INSERT INTO irrigation_configs (user_id, crop_id, mode_type, is_active)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      
      const values = [user_id, crop_id, mode_type, is_active];
      const result = await pool.query(query, values);
      return new IrrigationConfig(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al crear configuración de riego: ${error.message}`);
    }
  }

  // Buscar por ID
  static async findById(id) {
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
  }

  // Buscar por usuario y tipo
  static async findByUserAndType(user_id, mode_type) {
    try {
      const query = 'SELECT * FROM irrigation_configs WHERE user_id = $1 AND mode_type = $2';
      const result = await pool.query(query, [user_id, mode_type]);
      
      return result.rows.map(row => new IrrigationConfig(row));
    } catch (error) {
      throw new Error(`Error al buscar configuraciones: ${error.message}`);
    }
  }

  // Buscar configuración activa por usuario
  static async findActiveByUser(user_id) {
    try {
      const query = 'SELECT * FROM irrigation_configs WHERE user_id = $1 AND is_active = true';
      const result = await pool.query(query, [user_id]);
      
      return result.rows.map(row => new IrrigationConfig(row));
    } catch (error) {
      throw new Error(`Error al buscar configuraciones activas: ${error.message}`);
    }
  }

  // Activar configuración (desactivar otras del mismo usuario)
  async activate() {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Desactivar todas las configuraciones del usuario
      await client.query(
        'UPDATE irrigation_configs SET is_active = false WHERE user_id = $1',
        [this.user_id]
      );

      // Activar esta configuración
      const result = await client.query(
        'UPDATE irrigation_configs SET is_active = true WHERE id = $1 RETURNING *',
        [this.id]
      );

      await client.query('COMMIT');
      
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(`Error al activar configuración: ${error.message}`);
    } finally {
      client.release();
    }
  }

  // Actualizar última fecha de riego
  async updateLastIrrigation() {
    try {
      const query = 'UPDATE irrigation_configs SET last_irrigation_at = NOW() WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [this.id]);
      
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al actualizar último riego: ${error.message}`);
    }
  }

  // Obtener configuración específica según el tipo
  async getSpecificConfig() {
    try {
      let query, tableName;
      
      switch (this.mode_type) {
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
          throw new Error('Tipo de configuración no válido');
      }

      query = `SELECT * FROM ${tableName} WHERE irrigation_config_id = $1`;
      const result = await pool.query(query, [this.id]);
      
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Error al obtener configuración específica: ${error.message}`);
    }
  }

  // Eliminar configuración
  async delete() {
    try {
      const query = 'DELETE FROM irrigation_configs WHERE id = $1';
      const result = await pool.query(query, [this.id]);
      
      if (result.rowCount === 0) {
        throw new Error('Configuración no encontrada');
      }
      
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar configuración: ${error.message}`);
    }
  }
}

// Modelo para configuración manual
class ManualConfig {
  constructor(data = {}) {
    this.id = data.id;
    this.irrigation_config_id = data.irrigation_config_id;
    this.duration_minutes = data.duration_minutes;
    this.created_at = data.created_at;
  }

  static async create(configData) {
    try {
      const { irrigation_config_id, duration_minutes } = configData;

      const query = `
        INSERT INTO manual_configs (irrigation_config_id, duration_minutes)
        VALUES ($1, $2)
        RETURNING *
      `;
      
      const result = await pool.query(query, [irrigation_config_id, duration_minutes]);
      return new ManualConfig(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al crear configuración manual: ${error.message}`);
    }
  }

  static async findByIrrigationConfigId(irrigation_config_id) {
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
  }
}

// Modelo para configuración automática
class AutomaticConfig {
  constructor(data = {}) {
    this.id = data.id;
    this.irrigation_config_id = data.irrigation_config_id;
    this.humidity_min_threshold = data.humidity_min_threshold;
    this.humidity_max_threshold = data.humidity_max_threshold;
    this.temperature_max_threshold = data.temperature_max_threshold;
    this.duration_minutes = data.duration_minutes;
    this.use_crop_thresholds = data.use_crop_thresholds || true;
    this.created_at = data.created_at;
  }

  static async create(configData) {
    try {
      const {
        irrigation_config_id, humidity_min_threshold, humidity_max_threshold,
        temperature_max_threshold, duration_minutes, use_crop_thresholds = true
      } = configData;

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
      return new AutomaticConfig(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al crear configuración automática: ${error.message}`);
    }
  }

  static async findByIrrigationConfigId(irrigation_config_id) {
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
  }
}

// Modelo para configuración programada
class ProgrammedConfig {
  constructor(data = {}) {
    this.id = data.id;
    this.irrigation_config_id = data.irrigation_config_id;
    this.start_date = data.start_date;
    this.start_time = data.start_time;
    this.end_date = data.end_date;
    this.duration_minutes = data.duration_minutes;
    this.duration_seconds = data.duration_seconds || 0;
    this.frequency_type = data.frequency_type; // 'once', 'daily', 'custom'
    this.custom_days = data.custom_days; // Array de días
    this.notify_before_start = data.notify_before_start || true;
    this.notify_before_minutes = data.notify_before_minutes || 5;
    this.notify_at_start = data.notify_at_start || true;
    this.notify_at_end = data.notify_at_end || true;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.last_execution = data.last_execution;
    this.next_execution = data.next_execution;
  }

  static async create(configData) {
    try {
      const {
        irrigation_config_id, start_date, start_time, end_date, duration_minutes,
        duration_seconds = 0, frequency_type, custom_days,
        notify_before_start = true, notify_before_minutes = 5,
        notify_at_start = true, notify_at_end = true
      } = configData;

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
      return new ProgrammedConfig(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al crear configuración programada: ${error.message}`);
    }
  }

  static async findByIrrigationConfigId(irrigation_config_id) {
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
  }

  // Actualizar próxima ejecución
  async updateNextExecution(nextExecution) {
    try {
      const query = 'UPDATE programmed_configs SET next_execution = $1 WHERE id = $2 RETURNING *';
      const result = await pool.query(query, [nextExecution, this.id]);
      
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al actualizar próxima ejecución: ${error.message}`);
    }
  }
}

export { IrrigationConfig, ManualConfig, AutomaticConfig, ProgrammedConfig }; 