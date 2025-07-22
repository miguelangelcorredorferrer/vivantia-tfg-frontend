import { pool } from '../config/db.js';

class SensorReading {
  constructor(data = {}) {
    this.id = data.id;
    this.device_id = data.device_id;
    this.humidity = data.humidity;
    this.temperature = data.temperature;
    this.received_at = data.received_at;
  }

  // Crear una nueva lectura de sensor
  static async create(readingData) {
    try {
      const { device_id, humidity, temperature } = readingData;

      const query = `
        INSERT INTO sensor_readings (device_id, humidity, temperature)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      
      const values = [device_id, humidity, temperature];
      
      const result = await pool.query(query, values);
      return new SensorReading(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al crear lectura de sensor: ${error.message}`);
    }
  }

  // Buscar lectura por ID
  static async findById(id) {
    try {
      const query = 'SELECT * FROM sensor_readings WHERE id = $1';
      const result = await pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return new SensorReading(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al buscar lectura: ${error.message}`);
    }
  }

  // Buscar lecturas por dispositivo
  static async findByDeviceId(device_id, limit = 100, offset = 0) {
    try {
      const query = `
        SELECT * FROM sensor_readings 
        WHERE device_id = $1 
        ORDER BY received_at DESC 
        LIMIT $2 OFFSET $3
      `;
      const result = await pool.query(query, [device_id, limit, offset]);
      
      return result.rows.map(row => new SensorReading(row));
    } catch (error) {
      throw new Error(`Error al buscar lecturas del dispositivo: ${error.message}`);
    }
  }

  // Obtener lecturas por rango de fechas
  static async findByDateRange(device_id, startDate, endDate) {
    try {
      const query = `
        SELECT * FROM sensor_readings 
        WHERE device_id = $1 
        AND received_at BETWEEN $2 AND $3
        ORDER BY received_at DESC
      `;
      const result = await pool.query(query, [device_id, startDate, endDate]);
      
      return result.rows.map(row => new SensorReading(row));
    } catch (error) {
      throw new Error(`Error al buscar lecturas por rango de fechas: ${error.message}`);
    }
  }

  // Obtener última lectura de un dispositivo
  static async findLatestByDeviceId(device_id) {
    try {
      const query = `
        SELECT * FROM sensor_readings 
        WHERE device_id = $1 
        ORDER BY received_at DESC 
        LIMIT 1
      `;
      const result = await pool.query(query, [device_id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return new SensorReading(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al buscar última lectura: ${error.message}`);
    }
  }

  // Obtener promedio de lecturas en un período
  static async getAverageByPeriod(device_id, hours = 24) {
    try {
      const query = `
        SELECT 
          AVG(humidity) as avg_humidity,
          AVG(temperature) as avg_temperature,
          COUNT(*) as reading_count
        FROM sensor_readings 
        WHERE device_id = $1 
        AND received_at >= NOW() - INTERVAL '${hours} hours'
      `;
      const result = await pool.query(query, [device_id]);
      
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error al calcular promedios: ${error.message}`);
    }
  }

  // Obtener lecturas agrupadas por horas
  static async getHourlyAverages(device_id, days = 7) {
    try {
      const query = `
        SELECT 
          DATE_TRUNC('hour', received_at) as hour,
          AVG(humidity) as avg_humidity,
          AVG(temperature) as avg_temperature,
          COUNT(*) as reading_count
        FROM sensor_readings 
        WHERE device_id = $1 
        AND received_at >= NOW() - INTERVAL '${days} days'
        GROUP BY DATE_TRUNC('hour', received_at)
        ORDER BY hour DESC
      `;
      const result = await pool.query(query, [device_id]);
      
      return result.rows;
    } catch (error) {
      throw new Error(`Error al obtener promedios por hora: ${error.message}`);
    }
  }

  // Obtener lecturas que excedan umbrales
  static async findOutOfThreshold(device_id, minHumidity, maxHumidity, maxTemperature, hours = 24) {
    try {
      const query = `
        SELECT * FROM sensor_readings 
        WHERE device_id = $1 
        AND received_at >= NOW() - INTERVAL '${hours} hours'
        AND (
          humidity < $2 OR 
          humidity > $3 OR 
          temperature > $4
        )
        ORDER BY received_at DESC
      `;
      const result = await pool.query(query, [device_id, minHumidity, maxHumidity, maxTemperature]);
      
      return result.rows.map(row => new SensorReading(row));
    } catch (error) {
      throw new Error(`Error al buscar lecturas fuera de umbral: ${error.message}`);
    }
  }

  // Eliminar lecturas antiguas (mantenimiento)
  static async deleteOlderThan(days = 90) {
    try {
      const query = `
        DELETE FROM sensor_readings 
        WHERE received_at < NOW() - INTERVAL '${days} days'
      `;
      const result = await pool.query(query);
      
      return result.rowCount;
    } catch (error) {
      throw new Error(`Error al eliminar lecturas antiguas: ${error.message}`);
    }
  }

  // Obtener estadísticas generales de un dispositivo
  static async getDeviceStats(device_id, days = 30) {
    try {
      const query = `
        SELECT 
          COUNT(*) as total_readings,
          AVG(humidity) as avg_humidity,
          MIN(humidity) as min_humidity,
          MAX(humidity) as max_humidity,
          AVG(temperature) as avg_temperature,
          MIN(temperature) as min_temperature,
          MAX(temperature) as max_temperature,
          MIN(received_at) as first_reading,
          MAX(received_at) as last_reading
        FROM sensor_readings 
        WHERE device_id = $1 
        AND received_at >= NOW() - INTERVAL '${days} days'
      `;
      const result = await pool.query(query, [device_id]);
      
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error al obtener estadísticas del dispositivo: ${error.message}`);
    }
  }

  // Actualizar una lectura (normalmente no se hace, pero por si acaso)
  async update(updateData) {
    try {
      const fields = [];
      const values = [];
      let counter = 1;

      for (const [key, value] of Object.entries(updateData)) {
        if (key !== 'id' && key !== 'device_id' && key !== 'received_at') {
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
        UPDATE sensor_readings 
        SET ${fields.join(', ')}
        WHERE id = $${counter}
        RETURNING *
      `;
      
      const result = await pool.query(query, values);
      
      if (result.rows.length === 0) {
        throw new Error('Lectura no encontrada');
      }
      
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al actualizar lectura: ${error.message}`);
    }
  }

  // Eliminar una lectura específica
  async delete() {
    try {
      const query = 'DELETE FROM sensor_readings WHERE id = $1';
      const result = await pool.query(query, [this.id]);
      
      if (result.rowCount === 0) {
        throw new Error('Lectura no encontrada');
      }
      
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar lectura: ${error.message}`);
    }
  }
}

export default SensorReading; 