import { pool } from '../config/db.js';

class Alert {
  constructor(data = {}) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.alert_type = data.alert_type; // 'user', 'environmental', 'device', 'crop', 'irrigation'
    this.alert_subtype = data.alert_subtype;
    this.severity = data.severity || 'info'; // 'info', 'success', 'warning', 'error'
    this.title = data.title;
    this.message = data.message;
    this.is_resolved = data.is_resolved || false;
    this.created_at = data.created_at;
  }

  // Crear nueva alerta
  static async create(alertData) {
    try {
      const {
        user_id, alert_type, alert_subtype, severity = 'info',
        title, message, is_resolved = false
      } = alertData;

      const query = `
        INSERT INTO alerts (user_id, alert_type, alert_subtype, severity, title, message, is_resolved)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      
      const values = [user_id, alert_type, alert_subtype, severity, title, message, is_resolved];
      const result = await pool.query(query, values);
      return new Alert(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al crear alerta: ${error.message}`);
    }
  }

  // Buscar alerta por ID
  static async findById(id) {
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
  }

  // Buscar alertas por usuario
  static async findByUserId(user_id, limit = 50, offset = 0) {
    try {
      const query = `
        SELECT * FROM alerts 
        WHERE user_id = $1 
        ORDER BY created_at DESC 
        LIMIT $2 OFFSET $3
      `;
      const result = await pool.query(query, [user_id, limit, offset]);
      
      return result.rows.map(row => new Alert(row));
    } catch (error) {
      throw new Error(`Error al buscar alertas del usuario: ${error.message}`);
    }
  }

  // Buscar alertas no resueltas por usuario
  static async findUnresolvedByUserId(user_id) {
    try {
      const query = `
        SELECT * FROM alerts 
        WHERE user_id = $1 AND is_resolved = false 
        ORDER BY created_at DESC
      `;
      const result = await pool.query(query, [user_id]);
      
      return result.rows.map(row => new Alert(row));
    } catch (error) {
      throw new Error(`Error al buscar alertas no resueltas: ${error.message}`);
    }
  }

  // Buscar alertas por tipo
  static async findByType(user_id, alert_type, limit = 50) {
    try {
      const query = `
        SELECT * FROM alerts 
        WHERE user_id = $1 AND alert_type = $2 
        ORDER BY created_at DESC 
        LIMIT $3
      `;
      const result = await pool.query(query, [user_id, alert_type, limit]);
      
      return result.rows.map(row => new Alert(row));
    } catch (error) {
      throw new Error(`Error al buscar alertas por tipo: ${error.message}`);
    }
  }

  // Buscar alertas por severidad
  static async findBySeverity(user_id, severity, limit = 50) {
    try {
      const query = `
        SELECT * FROM alerts 
        WHERE user_id = $1 AND severity = $2 
        ORDER BY created_at DESC 
        LIMIT $3
      `;
      const result = await pool.query(query, [user_id, severity, limit]);
      
      return result.rows.map(row => new Alert(row));
    } catch (error) {
      throw new Error(`Error al buscar alertas por severidad: ${error.message}`);
    }
  }

  // Marcar alerta como resuelta
  async resolve() {
    try {
      const query = 'UPDATE alerts SET is_resolved = true WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [this.id]);
      
      if (result.rows.length === 0) {
        throw new Error('Alerta no encontrada');
      }
      
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al resolver alerta: ${error.message}`);
    }
  }

  // Marcar alerta como no resuelta
  async unresolve() {
    try {
      const query = 'UPDATE alerts SET is_resolved = false WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [this.id]);
      
      if (result.rows.length === 0) {
        throw new Error('Alerta no encontrada');
      }
      
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al marcar alerta como no resuelta: ${error.message}`);
    }
  }

  // Marcar todas las alertas de un usuario como resueltas
  static async resolveAllByUserId(user_id) {
    try {
      const query = 'UPDATE alerts SET is_resolved = true WHERE user_id = $1 AND is_resolved = false';
      const result = await pool.query(query, [user_id]);
      
      return result.rowCount;
    } catch (error) {
      throw new Error(`Error al resolver todas las alertas: ${error.message}`);
    }
  }

  // Eliminar alerta
  async delete() {
    try {
      const query = 'DELETE FROM alerts WHERE id = $1';
      const result = await pool.query(query, [this.id]);
      
      if (result.rowCount === 0) {
        throw new Error('Alerta no encontrada');
      }
      
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar alerta: ${error.message}`);
    }
  }

  // Eliminar alertas antiguas
  static async deleteOlderThan(days = 30) {
    try {
      const query = `
        DELETE FROM alerts 
        WHERE created_at < NOW() - INTERVAL '${days} days'
        AND is_resolved = true
      `;
      const result = await pool.query(query);
      
      return result.rowCount;
    } catch (error) {
      throw new Error(`Error al eliminar alertas antiguas: ${error.message}`);
    }
  }

  // Obtener conteo de alertas por tipo
  static async getCountByType(user_id) {
    try {
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
      
      return result.rows;
    } catch (error) {
      throw new Error(`Error al obtener conteo por tipo: ${error.message}`);
    }
  }

  // Obtener conteo de alertas por severidad
  static async getCountBySeverity(user_id) {
    try {
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
      
      return result.rows;
    } catch (error) {
      throw new Error(`Error al obtener conteo por severidad: ${error.message}`);
    }
  }

  // Métodos de conveniencia para crear alertas específicas

  // Alerta de usuario registrado
  static async createUserRegistered(user_id, userName) {
    return await Alert.create({
      user_id,
      alert_type: 'user',
      alert_subtype: 'user_registered',
      severity: 'success',
      title: 'Usuario registrado',
      message: `Bienvenido ${userName}! Tu cuenta ha sido creada exitosamente.`
    });
  }

  // Alerta de dispositivo offline
  static async createDeviceOffline(user_id, deviceName) {
    return await Alert.create({
      user_id,
      alert_type: 'device',
      alert_subtype: 'device_offline',
      severity: 'warning',
      title: 'Dispositivo desconectado',
      message: `El dispositivo "${deviceName}" se ha desconectado.`
    });
  }

  // Alerta de umbral de humedad
  static async createHumidityThreshold(user_id, currentHumidity, threshold, isMin = true) {
    const condition = isMin ? 'por debajo' : 'por encima';
    const subtype = isMin ? 'humidity_min_threshold' : 'humidity_max_threshold';
    
    return await Alert.create({
      user_id,
      alert_type: 'environmental',
      alert_subtype: subtype,
      severity: 'warning',
      title: 'Umbral de humedad superado',
      message: `La humedad está ${condition} del umbral (${currentHumidity}% vs ${threshold}%).`
    });
  }

  // Alerta de riego iniciado
  static async createIrrigationStarted(user_id, duration, mode) {
    return await Alert.create({
      user_id,
      alert_type: 'irrigation',
      alert_subtype: 'manual_started',
      severity: 'info',
      title: 'Riego iniciado',
      message: `Riego ${mode} iniciado por ${duration} minutos.`
    });
  }
}

export default Alert; 