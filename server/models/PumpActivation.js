import { pool } from '../config/db.js';

class PumpActivation {
  constructor(data = {}) {
    this.id = data.id;
    this.irrigation_config_id = data.irrigation_config_id;
    this.started_at = data.started_at;
    this.ended_at = data.ended_at;
    this.duration_minutes = data.duration_minutes;
    this.status = data.status || 'active'; // 'active', 'completed', 'cancelled', 'paused', 'restart', 'error'
    this.created_at = data.created_at;
  }

  // Crear nueva activación de bomba
  static async create(activationData) {
    try {
      const { irrigation_config_id, duration_minutes, status = 'active' } = activationData;

      const query = `
        INSERT INTO pump_activations (irrigation_config_id, started_at, duration_minutes, status)
        VALUES ($1, NOW(), $2, $3)
        RETURNING *
      `;
      
      const values = [irrigation_config_id, duration_minutes, status];
      const result = await pool.query(query, values);
      return new PumpActivation(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al crear activación de bomba: ${error.message}`);
    }
  }

  // Buscar por ID
  static async findById(id) {
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
  }

  // Buscar activaciones por configuración de riego
  static async findByIrrigationConfigId(irrigation_config_id, limit = 50) {
    try {
      const query = `
        SELECT * FROM pump_activations 
        WHERE irrigation_config_id = $1 
        ORDER BY started_at DESC 
        LIMIT $2
      `;
      const result = await pool.query(query, [irrigation_config_id, limit]);
      
      return result.rows.map(row => new PumpActivation(row));
    } catch (error) {
      throw new Error(`Error al buscar activaciones: ${error.message}`);
    }
  }

  // Buscar activaciones activas
  static async findActive() {
    try {
      const query = 'SELECT * FROM pump_activations WHERE status = $1 ORDER BY started_at DESC';
      const result = await pool.query(query, ['active']);
      
      return result.rows.map(row => new PumpActivation(row));
    } catch (error) {
      throw new Error(`Error al buscar activaciones activas: ${error.message}`);
    }
  }

  // Buscar activaciones por usuario (a través de irrigation_config)
  static async findByUserId(user_id, limit = 50) {
    try {
      const query = `
        SELECT pa.* FROM pump_activations pa
        JOIN irrigation_configs ic ON pa.irrigation_config_id = ic.id
        WHERE ic.user_id = $1
        ORDER BY pa.started_at DESC
        LIMIT $2
      `;
      const result = await pool.query(query, [user_id, limit]);
      
      return result.rows.map(row => new PumpActivation(row));
    } catch (error) {
      throw new Error(`Error al buscar activaciones del usuario: ${error.message}`);
    }
  }

  // Completar activación
  async complete() {
    try {
      const query = `
        UPDATE pump_activations 
        SET status = 'completed', ended_at = NOW() 
        WHERE id = $1 
        RETURNING *
      `;
      const result = await pool.query(query, [this.id]);
      
      if (result.rows.length === 0) {
        throw new Error('Activación no encontrada');
      }
      
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al completar activación: ${error.message}`);
    }
  }

  // Cancelar activación
  async cancel() {
    try {
      const query = `
        UPDATE pump_activations 
        SET status = 'cancelled', ended_at = NOW() 
        WHERE id = $1 
        RETURNING *
      `;
      const result = await pool.query(query, [this.id]);
      
      if (result.rows.length === 0) {
        throw new Error('Activación no encontrada');
      }
      
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al cancelar activación: ${error.message}`);
    }
  }

  // Pausar activación
  async pause() {
    try {
      const query = `
        UPDATE pump_activations 
        SET status = 'paused' 
        WHERE id = $1 
        RETURNING *
      `;
      const result = await pool.query(query, [this.id]);
      
      if (result.rows.length === 0) {
        throw new Error('Activación no encontrada');
      }
      
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al pausar activación: ${error.message}`);
    }
  }

  // Reanudar activación
  async restart() {
    try {
      const query = `
        UPDATE pump_activations 
        SET status = 'restart' 
        WHERE id = $1 
        RETURNING *
      `;
      const result = await pool.query(query, [this.id]);
      
      if (result.rows.length === 0) {
        throw new Error('Activación no encontrada');
      }
      
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al reanudar activación: ${error.message}`);
    }
  }

  // Marcar como error
  async markAsError() {
    try {
      const query = `
        UPDATE pump_activations 
        SET status = 'error', ended_at = NOW() 
        WHERE id = $1 
        RETURNING *
      `;
      const result = await pool.query(query, [this.id]);
      
      if (result.rows.length === 0) {
        throw new Error('Activación no encontrada');
      }
      
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al marcar activación como error: ${error.message}`);
    }
  }

  // Obtener duración actual (para activaciones en curso)
  getCurrentDuration() {
    if (!this.started_at) return 0;
    
    const endTime = this.ended_at ? new Date(this.ended_at) : new Date();
    const startTime = new Date(this.started_at);
    
    return Math.floor((endTime - startTime) / (1000 * 60)); // en minutos
  }

  // Verificar si está activa
  isActive() {
    return this.status === 'active' || this.status === 'restart';
  }

  // Obtener estadísticas de activaciones por período
  static async getStatsByPeriod(irrigation_config_id, days = 30) {
    try {
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
        AND started_at >= NOW() - INTERVAL '${days} days'
      `;
      const result = await pool.query(query, [irrigation_config_id]);
      
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }
  }
}

export default PumpActivation; 