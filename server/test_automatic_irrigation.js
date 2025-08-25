import { pool } from './config/db.js'
import { evaluateAutomaticIrrigation } from './services/automaticIrrigationService.js'

// Script para probar el riego automático insertando datos directamente en la BD
const testAutomaticIrrigation = async () => {
  const client = await pool.connect()
  
  try {
    console.log('🧪 INICIANDO PRUEBA DE RIEGO AUTOMÁTICO')
    console.log('=' .repeat(50))
    
    // 1. Mostrar dispositivos disponibles
    console.log('\n📱 1. DISPOSITIVOS DISPONIBLES:')
    const devicesQuery = `
      SELECT d.id, d.device_name, d.user_id, d.is_active_communication, u.name as user_name
      FROM devices d 
      INNER JOIN users u ON u.id = d.user_id 
      WHERE d.is_active_communication = true
      ORDER BY d.id
    `
    const devices = await client.query(devicesQuery)
    
    if (devices.rows.length === 0) {
      console.log('❌ No hay dispositivos activos')
      return
    }
    
    console.table(devices.rows)
    
    // 2. Mostrar configuraciones automáticas
    console.log('\n🤖 2. CONFIGURACIONES AUTOMÁTICAS:')
    const autoConfigQuery = `
      SELECT 
        ic.id as config_id,
        ic.user_id,
        ic.crop_id,
        ic.is_active,
        c.name as crop_name,
        c.temperature_max,
        c.soil_humidity_min,
        c.soil_humidity_max,
        c.air_humidity_min,
        c.air_humidity_max,
        u.name as user_name,
        d.id as device_id,
        d.device_name
      FROM irrigation_configs ic
      INNER JOIN crops c ON c.id = ic.crop_id
      INNER JOIN users u ON u.id = ic.user_id
      LEFT JOIN devices d ON d.user_id = ic.user_id AND d.is_active_communication = true
      WHERE ic.mode_type = 'automatic'
      ORDER BY ic.created_at DESC
    `
    const autoConfigs = await client.query(autoConfigQuery)
    
    if (autoConfigs.rows.length === 0) {
      console.log('❌ No hay configuraciones automáticas activas')
      return
    }
    
    console.table(autoConfigs.rows)
    
    // 3. Usar el primer dispositivo activo que tenga configuración automática
    const targetConfig = autoConfigs.rows.find(config => config.device_id)
    
    if (!targetConfig) {
      console.log('❌ No hay dispositivo activo con configuración automática')
      return
    }
    
    console.log(`\n🎯 3. USANDO CONFIGURACIÓN:`)
    console.log(`   - Usuario: ${targetConfig.user_name}`)
    console.log(`   - Dispositivo: ${targetConfig.device_name} (ID: ${targetConfig.device_id})`)
    console.log(`   - Cultivo: ${targetConfig.crop_name}`)
    console.log(`   - Umbrales:`)
    console.log(`     * Temperatura máxima: ${targetConfig.temperature_max}°C`)
    console.log(`     * Humedad suelo: ${targetConfig.soil_humidity_min}% - ${targetConfig.soil_humidity_max}%`)
    console.log(`     * Humedad aire: ${targetConfig.air_humidity_min}% - ${targetConfig.air_humidity_max}%`)
    
    // 4. Datos de prueba que deberían activar el riego
    const testData = {
      device_id: targetConfig.device_id,
      temperature: 36.5,     // Mayor que máximo (35°C)
      air_humidity: 35.0,    // Menor que mínimo (40%)  
      soil_humidity: 25.0    // Podría estar fuera de rango
    }
    
    console.log(`\n🧪 4. INSERTANDO DATOS DE PRUEBA:`)
    console.table([testData])
    
    // 5. Analizar si debería activarse
    console.log(`\n📊 5. ANÁLISIS DE ACTIVACIÓN:`)
    const tempExceeds = testData.temperature > targetConfig.temperature_max
    const airBelow = testData.air_humidity < targetConfig.air_humidity_min
    const soilBelow = testData.soil_humidity < targetConfig.soil_humidity_min
    const soilAbove = testData.soil_humidity > targetConfig.soil_humidity_max
    
    console.log(`   ✅ Temperatura excede máximo (${targetConfig.temperature_max}°C): ${tempExceeds ? 'SÍ' : 'NO'}`)
    console.log(`   ✅ Humedad aire bajo mínimo (${targetConfig.air_humidity_min}%): ${airBelow ? 'SÍ' : 'NO'}`)
    console.log(`   ✅ Humedad suelo bajo mínimo (${targetConfig.soil_humidity_min}%): ${soilBelow ? 'SÍ' : 'NO'}`)
    console.log(`   ✅ Humedad suelo sobre máximo (${targetConfig.soil_humidity_max}%): ${soilAbove ? 'SÍ' : 'NO'}`)
    
    const shouldActivate = tempExceeds || airBelow || soilBelow
    console.log(`\n🤖 PREDICCIÓN: El riego ${shouldActivate ? 'DEBERÍA ACTIVARSE ✅' : 'NO debería activarse ❌'}`)
    
    // 6. Insertar datos en la base de datos
    console.log(`\n💾 6. INSERTANDO EN BASE DE DATOS...`)
    const insertQuery = `
      INSERT INTO sensor_readings (device_id, air_humidity, soil_humidity, temperature)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `
    
    const insertResult = await client.query(insertQuery, [
      testData.device_id,
      testData.air_humidity,
      testData.soil_humidity,
      testData.temperature
    ])
    
    const insertedReading = insertResult.rows[0]
    console.log('✅ Datos insertados:', insertedReading)
    
    // 7. Simular la evaluación automática (igual que en el webhook)
    console.log(`\n🤖 7. EJECUTANDO EVALUACIÓN AUTOMÁTICA...`)
    console.log('=' .repeat(30))
    
    await evaluateAutomaticIrrigation(targetConfig.device_id, {
      temperature: testData.temperature,
      air_humidity: testData.air_humidity,
      soil_humidity: testData.soil_humidity,
      device_id: targetConfig.device_id,
      timestamp: insertedReading.received_at
    })
    
    console.log('=' .repeat(30))
    console.log('✅ EVALUACIÓN COMPLETADA')
    
    // 8. Verificar resultado
    console.log(`\n📋 8. VERIFICANDO RESULTADO...`)
    const pumpQuery = `
      SELECT pa.*, ic.mode_type 
      FROM pump_activations pa
      INNER JOIN irrigation_configs ic ON ic.id = pa.irrigation_config_id
      WHERE ic.user_id = $1 AND ic.mode_type = 'automatic'
      ORDER BY pa.created_at DESC
      LIMIT 1
    `
    
    const pumpResult = await client.query(pumpQuery, [targetConfig.user_id])
    
    if (pumpResult.rows.length > 0) {
      console.log('🟢 ACTIVACIÓN DE BOMBA ENCONTRADA:')
      console.table(pumpResult.rows)
    } else {
      console.log('🔴 NO SE ENCONTRÓ ACTIVACIÓN DE BOMBA')
    }
    
    // 9. Verificar estado de la configuración
    const configStatusQuery = `
      SELECT is_active, created_at, updated_at 
      FROM irrigation_configs 
      WHERE id = $1
    `
    const configStatus = await client.query(configStatusQuery, [targetConfig.config_id])
    
    console.log('\n📊 ESTADO DE CONFIGURACIÓN:')
    console.table(configStatus.rows)
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error)
    console.error('Stack:', error.stack)
  } finally {
    client.release()
    console.log('\n🏁 PRUEBA FINALIZADA')
    process.exit(0)
  }
}

// Ejecutar la prueba
testAutomaticIrrigation()
