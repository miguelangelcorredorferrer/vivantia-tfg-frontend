import { pool } from '../config/db.js';
import SensorReading from '../models/SensorReading.js';
import { handleNotFoundError, handleBadRequestError, handleInternalServerError, handleSuccessResponse } from '../utils/index.js';

// Crear una nueva lectura de sensor
const createSensorReading = async (req, res) => {
  try {
    const { device_id, air_humidity, soil_humidity, temperature } = req.body;

    // Validar campos obligatorios
    if (!device_id || air_humidity === undefined || soil_humidity === undefined || temperature === undefined) {
      return handleBadRequestError('Device ID, humedad del aire, humedad del suelo y temperatura son obligatorios', res);
    }

    const query = `
      INSERT INTO sensor_readings (device_id, air_humidity, soil_humidity, temperature)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const values = [device_id, air_humidity, soil_humidity, temperature];
    
    const result = await pool.query(query, values);
    const reading = new SensorReading(result.rows[0]);

    res.status(201).json({
      success: true,
      message: 'Lectura de sensor creada exitosamente',
      data: reading
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear lectura de sensor',
      error: error.message
    });
  }
};

// Buscar lectura por ID
const findSensorReadingById = async (id) => {
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
};

// Obtener lectura por ID (para API)
const getSensorReadingById = async (req, res) => {
  try {
    const { id } = req.params;
    const reading = await findSensorReadingById(id);

    if (!reading) {
      return handleNotFoundError('Lectura no encontrada', res);
    }

    return handleSuccessResponse(res, reading, 'Lectura obtenida exitosamente');
  } catch (error) {
    return handleInternalServerError('Error al obtener lectura', res, error);
  }
};

// Buscar lecturas por dispositivo
const getSensorReadingsByDeviceId = async (req, res) => {
  try {
    const { device_id } = req.params;
    const { limit = 100, offset = 0 } = req.query;

    const query = `
      SELECT * FROM sensor_readings 
      WHERE device_id = $1 
      ORDER BY received_at DESC 
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [device_id, parseInt(limit), parseInt(offset)]);
    
    const readings = result.rows.map(row => new SensorReading(row));

    res.status(200).json({
      success: true,
      count: readings.length,
      data: readings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener lecturas del dispositivo',
      error: error.message
    });
  }
};

// Obtener lecturas por rango de fechas
const getSensorReadingsByDateRange = async (req, res) => {
  try {
    const { device_id } = req.params;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Fecha de inicio y fin son obligatorias'
      });
    }

    const query = `
      SELECT * FROM sensor_readings 
      WHERE device_id = $1 
      AND received_at BETWEEN $2 AND $3
      ORDER BY received_at DESC
    `;
    const result = await pool.query(query, [device_id, startDate, endDate]);
    
    const readings = result.rows.map(row => new SensorReading(row));

    res.status(200).json({
      success: true,
      count: readings.length,
      data: readings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener lecturas por rango de fechas',
      error: error.message
    });
  }
};

// Obtener última lectura de un dispositivo
const getLatestSensorReadingByDeviceId = async (req, res) => {
  try {
    const { device_id } = req.params;

    const query = `
      SELECT * FROM sensor_readings 
      WHERE device_id = $1 
      ORDER BY received_at DESC 
      LIMIT 1
    `;
    const result = await pool.query(query, [device_id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron lecturas para este dispositivo'
      });
    }
    
    const reading = new SensorReading(result.rows[0]);

    res.status(200).json({
      success: true,
      data: reading
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener última lectura',
      error: error.message
    });
  }
};

// Obtener promedio de lecturas en un período
const getAverageSensorReadingsByPeriod = async (req, res) => {
  try {
    const { device_id } = req.params;
    const { hours = 24 } = req.query;

    const query = `
      SELECT 
        AVG(humidity) as avg_humidity,
        AVG(temperature) as avg_temperature,
        COUNT(*) as reading_count
      FROM sensor_readings 
      WHERE device_id = $1 
      AND received_at >= NOW() - INTERVAL '${parseInt(hours)} hours'
    `;
    const result = await pool.query(query, [device_id]);

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al calcular promedios',
      error: error.message
    });
  }
};

