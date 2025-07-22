import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';

class User {
  constructor(data = {}) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.role = data.role || 'visitante';
    this.created_at = data.created_at;
  }

  // Crear un nuevo usuario
  static async create({ email, password, name, role = 'visitante' }) {
    try {
      // Hash de la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const query = `
        INSERT INTO users (email, password, name, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, name, role, created_at
      `;
      
      const result = await pool.query(query, [email, hashedPassword, name, role]);
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  // Buscar usuario por email
  static async findByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al buscar usuario: ${error.message}`);
    }
  }

  // Buscar usuario por ID
  static async findById(id) {
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al buscar usuario: ${error.message}`);
    }
  }

  // Obtener todos los usuarios
  static async findAll() {
    try {
      const query = 'SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC';
      const result = await pool.query(query);
      
      return result.rows.map(row => new User(row));
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }

  // Actualizar usuario
  async update(updateData) {
    try {
      const fields = [];
      const values = [];
      let counter = 1;

      // Construir la consulta dinámicamente
      for (const [key, value] of Object.entries(updateData)) {
        if (key !== 'id' && key !== 'created_at') {
          // Hash password si se está actualizando
          if (key === 'password') {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(value, salt);
            fields.push(`${key} = $${counter}`);
            values.push(hashedPassword);
          } else {
            fields.push(`${key} = $${counter}`);
            values.push(value);
          }
          counter++;
        }
      }

      if (fields.length === 0) {
        throw new Error('No hay campos para actualizar');
      }

      values.push(this.id);
      
      const query = `
        UPDATE users 
        SET ${fields.join(', ')}
        WHERE id = $${counter}
        RETURNING id, email, name, role, created_at
      `;
      
      const result = await pool.query(query, values);
      
      if (result.rows.length === 0) {
        throw new Error('Usuario no encontrado');
      }
      
      // Actualizar la instancia actual
      Object.assign(this, result.rows[0]);
      return this;
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  // Eliminar usuario
  async delete() {
    try {
      const query = 'DELETE FROM users WHERE id = $1';
      const result = await pool.query(query, [this.id]);
      
      if (result.rowCount === 0) {
        throw new Error('Usuario no encontrado');
      }
      
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }

  // Verificar contraseña
  async checkPassword(password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error(`Error al verificar contraseña: ${error.message}`);
    }
  }

  // Obtener datos del usuario sin contraseña
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

export default User; 