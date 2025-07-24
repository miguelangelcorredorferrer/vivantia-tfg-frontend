import { pool } from '../config/db.js';
import Crop from '../models/Crop.js';
import { handleNotFoundError, handleBadRequestError, handleInternalServerError, handleSuccessResponse } from '../utils/index.js';

// Crear un nuevo cultivo
const createCrop = async (req, res) => {
  try {
    const {
      name, description, image, category, growth_days,
      humidity_min, humidity_max, temperature_max, session, selected = false
    } = req.body;

    // Obtener user_id del usuario autenticado
    const user_id = req.user.id;

    // Validar campos obligatorios
    if (!name) {
      return handleBadRequestError('Nombre del cultivo es obligatorio', res);
    }

    const query = `
      INSERT INTO crops (
        user_id, name, description, image, category, growth_days,
        humidity_min, humidity_max, temperature_max, session, selected
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
    
    const cleanValues = [
      user_id, 
      name, 
      description || null, 
      image || null, 
      category || null, 
      growth_days || null,
      humidity_min || null, 
      humidity_max || null, 
      temperature_max || null, 
      session || null, 
      selected
    ];
    
    const result = await pool.query(query, cleanValues);
    const crop = new Crop(result.rows[0]);

    return handleSuccessResponse(res, crop, 'Cultivo creado exitosamente', 201);
  } catch (error) {
    return handleInternalServerError('Error al crear cultivo', res, error);
  }
};

// Buscar cultivo por ID
const findCropById = async (id) => {
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
};

// Obtener cultivo por ID (para API)
const getCropById = async (req, res) => {
  try {
    const { id } = req.params;
    const crop = await findCropById(id);

    if (!crop) {
      return handleNotFoundError('Cultivo no encontrado', res);
    }

    return handleSuccessResponse(res, crop, 'Cultivo obtenido exitosamente');
  } catch (error) {
    return handleInternalServerError('Error al obtener cultivo', res, error);
  }
};

// Buscar cultivo por usuario
const findCropByUserId = async (user_id) => {
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
};

// Obtener cultivo por usuario (para API)
const getCropByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const authenticatedUser = req.user;

    // Verificar que el usuario autenticado está accediendo a su propio cultivo
    if (authenticatedUser.id !== parseInt(user_id)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para acceder a este cultivo'
      });
    }

    const crop = await findCropByUserId(user_id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró cultivo para este usuario'
      });
    }

    res.status(200).json({
      success: true,
      data: crop
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener cultivo del usuario',
      error: error.message
    });
  }
};

// Obtener todos los cultivos de un usuario específico
const getAllCropsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const authenticatedUser = req.user;

    // Verificar que el usuario autenticado está accediendo a sus propios cultivos
    if (authenticatedUser.id !== parseInt(user_id)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para acceder a estos cultivos'
      });
    }

    const query = 'SELECT * FROM crops WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [user_id]);
    
    const crops = result.rows.map(row => new Crop(row));

    res.status(200).json({
      success: true,
      count: crops.length,
      data: crops
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener cultivos del usuario',
      error: error.message
    });
  }
};

// Obtener todos los cultivos
const getAllCrops = async (req, res) => {
  try {
    const query = 'SELECT * FROM crops ORDER BY created_at DESC';
    const result = await pool.query(query);
    
    const crops = result.rows.map(row => new Crop(row));

    res.status(200).json({
      success: true,
      count: crops.length,
      data: crops
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener cultivos',
      error: error.message
    });
  }
};

// Buscar cultivo seleccionado por usuario
const getSelectedCropByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const authenticatedUser = req.user;

    // Verificar que el usuario autenticado está accediendo a su propio cultivo
    if (authenticatedUser.id !== parseInt(user_id)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para acceder a este cultivo'
      });
    }

    const query = 'SELECT * FROM crops WHERE user_id = $1 AND selected = true';
    const result = await pool.query(query, [user_id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No hay cultivo seleccionado para este usuario'
      });
    }
    
    const crop = new Crop(result.rows[0]);

    res.status(200).json({
      success: true,
      data: crop
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar cultivo seleccionado',
      error: error.message
    });
  }
};

// Actualizar cultivo
const updateCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const authenticatedUser = req.user;

    // Verificar si el cultivo existe
    const existingCrop = await findCropById(id);
    if (!existingCrop) {
      return res.status(404).json({
        success: false,
        message: 'Cultivo no encontrado'
      });
    }

    // Verificar que el usuario autenticado es el propietario del cultivo
    if (existingCrop.user_id !== authenticatedUser.id) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para actualizar este cultivo'
      });
    }

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
      return res.status(400).json({
        success: false,
        message: 'No hay campos para actualizar'
      });
    }

    values.push(id);
    
    const query = `
      UPDATE crops 
      SET ${fields.join(', ')}
      WHERE id = $${counter}
      RETURNING *
    `;
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cultivo no encontrado'
      });
    }
    
    const updatedCrop = new Crop(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Cultivo actualizado exitosamente',
      data: updatedCrop
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar cultivo',
      error: error.message
    });
  }
};

// Seleccionar cultivo (deseleccionar otros del mismo usuario)
const selectCrop = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    const authenticatedUser = req.user;

    // Verificar si el cultivo existe
    const existingCrop = await findCropById(id);
    if (!existingCrop) {
      return res.status(404).json({
        success: false,
        message: 'Cultivo no encontrado'
      });
    }

    // Verificar que el usuario autenticado es el propietario del cultivo
    if (existingCrop.user_id !== authenticatedUser.id) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para seleccionar este cultivo'
      });
    }

    await client.query('BEGIN');

    // Deseleccionar todos los cultivos del usuario
    await client.query(
      'UPDATE crops SET selected = false WHERE user_id = $1',
      [existingCrop.user_id]
    );

    // Seleccionar este cultivo
    const result = await client.query(
      'UPDATE crops SET selected = true WHERE id = $1 RETURNING *',
      [id]
    );

    await client.query('COMMIT');
    
    const selectedCrop = new Crop(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Cultivo seleccionado exitosamente',
      data: selectedCrop
    });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({
      success: false,
      message: 'Error al seleccionar cultivo',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Deseleccionar cultivo
const deselectCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const authenticatedUser = req.user;

    // Verificar si el cultivo existe y pertenece al usuario
    const existingCrop = await findCropById(id);
    if (!existingCrop) {
      return res.status(404).json({
        success: false,
        message: 'Cultivo no encontrado'
      });
    }

    // Verificar que el usuario autenticado es el propietario del cultivo
    if (existingCrop.user_id !== authenticatedUser.id) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para deseleccionar este cultivo'
      });
    }

    const query = 'UPDATE crops SET selected = false WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cultivo no encontrado'
      });
    }
    
    const deselectedCrop = new Crop(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Cultivo deseleccionado exitosamente',
      data: deselectedCrop
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al deseleccionar cultivo',
      error: error.message
    });
  }
};

// Eliminar cultivo
const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const authenticatedUser = req.user;

    // Verificar si el cultivo existe
    const existingCrop = await findCropById(id);
    if (!existingCrop) {
      return res.status(404).json({
        success: false,
        message: 'Cultivo no encontrado'
      });
    }

    // Verificar que el usuario autenticado es el propietario del cultivo
    if (existingCrop.user_id !== authenticatedUser.id) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para eliminar este cultivo'
      });
    }

    const query = 'DELETE FROM crops WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cultivo no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cultivo eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar cultivo',
      error: error.message
    });
  }
};

// Obtener todas las categorías únicas de cultivos
const getCropCategories = async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT category 
      FROM crops 
      WHERE category IS NOT NULL AND category != ''
      ORDER BY category ASC
    `;
    const result = await pool.query(query);
    
    const categories = result.rows.map(row => row.category);

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener categorías de cultivos',
      error: error.message
    });
  }
};

// Obtener configuraciones de riego asociadas
const getCropIrrigationConfigs = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el cultivo existe
    const existingCrop = await findCropById(id);
    if (!existingCrop) {
      return res.status(404).json({
        success: false,
        message: 'Cultivo no encontrado'
      });
    }

    const query = 'SELECT * FROM irrigation_configs WHERE crop_id = $1';
    const result = await pool.query(query, [id]);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener configuraciones de riego',
      error: error.message
    });
  }
};

export {
  createCrop,
  findCropById,
  getCropById,
  findCropByUserId,
  getCropByUserId,
  getAllCropsByUserId,
  getAllCrops,
  getSelectedCropByUserId,
  getCropCategories,
  updateCrop,
  selectCrop,
  deselectCrop,
  deleteCrop,
  getCropIrrigationConfigs
};
