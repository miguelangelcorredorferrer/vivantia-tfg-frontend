import { pool } from '../config/db.js';

class Crop {
  constructor(data = {}) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.category = data.category;
    this.growth_days = data.growth_days;
    this.humidity_min = data.humidity_min;
    this.humidity_max = data.humidity_max;
    this.temperature_max = data.temperature_max;
    this.created_at = data.created_at;
    this.selected = data.selected || false;
  }

  // Crear un nuevo cultivo
  static async create(cropData) {
    try {
      const {
        user_id, name, description, image, category, growth_days,
        humidity_min, humidity_max, temperature_max, selected = false
      } = cropData;

      const query = `
        INSERT INTO crops (
          user_id, name, description, image, category, growth_days,
          humidity_min, humidity_max, temperature_max, selected
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `;
      
      const values = [
        user_id, name, description, image, category, growth_days,
        humidity_min, humidity_max, temperature_max, selected
      ];
      
      const result = await pool.query(query, values);
      return new Crop(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al crear cultivo: ${error.message}`);
    }
  }

  // Buscar cultivo por ID
  static async findById(id) {
    try {
      const query = 'SELECT * FROM crops WHERE id = $1';
      const result = await pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return new Crop(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al buscar cultivo: ${error.message}`);
    }
  }

  // Buscar cultivo por usuario
  static async findByUserId(user_id) {
    try {
      const query = 'SELECT * FROM crops WHERE user_id = $1';
      const result = await pool.query(query, [user_id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return new Crop(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al buscar cultivo del usuario: ${error.message}`);
    }
  }

  // Obtener todos los cultivos
  static async findAll() {
    try {
      const query = 'SELECT * FROM crops ORDER BY created_at DESC';
      const result = await pool.query(query);
      
      return result.rows.map(row => new Crop(row));
    } catch (error) {
      throw new Error(`Error al obtener cultivos: ${error.message}`);
    }
  }

  // Buscar cultivo seleccionado por usuario
  static async findSelectedByUserId(user_id) {
    try {
      const query = 'SELECT * FROM crops WHERE user_id = $1 AND selected = true';
      const result = await pool.query(query, [user_id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return new Crop(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al buscar cultivo seleccionado: ${error.message}`);
    }
  }

  // Actualizar cultivo
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
        UPDATE crops 
        SET ${fields.join(', ')}
        WHERE id = $${counter}
        RETURNING *
      `;
      
      const result = await pool.query(query, values);
      
      if (result.rows.length === 0) {
        throw new Error('Cultivo no encontrado');
      }
      
      // Actualizar la instancia actual
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al actualizar cultivo: ${error.message}`);
    }
  }

  // Seleccionar cultivo (deseleccionar otros del mismo usuario)
  async select() {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Deseleccionar todos los cultivos del usuario
      await client.query(
        'UPDATE crops SET selected = false WHERE user_id = $1',
        [this.user_id]
      );

      // Seleccionar este cultivo
      const result = await client.query(
        'UPDATE crops SET selected = true WHERE id = $1 RETURNING *',
        [this.id]
      );

      await client.query('COMMIT');
      
      // Actualizar la instancia actual
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(`Error al seleccionar cultivo: ${error.message}`);
    } finally {
      client.release();
    }
  }

  // Deseleccionar cultivo
  async deselect() {
    try {
      const query = 'UPDATE crops SET selected = false WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [this.id]);
      
      if (result.rows.length === 0) {
        throw new Error('Cultivo no encontrado');
      }
      
      // Actualizar la instancia actual
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al deseleccionar cultivo: ${error.message}`);
    }
  }

  // Eliminar cultivo
  async delete() {
    try {
      const query = 'DELETE FROM crops WHERE id = $1';
      const result = await pool.query(query, [this.id]);
      
      if (result.rowCount === 0) {
        throw new Error('Cultivo no encontrado');
      }
      
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar cultivo: ${error.message}`);
    }
  }

  // Obtener configuraciones de riego asociadas
  async getIrrigationConfigs() {
    try {
      const query = 'SELECT * FROM irrigation_configs WHERE crop_id = $1';
      const result = await pool.query(query, [this.id]);
      
      return result.rows;
    } catch (error) {
      throw new Error(`Error al obtener configuraciones de riego: ${error.message}`);
    }
  }
}

export default Crop; 