// Obtener lecturas agrupadas por horas
const getHourlyAverageSensorReadings = async (req, res) => {
  try {
    const { device_id } = req.params;
    const { days = 7 } = req.query;

    const query = `
      SELECT 
        DATE_TRUNC('hour', received_at) as hour,
        AVG(humidity) as avg_humidity,
        AVG(temperature) as avg_temperature,
        COUNT(*) as reading_count
      FROM sensor_readings 
      WHERE device_id = $1 
      AND received_at >= NOW() - INTERVAL '${parseInt(days)} days'
      GROUP BY DATE_TRUNC('hour', received_at)
      ORDER BY hour DESC
    `;
    const result = await pool.query(query, [device_id]);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener promedios por hora',
      error: error.message
    });
  }
};

// Obtener lecturas que excedan umbrales
const getSensorReadingsOutOfThreshold = async (req, res) => {
  try {
    const { device_id } = req.params;
    const { minHumidity, maxHumidity, maxTemperature, hours = 24 } = req.query;

    if (!minHumidity || !maxHumidity || !maxTemperature) {
      return res.status(400).json({
        success: false,
        message: 'Umbrales de humedad mínima, máxima y temperatura máxima son obligatorios'
      });
    }

    const query = `
      SELECT * FROM sensor_readings 
      WHERE device_id = $1 
      AND received_at >= NOW() - INTERVAL '${parseInt(hours)} hours'
      AND (
        humidity < $2 OR 
        humidity > $3 OR 
        temperature > $4
      )
      ORDER BY received_at DESC
    `;
    const result = await pool.query(query, [device_id, minHumidity, maxHumidity, maxTemperature]);
    
    const readings = result.rows.map(row => new SensorReading(row));

    res.status(200).json({
      success: true,
      count: readings.length,
      data: readings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar lecturas fuera de umbral',
      error: error.message
    });
  }
};

// Eliminar lecturas antiguas (mantenimiento)
const deleteOldSensorReadings = async (req, res) => {
  try {
    const { days = 90 } = req.query;

    const query = `
      DELETE FROM sensor_readings 
      WHERE received_at < NOW() - INTERVAL '${parseInt(days)} days'
    `;
    const result = await pool.query(query);

    res.status(200).json({
      success: true,
      message: `${result.rowCount} lecturas antiguas eliminadas`,
      count: result.rowCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar lecturas antiguas',
      error: error.message
    });
  }
};

