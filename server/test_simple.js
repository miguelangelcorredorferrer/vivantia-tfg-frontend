import { pool } from './config/db.js'

const testSimple = async () => {
  const client = await pool.connect()
  
  try {
    console.log('🔍 DIAGNÓSTICO SIMPLE')
    console.log('=' .repeat(40))
    
    // 1. Verificar configuración automática
    const configQuery = `
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
        c.air_humidity_max
      FROM irrigation_configs ic
      INNER JOIN crops c ON c.id = ic.crop_id
      WHERE ic.mode_type = 'automatic'
      ORDER BY ic.created_at DESC
      LIMIT 1
    `
    
    const configResult = await client.query(configQuery)
    
    if (configResult.rows.length === 0) {
      console.log('❌ NO HAY CONFIGURACIÓN AUTOMÁTICA')
      return
    }
    
    const config = configResult.rows[0]
    console.log('✅ CONFIGURACIÓN ENCONTRADA:')
    console.log(`   Config ID: ${config.config_id}`)
    console.log(`   User ID: ${config.user_id}`)
    console.log(`   Cultivo: ${config.crop_name}`)
    console.log(`   is_active: ${config.is_active}`)
    console.log(`   Umbrales:`)
    console.log(`     - Temperatura máxima: ${config.temperature_max}°C`)
    console.log(`     - Humedad suelo: ${config.soil_humidity_min}% - ${config.soil_humidity_max}%`)
    console.log(`     - Humedad aire: ${config.air_humidity_min}% - ${config.air_humidity_max}%`)
    
    // 2. Verificar dispositivo del usuario
    const deviceQuery = `
      SELECT id, device_name, is_active_communication
      FROM devices 
      WHERE user_id = $1 AND is_active_communication = true
    `
    const deviceResult = await client.query(deviceQuery, [config.user_id])
    
    if (deviceResult.rows.length === 0) {
      console.log('❌ NO HAY DISPOSITIVO ACTIVO PARA ESTE USUARIO')
      return
    }
    
    const device = deviceResult.rows[0]
    console.log(`\\n✅ DISPOSITIVO ACTIVO:`)
    console.log(`   Device ID: ${device.id}`)
    console.log(`   Nombre: ${device.device_name}`)
    
    // 3. Simular datos de prueba
    const testData = {
      temperature: 36.5,
      air_humidity: 35.0,
      soil_humidity: 25.0
    }
    
    console.log(`\\n🧪 DATOS DE PRUEBA:`)
    console.table([testData])
    
    // 4. Evaluar condiciones MANUALMENTE
    console.log(`\\n🔍 EVALUACIÓN MANUAL:`)
    
    const temperatureHigh = testData.temperature > config.temperature_max
    const soilHumidityLow = testData.soil_humidity < config.soil_humidity_min
    const airHumidityLow = testData.air_humidity < config.air_humidity_min
    
    console.log(`   Temperatura alta: ${testData.temperature}°C > ${config.temperature_max}°C = ${temperatureHigh}`)
    console.log(`   Suelo bajo: ${testData.soil_humidity}% < ${config.soil_humidity_min}% = ${soilHumidityLow}`)
    console.log(`   Aire bajo: ${testData.air_humidity}% < ${config.air_humidity_min}% = ${airHumidityLow}`)
    
    const shouldActivate = temperatureHigh || soilHumidityLow || airHumidityLow
    console.log(`\\n🤖 RESULTADO: ${shouldActivate ? 'DEBERÍA ACTIVARSE ✅' : 'NO debería activarse ❌'}`)
    
    // 5. Insertar lectura real
    console.log(`\\n💾 INSERTANDO LECTURA...`)
    const insertResult = await client.query(`
      INSERT INTO sensor_readings (device_id, air_humidity, soil_humidity, temperature, received_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *
    `, [device.id, testData.air_humidity, testData.soil_humidity, testData.temperature])
    
    console.log('✅ Lectura insertada:', insertResult.rows[0])
    
    // 6. Llamar a la función de evaluación directamente
    console.log(`\\n🤖 IMPORTANDO Y LLAMANDO evaluateAutomaticIrrigation...`)
    
    const { evaluateAutomaticIrrigation } = await import('./services/automaticIrrigationService.js')
    
    await evaluateAutomaticIrrigation(device.id, {
      temperature: testData.temperature,
      air_humidity: testData.air_humidity,
      soil_humidity: testData.soil_humidity,
      device_id: device.id
    })
    
    // 7. Verificar el resultado
    console.log(`\\n📊 VERIFICANDO RESULTADO...`)
    
    const configAfter = await client.query('SELECT is_active FROM irrigation_configs WHERE id = $1', [config.config_id])
    console.log(`   is_active después: ${configAfter.rows[0]?.is_active}`)
    
    const pumpQuery = `
      SELECT * FROM pump_activations 
      WHERE irrigation_config_id = $1 
      ORDER BY created_at DESC 
      LIMIT 1
    `
    const pumpResult = await client.query(pumpQuery, [config.config_id])
    
    if (pumpResult.rows.length > 0) {
      console.log('✅ ACTIVACIÓN DE BOMBA CREADA:')
      console.table(pumpResult.rows)
    } else {
      console.log('❌ NO SE CREÓ ACTIVACIÓN DE BOMBA')
    }
    
  } catch (error) {
    console.error('❌ ERROR:', error.message)
    console.error('Stack:', error.stack)
  } finally {
    client.release()
    process.exit(0)
  }
}

testSimple()
