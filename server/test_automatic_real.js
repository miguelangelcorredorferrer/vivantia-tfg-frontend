import { pool } from './config/db.js';

async function testAutomaticActivation() {
  try {
    console.log('🧪 === PRUEBA DE ACTIVACIÓN AUTOMÁTICA REAL ===');
    
    const userId = 9;
    
    // 1. Verificar que hay configuración automática preparada
    console.log('\n1️⃣ Verificando configuración automática...');
    const configResult = await pool.query(`
      SELECT ic.id, ic.is_active, c.name as crop_name,
             c.soil_humidity_min, c.soil_humidity_max,
             c.air_humidity_min, c.air_humidity_max, 
             c.temperature_max,
             d.id as device_id, d.device_name
      FROM irrigation_configs ic
      INNER JOIN crops c ON c.id = ic.crop_id
      INNER JOIN devices d ON d.user_id = ic.user_id AND d.is_active_communication = true
      WHERE ic.user_id = $1 AND ic.mode_type = 'automatic'
      ORDER BY ic.created_at DESC
      LIMIT 1
    `, [userId]);
    
    if (configResult.rows.length === 0) {
      console.log('❌ No hay configuración automática. Crea una configuración primero.');
      return;
    }
    
    const config = configResult.rows[0];
    console.log('✅ Configuración encontrada:', {
      configId: config.id,
      isActive: config.is_active,
      cultivo: config.crop_name,
      deviceId: config.device_id,
      umbrales: {
        tempMax: config.temperature_max,
        soilMin: config.soil_humidity_min,
        soilMax: config.soil_humidity_max,
        airMin: config.air_humidity_min,
        airMax: config.air_humidity_max
      }
    });
    
    // 2. Crear datos de sensores que GARANTICEN activación
    console.log('\n2️⃣ Insertando datos que activarán el riego...');
    
    const testData = {
      device_id: config.device_id,
      // Temperatura que supera el máximo
      temperature: parseFloat(config.temperature_max) + 3,
      // Humedad del aire por debajo del mínimo  
      air_humidity: parseFloat(config.air_humidity_min) - 5,
      // Humedad del suelo por debajo del mínimo
      soil_humidity: Math.max(parseFloat(config.soil_humidity_min) - 5, -2)
    };
    
    console.log('📊 Datos de prueba:', testData);
    console.log('🎯 Condiciones esperadas:');
    console.log(`   - Temp: ${testData.temperature}°C > ${config.temperature_max}°C ✅ ACTIVA`);
    console.log(`   - Aire: ${testData.air_humidity}% < ${config.air_humidity_min}% ✅ ACTIVA`);
    console.log(`   - Suelo: ${testData.soil_humidity}% <= ${config.soil_humidity_min}% ✅ ACTIVA`);
    
    // Insertar en la base de datos
    const insertResult = await pool.query(`
      INSERT INTO sensor_readings (device_id, temperature, air_humidity, soil_humidity, received_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id, received_at
    `, [testData.device_id, testData.temperature, testData.air_humidity, testData.soil_humidity]);
    
    console.log('✅ Datos insertados:', insertResult.rows[0]);
    
    // 3. Esperar un momento para que se procese automáticamente
    console.log('\n3️⃣ Esperando procesamiento automático...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 4. Verificar si se activó el riego automáticamente
    console.log('\n4️⃣ Verificando si se activó automáticamente...');
    const statusResult = await pool.query(`
      SELECT 
        ic.is_active as config_active,
        pa.id as pump_id,
        pa.status as pump_status,
        pa.started_at,
        pa.duration_minutes
      FROM irrigation_configs ic
      LEFT JOIN pump_activations pa ON pa.irrigation_config_id = ic.id 
        AND pa.status IN ('active', 'paused')
      WHERE ic.user_id = $1 AND ic.mode_type = 'automatic'
      ORDER BY ic.created_at DESC, pa.created_at DESC
      LIMIT 1
    `, [userId]);
    
    const status = statusResult.rows[0];
    
    if (status && status.config_active && status.pump_status === 'active') {
      console.log('🎉 ¡ÉXITO! El riego se activó automáticamente:');
      console.log('   ✅ Configuración activa:', status.config_active);
      console.log('   ✅ Bomba activa:', status.pump_status);
      console.log('   ✅ Iniciado en:', status.started_at);
      console.log('   ✅ Duración:', status.duration_minutes || 'AUTOMÁTICA (NULL)');
    } else {
      console.log('❌ El riego NO se activó automáticamente');
      console.log('Estado actual:', status);
    }
    
    // 5. Mostrar último estado
    console.log('\n5️⃣ Estado final del sistema:');
    const finalCheck = await pool.query(`
      SELECT 
        ic.id as config_id,
        ic.is_active,
        ic.created_at as config_created,
        pa.id as pump_id,
        pa.status as pump_status,
        pa.started_at as pump_started,
        sr.temperature,
        sr.air_humidity,
        sr.soil_humidity,
        sr.received_at as sensor_time
      FROM irrigation_configs ic
      LEFT JOIN pump_activations pa ON pa.irrigation_config_id = ic.id
      LEFT JOIN sensor_readings sr ON sr.device_id = $2
      WHERE ic.user_id = $1 AND ic.mode_type = 'automatic'
      ORDER BY ic.created_at DESC, pa.created_at DESC, sr.received_at DESC
      LIMIT 1
    `, [userId, config.device_id]);
    
    console.log('📋 Estado completo:', finalCheck.rows[0]);
    
  } catch (error) {
    console.error('❌ Error en prueba:', error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

console.log('🚀 Iniciando prueba de activación automática...');
testAutomaticActivation();
