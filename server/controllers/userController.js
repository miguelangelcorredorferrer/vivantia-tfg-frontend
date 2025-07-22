import { pool } from '../config/db.js';
import User from '../models/User.js';
import { handleNotFoundError, handleBadRequestError, handleInternalServerError, handleSuccessResponse } from '../utils/index.js';

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { email, password, name, role = 'visitante' } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return handleBadRequestError('El usuario ya existe con ese email', res);
    }

    const query = `
      INSERT INTO users (email, password, name, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, name, role, created_at
    `;
    
    const result = await pool.query(query, [email, password, name, role]);
    const user = new User(result.rows[0]);

    return handleSuccessResponse(res, user.toJSON(), 'Usuario creado exitosamente', 201);
  } catch (error) {
    return handleInternalServerError('Error al crear usuario', res, error);
  }
};

// Buscar usuario por email
const findUserByEmail = async (email) => {
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
};

// Buscar usuario por ID
const findUserById = async (id) => {
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
};

// Obtener usuario por ID (para API)
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);

    if (!user) {
      return handleNotFoundError('Usuario no encontrado', res);
    }

    return handleSuccessResponse(res, user.toJSON(), 'Usuario obtenido exitosamente');
  } catch (error) {
    return handleInternalServerError('Error al obtener usuario', res, error);
  }
};

// Obtener usuario por email (para API)
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await findUserByEmail(email);

    if (!user) {
      return handleNotFoundError('Usuario no encontrado', res);
    }

    return handleSuccessResponse(res, user.toJSON(), 'Usuario obtenido exitosamente');
  } catch (error) {
    return handleInternalServerError('Error al obtener usuario', res, error);
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const query = 'SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC';
    const result = await pool.query(query);
    
    const users = result.rows.map(row => new User(row));

    return handleSuccessResponse(res, users.map(user => user.toJSON()), `${users.length} usuarios obtenidos exitosamente`);
  } catch (error) {
    return handleInternalServerError('Error al obtener usuarios', res, error);
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Verificar si el usuario existe
    const existingUser = await findUserById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const fields = [];
    const values = [];
    let counter = 1;

    // Construir la consulta dinámicamente
    for (const [key, value] of Object.entries(updateData)) {
      if (key !== 'id' && key !== 'created_at') {
        fields.push(`${key} = $${counter}`);
        values.push(value);
        counter++;
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No hay campos para actualizar'
      });
    }

    values.push(id);
    
    const query = `
      UPDATE users 
      SET ${fields.join(', ')}
      WHERE id = $${counter}
      RETURNING id, email, name, role, created_at
    `;
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    const updatedUser = new User(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: updatedUser.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar usuario',
      error: error.message
    });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el usuario existe
    const existingUser = await findUserById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const query = 'DELETE FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar usuario',
      error: error.message
    });
  }
};



// Obtener perfil del usuario actual
const getCurrentUserProfile = async (req, res) => {
  try {
    // Asumiendo que el ID del usuario viene del middleware de autenticación
    const userId = req.user?.id || req.params.id;
    
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil',
      error: error.message
    });
  }
};

export {
  createUser,
  findUserByEmail,
  findUserById,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  getCurrentUserProfile
};
