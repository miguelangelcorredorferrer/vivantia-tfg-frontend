import { pool } from '../config/db.js';
import Device from '../models/Device.js';
import { handleNotFoundError, handleBadRequestError, handleInternalServerError, handleSuccessResponse } from '../utils/index.js';

// Crear un nuevo dispositivo
const createDevice = async (req, res) => {
  try {
    const {
      user_id, device_name, enddevice_id, app_eui, dev_eui, app_key, is_active_communication = false
    } = req.body;

    // Validar campos obligatorios
    if (!user_id || !device_name || !enddevice_id || !app_eui || !dev_eui || !app_key) {
      return handleBadRequestError('Todos los campos obligatorios deben ser proporcionados', res);
    }

    const query = `
      INSERT INTO devices (
        user_id, device_name, enddevice_id, app_eui, dev_eui, app_key, is_active_communication
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [user_id, device_name, enddevice_id, app_eui, dev_eui, app_key, is_active_communication];
    
    const result = await pool.query(query, values);
    const device = new Device(result.rows[0]);

    return handleSuccessResponse(res, device, 'Dispositivo creado exitosamente', 201);
  } catch (error) {
    return handleInternalServerError('Error al crear dispositivo', res, error);
  }
};

// Buscar dispositivo por ID
const findDeviceById = async (id) => {
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
};

// Obtener dispositivo por ID (para API)
const getDeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await findDeviceById(id);

    if (!device) {
      return handleNotFoundError('Dispositivo no encontrado', res);
    }

    return handleSuccessResponse(res, device, 'Dispositivo obtenido exitosamente');
  } catch (error) {
    return handleInternalServerError('Error al obtener dispositivo', res, error);
  }
};

// Buscar dispositivos por usuario
const getDevicesByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const query = 'SELECT * FROM devices WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [user_id]);
    
    const devices = result.rows.map(row => new Device(row));

    res.status(200).json({
      success: true,
      count: devices.length,
      data: devices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener dispositivos del usuario',
      error: error.message
    });
  }
};

// Buscar dispositivo por enddevice_id
const findDeviceByEndDeviceId = async (enddevice_id) => {
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
};

// Obtener dispositivo por enddevice_id (para API)
const getDeviceByEndDeviceId = async (req, res) => {
  try {
    const { enddevice_id } = req.params;
    const device = await findDeviceByEndDeviceId(enddevice_id);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Dispositivo no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: device
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener dispositivo',
      error: error.message
    });
  }
};

// Obtener todos los dispositivos
const getAllDevices = async (req, res) => {
  try {
    const query = 'SELECT * FROM devices ORDER BY created_at DESC';
    const result = await pool.query(query);
    
    const devices = result.rows.map(row => new Device(row));

    res.status(200).json({
      success: true,
      count: devices.length,
      data: devices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener dispositivos',
      error: error.message
    });
  }
};

// Obtener dispositivos activos
const getActiveDevices = async (req, res) => {
  try {
    const query = 'SELECT * FROM devices WHERE is_active_communication = true ORDER BY created_at DESC';
    const result = await pool.query(query);
    
    const devices = result.rows.map(row => new Device(row));

    res.status(200).json({
      success: true,
      count: devices.length,
      data: devices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener dispositivos activos',
      error: error.message
    });
  }
};

// Actualizar dispositivo
const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Verificar si el dispositivo existe
    const existingDevice = await findDeviceById(id);
    if (!existingDevice) {
      return res.status(404).json({
        success: false,
        message: 'Dispositivo no encontrado'
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
      UPDATE devices 
      SET ${fields.join(', ')}
      WHERE id = $${counter}
      RETURNING *
    `;
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Dispositivo no encontrado'
      });
    }
    
    const updatedDevice = new Device(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Dispositivo actualizado exitosamente',
      data: updatedDevice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar dispositivo',
      error: error.message
    });
  }
};

// Activar comunicación del dispositivo
const activateDevice = async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'UPDATE devices SET is_active_communication = true WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Dispositivo no encontrado'
      });
    }
    
    const activatedDevice = new Device(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Dispositivo activado exitosamente',
      data: activatedDevice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al activar dispositivo',
      error: error.message
    });
  }
};

// Desactivar comunicación del dispositivo
const deactivateDevice = async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'UPDATE devices SET is_active_communication = false WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Dispositivo no encontrado'
      });
    }
    
    const deactivatedDevice = new Device(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Dispositivo desactivado exitosamente',
      data: deactivatedDevice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al desactivar dispositivo',
      error: error.message
    });
  }
};

// Eliminar dispositivo
const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el dispositivo existe
    const existingDevice = await findDeviceById(id);
    if (!existingDevice) {
      return res.status(404).json({
        success: false,
        message: 'Dispositivo no encontrado'
      });
    }

    const query = 'DELETE FROM devices WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Dispositivo no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Dispositivo eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar dispositivo',
      error: error.message
    });
  }
};

// Obtener lecturas de sensores del dispositivo
const getDeviceSensorReadings = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 100 } = req.query;

    // Verificar si el dispositivo existe
    const existingDevice = await findDeviceById(id);
    if (!existingDevice) {
      return res.status(404).json({
        success: false,
        message: 'Dispositivo no encontrado'
      });
    }

    const query = `
      SELECT * FROM sensor_readings 
      WHERE device_id = $1 
      ORDER BY received_at DESC 
      LIMIT $2
    `;
    const result = await pool.query(query, [id, parseInt(limit)]);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener lecturas de sensores',
      error: error.message
    });
  }
};

// Obtener última lectura del dispositivo
const getDeviceLatestReading = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el dispositivo existe
    const existingDevice = await findDeviceById(id);
    if (!existingDevice) {
      return res.status(404).json({
        success: false,
        message: 'Dispositivo no encontrado'
      });
    }

    const query = `
      SELECT * FROM sensor_readings 
      WHERE device_id = $1 
      ORDER BY received_at DESC 
      LIMIT 1
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron lecturas para este dispositivo'
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener última lectura',
      error: error.message
    });
  }
};

export {
  createDevice,
  findDeviceById,
  getDeviceById,
  getDevicesByUserId,
  findDeviceByEndDeviceId,
  getDeviceByEndDeviceId,
  getAllDevices,
  getActiveDevices,
  updateDevice,
  activateDevice,
  deactivateDevice,
  deleteDevice,
  getDeviceSensorReadings,
  getDeviceLatestReading
};