// Obtener estadísticas generales de un dispositivo
const getDeviceSensorStats = async (req, res) => {
  try {
    const { device_id } = req.params;
    const { days = 30 } = req.query;

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
      AND received_at >= NOW() - INTERVAL '${parseInt(days)} days'
    `;
    const result = await pool.query(query, [device_id]);

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas del dispositivo',
      error: error.message
    });
  }
};

// Actualizar una lectura
const updateSensorReading = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Verificar si la lectura existe
    const existingReading = await findSensorReadingById(id);
    if (!existingReading) {
      return res.status(404).json({
        success: false,
        message: 'Lectura no encontrada'
      });
    }

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
      return res.status(400).json({
        success: false,
        message: 'No hay campos para actualizar'
      });
    }

    values.push(id);
    
    const query = `
      UPDATE sensor_readings 
      SET ${fields.join(', ')}
      WHERE id = $${counter}
      RETURNING *
    `;
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Lectura no encontrada'
      });
    }
    
    const updatedReading = new SensorReading(result.rows[0]);

    res.status(200).json({
      success: true,
      message: 'Lectura actualizada exitosamente',
      data: updatedReading
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar lectura',
      error: error.message
    });
  }
};

// Eliminar una lectura específica
const deleteSensorReading = async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'DELETE FROM sensor_readings WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Lectura no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lectura eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar lectura',
      error: error.message
    });
  }
};

// ===== FUNCIONES PARA DASHBOARD =====

// Obtener el último dato registrado (punto inicial para gráficas)
const getLatestReadingForDashboard = async (req, res) => {
  try {
    const { device_id } = req.params;

    // Obtener los dos últimos datos para calcular el cambio
    const query = `
      SELECT * FROM sensor_readings 
      WHERE device_id = $1 
      ORDER BY received_at DESC 
      LIMIT 2
    `;
    
    const result = await pool.query(query, [device_id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron datos para este dispositivo'
      });
    }
    
    const currentReading = new SensorReading(result.rows[0]);
    const previousReading = result.rows.length > 1 ? new SensorReading(result.rows[1]) : null;
    
    // Calcular cambios porcentuales
    let temperatureChange = 0;
    let humidityChange = 0;
    
    if (previousReading) {
      if (previousReading.temperature !== null && currentReading.temperature !== null && previousReading.temperature !== 0) {
        temperatureChange = ((currentReading.temperature - previousReading.temperature) / previousReading.temperature) * 100;
      }
      
      if (previousReading.humidity !== null && currentReading.humidity !== null && previousReading.humidity !== 0) {
        humidityChange = ((currentReading.humidity - previousReading.humidity) / previousReading.humidity) * 100;
      }
    }
    
    const responseData = {
      ...currentReading,
      changes: {
        temperature: {
          value: temperatureChange,
          direction: temperatureChange > 0 ? 'up' : temperatureChange < 0 ? 'down' : 'stable',
          formatted: `${temperatureChange > 0 ? '+' : ''}${temperatureChange.toFixed(1)}%`
        },
        humidity: {
          value: humidityChange,
          direction: humidityChange > 0 ? 'up' : humidityChange < 0 ? 'down' : 'stable',
          formatted: `${humidityChange > 0 ? '+' : ''}${humidityChange.toFixed(1)}%`
        }
      }
    };

    res.status(200).json({
      success: true,
      message: 'Último dato obtenido exitosamente',
      data: responseData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener último dato',
      error: error.message
    });
  }
};

// Obtener datos históricos para mostrar evolución en gráficas
const getReadingsHistoryForDashboard = async (req, res) => {
  try {
    const { device_id } = req.params;
    const { hours = 24, limit = 100 } = req.query;

    const query = `
      SELECT * FROM sensor_readings 
      WHERE device_id = $1 
      AND received_at >= NOW() - INTERVAL '${parseInt(hours)} hours'
      ORDER BY received_at ASC
      LIMIT $2
    `;
    
    const result = await pool.query(query, [device_id, parseInt(limit)]);
    
    const readings = result.rows.map(row => new SensorReading(row));

    res.status(200).json({
      success: true,
      message: 'Datos históricos obtenidos exitosamente',
      count: readings.length,
      data: readings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos históricos',
      error: error.message
    });
  }
};

// Obtener datos nuevos desde un timestamp específico (para actualizaciones en tiempo real)
const getNewReadingsSince = async (req, res) => {
  try {
    const { device_id } = req.params;
    const { since } = req.query; // Timestamp desde el cual obtener datos nuevos

    if (!since) {
      return res.status(400).json({
        success: false,
        message: 'Parámetro "since" es obligatorio'
      });
    }

    const query = `
      SELECT * FROM sensor_readings 
      WHERE device_id = $1 
      AND received_at > $2
      ORDER BY received_at ASC
    `;
    
    const result = await pool.query(query, [device_id, since]);
    
    const readings = result.rows.map(row => new SensorReading(row));

    res.status(200).json({
      success: true,
      message: 'Datos nuevos obtenidos exitosamente',
      count: readings.length,
      data: readings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos nuevos',
      error: error.message
    });
  }
};

// Obtener último dato de sensor del dispositivo activo del usuario
const getLatestSensorReadingForActiveDevice = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Buscar el dispositivo activo del usuario
    const deviceQuery = `
      SELECT id, device_name FROM devices 
      WHERE user_id = $1 AND is_active_communication = true 
      ORDER BY created_at DESC 
      LIMIT 1
    `;
    const deviceResult = await pool.query(deviceQuery, [user_id]);
    
    console.log('🔍 Buscando dispositivo activo para usuario:', user_id)
    console.log('🔍 Resultado de búsqueda de dispositivo:', deviceResult.rows.length, 'dispositivos encontrados')
    
    if (deviceResult.rows.length === 0) {
      console.log('❌ No se encontró dispositivo activo para el usuario:', user_id)
      return res.status(404).json({
        success: false,
        message: 'No se encontró dispositivo activo para este usuario'
      });
    }
    
    const activeDevice = deviceResult.rows[0];
    console.log('✅ Dispositivo activo encontrado:', activeDevice)

    // Obtener el último dato de sensor del dispositivo activo
    const sensorQuery = `
      SELECT * FROM sensor_readings 
      WHERE device_id = $1 
      ORDER BY received_at DESC 
      LIMIT 1
    `;
    const sensorResult = await pool.query(sensorQuery, [activeDevice.id]);
    
    if (sensorResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron lecturas para el dispositivo activo'
      });
    }
    
    const reading = new SensorReading(sensorResult.rows[0]);

    // Obtener el dato anterior para calcular tendencias
    const previousQuery = `
      SELECT * FROM sensor_readings 
      WHERE device_id = $1 
      ORDER BY received_at DESC 
      LIMIT 1 OFFSET 1
    `;
    const previousResult = await pool.query(previousQuery, [activeDevice.id]);
    
    let temperatureChange = 0;
    let humidityChange = 0;
    
    if (previousResult.rows.length > 0) {
      const previousReading = previousResult.rows[0];
      
      if (previousReading.temperature !== null && reading.temperature !== null) {
        temperatureChange = reading.temperature - previousReading.temperature;
      }
      
      if (previousReading.humidity !== null && reading.humidity !== null) {
        humidityChange = reading.humidity - previousReading.humidity;
      }
    }

    const responseData = {
      ...reading,
      device: {
        id: activeDevice.id,
        name: activeDevice.device_name
      },
      trends: {
        temperature: {
          value: temperatureChange,
          direction: temperatureChange > 0 ? 'up' : temperatureChange < 0 ? 'down' : 'stable',
          formatted: `${temperatureChange > 0 ? '+' : ''}${temperatureChange.toFixed(1)}°C`
        },
        humidity: {
          value: humidityChange,
          direction: humidityChange > 0 ? 'up' : humidityChange < 0 ? 'down' : 'stable',
          formatted: `${humidityChange > 0 ? '+' : ''}${humidityChange.toFixed(1)}%`
        }
      }
    };

    res.status(200).json({
      success: true,
      message: 'Último dato del dispositivo activo obtenido exitosamente',
      data: responseData
    });
  } catch (error) {
    console.error('❌ Error al obtener último dato del dispositivo activo:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener último dato del dispositivo activo',
      error: error.message
    });
  }
};

// Ya no necesitamos simular el tiempo aquí, se maneja en el composable

export {
  createSensorReading,
  findSensorReadingById,
  getSensorReadingById,
  getSensorReadingsByDeviceId,
  getSensorReadingsByDateRange,
  getLatestSensorReadingByDeviceId,
  getAverageSensorReadingsByPeriod,
  getHourlyAverageSensorReadings,
  getSensorReadingsOutOfThreshold,
  deleteOldSensorReadings,
  getDeviceSensorStats,
  updateSensorReading,
  deleteSensorReading,
  // Funciones para dashboard
  getLatestReadingForDashboard,
  getReadingsHistoryForDashboard,
  getNewReadingsSince,
  getLatestSensorReadingForActiveDevice
};
