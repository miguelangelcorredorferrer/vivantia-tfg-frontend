import { pool } from './config/db.js';
import { evaluateAutomaticIrrigationForUser } from './controllers/irrigationConfigController.js';

console.log('🧪 Insertando datos de simulación que GARANTIZAN activación...');

// Datos que cumplen las condiciones para activar riego automático
// Temp: 37°C > 35°C (máximo) ✅
// Aire: 35% < 40% (mínimo) ✅  
// Suelo: -1% < 0% (mínimo) ✅
const simulationData = {
  device_id: 21,  // Device ID del usuario 9
  temperature: 37.0,  // > 35.00 (máximo)
  air_humidity: 35.0, // < 40.00 (mínimo)
  soil_humidity: -1.0 // < 0.00 (mínimo)
};

try {
  // 1. Insertar datos de simulación
  console.log('💾 Insertando datos:', simulationData);
  const insertQuery = `
    INSERT INTO sensor_readings (device_id, air_humidity, soil_humidity, temperature)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  
  const insertResult = await pool.query(insertQuery, [
    simulationData.device_id,
    simulationData.air_humidity,
    simulationData.soil_humidity,
    simulationData.temperature
  ]);
  
  console.log('✅ Datos insertados:', insertResult.rows[0]);
  
  // 2. Probar evaluación
  const mockReq = {
    params: {
      userId: '9'
    }
  };

  const mockRes = {
    status: (code) => ({
      json: (data) => {
        console.log(`Status: ${code}`);
        console.log('Response:', JSON.stringify(data, null, 2));
        return mockRes;
      }
    }),
    json: (data) => {
      console.log('Response (200):', JSON.stringify(data, null, 2));
      return mockRes;
    }
  };

  console.log('🧪 Probando evaluateAutomaticIrrigationForUser...');
  await evaluateAutomaticIrrigationForUser(mockReq, mockRes);
  
} catch (error) {
  console.error('❌ Error en la función:', error);
  console.error('Stack:', error.stack);
}

process.exit(0);
