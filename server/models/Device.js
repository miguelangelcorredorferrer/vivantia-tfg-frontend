import { pool } from '../config/db.js';

class Device {
  constructor(data = {}) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.device_name = data.device_name;
    this.enddevice_id = data.enddevice_id;
    this.app_eui = data.app_eui;
    this.dev_eui = data.dev_eui;
    this.app_key = data.app_key;
    this.is_active_communication = data.is_active_communication || false;
    this.created_at = data.created_at;
  }

  // Crear un nuevo dispositivo
  static async create(deviceData) {
    try {
      const {
        user_id, device_name, enddevice_id, app_eui, dev_eui, app_key, is_active_communication = false
      } = deviceData;

      const query = `
        INSERT INTO devices (
          user_id, device_name, enddevice_id, app_eui, dev_eui, app_key, is_active_communication
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      
      const values = [user_id, device_name, enddevice_id, app_eui, dev_eui, app_key, is_active_communication];
      
      const result = await pool.query(query, values);
      return new Device(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al crear dispositivo: ${error.message}`);
    }
  }

  // Buscar dispositivo por ID
  static async findById(id) {
    try {
      const query = 'SELECT * FROM devices WHERE id = $1';
      const result = await pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return new Device(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al buscar dispositivo: ${error.message}`);
    }
  }

  // Buscar dispositivos por usuario
  static async findByUserId(user_id) {
    try {
      const query = 'SELECT * FROM devices WHERE user_id = $1 ORDER BY created_at DESC';
      const result = await pool.query(query, [user_id]);
      
      return result.rows.map(row => new Device(row));
    } catch (error) {
      throw new Error(`Error al buscar dispositivos del usuario: ${error.message}`);
    }
  }

  // Buscar dispositivo por enddevice_id
  static async findByEndDeviceId(enddevice_id) {
    try {
      const query = 'SELECT * FROM devices WHERE enddevice_id = $1';
      const result = await pool.query(query, [enddevice_id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return new Device(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al buscar dispositivo por enddevice_id: ${error.message}`);
    }
  }

  // Obtener todos los dispositivos
  static async findAll() {
    try {
      const query = 'SELECT * FROM devices ORDER BY created_at DESC';
      const result = await pool.query(query);
      
      return result.rows.map(row => new Device(row));
    } catch (error) {
      throw new Error(`Error al obtener dispositivos: ${error.message}`);
    }
  }

  // Obtener dispositivos activos
  static async findActive() {
    try {
      const query = 'SELECT * FROM devices WHERE is_active_communication = true ORDER BY created_at DESC';
      const result = await pool.query(query);
      
      return result.rows.map(row => new Device(row));
    } catch (error) {
      throw new Error(`Error al obtener dispositivos activos: ${error.message}`);
    }
  }

  // Actualizar dispositivo
  async update(updateData) {
    try {
      const fields = [];
      const values = [];
      let counter = 1;

      // Construir la consulta dinámicamente
      for (const [key, value] of Object.entries(updateData)) {
        if (key !== 'id' && key !== 'user_id' && key !== 'created_at') {
          fields.push(`${key} = $${counter}`);
          values.push(value);
          counter++;
        }
      }

      if (fields.length === 0) {
        throw new Error('No hay campos para actualizar');
      }

      values.push(this.id);
      
      const query = `
        UPDATE devices 
        SET ${fields.join(', ')}
        WHERE id = $${counter}
        RETURNING *
      `;
      
      const result = await pool.query(query, values);
      
      if (result.rows.length === 0) {
        throw new Error('Dispositivo no encontrado');
      }
      
      // Actualizar la instancia actual
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al actualizar dispositivo: ${error.message}`);
    }
  }

  // Activar comunicación del dispositivo
  async activate() {
    try {
      const query = 'UPDATE devices SET is_active_communication = true WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [this.id]);
      
      if (result.rows.length === 0) {
        throw new Error('Dispositivo no encontrado');
      }
      
      // Actualizar la instancia actual
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al activar dispositivo: ${error.message}`);
    }
  }

  // Desactivar comunicación del dispositivo
  async deactivate() {
    try {
      const query = 'UPDATE devices SET is_active_communication = false WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [this.id]);
      
      if (result.rows.length === 0) {
        throw new Error('Dispositivo no encontrado');
      }
      
      // Actualizar la instancia actual
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al desactivar dispositivo: ${error.message}`);
    }
  }

  // Eliminar dispositivo
  async delete() {
    try {
      const query = 'DELETE FROM devices WHERE id = $1';
      const result = await pool.query(query, [this.id]);
      
      if (result.rowCount === 0) {
        throw new Error('Dispositivo no encontrado');
      }
      
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar dispositivo: ${error.message}`);
    }
  }

  // Obtener lecturas de sensores del dispositivo
  async getSensorReadings(limit = 100) {
    try {
      const query = `
        SELECT * FROM sensor_readings 
        WHERE device_id = $1 
        ORDER BY received_at DESC 
        LIMIT $2
      `;
      const result = await pool.query(query, [this.id, limit]);
      
      return result.rows;
    } catch (error) {
      throw new Error(`Error al obtener lecturas de sensores: ${error.message}`);
    }
  }

  // Obtener última lectura del dispositivo
  async getLatestReading() {
    try {
      const query = `
        SELECT * FROM sensor_readings 
        WHERE device_id = $1 
        ORDER BY received_at DESC 
        LIMIT 1
      `;
      const result = await pool.query(query, [this.id]);
      
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      throw new Error(`Error al obtener última lectura: ${error.message}`);
    }
  }
}

export default Device; 