import { pool } from './config/db.js'

const debug = async () => {
  const client = await pool.connect()
  
  try {
    console.log('🔍 DEBUG PASO A PASO')
    console.log('=' .repeat(50))
    
    // PASO 1: Verificar que hay configuración automática
    console.log('\n📋 PASO 1: Buscando configuración automática...')
    const configQuery = `
      SELECT 
        ic.id as config_id,
        ic.user_id,
        ic.crop_id,
        ic.is_active,
        ic.mode_type,
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
    `
    
    const configs = await client.query(configQuery)
    console.log(`Configuraciones automáticas encontradas: ${configs.rows.length}`)
    
    if (configs.rows.length === 0) {
      console.log('❌ NO HAY CONFIGURACIONES AUTOMÁTICAS. Sal del script.')
      return
    }
    
    configs.rows.forEach((config, index) => {
      console.log(`\nConfig ${index + 1}:`)
      console.log(`  - ID: ${config.config_id}`)
      console.log(`  - Usuario: ${config.user_id}`)
      console.log(`  - Cultivo: ${config.crop_name}`)
      console.log(`  - is_active: ${config.is_active}`)
      console.log(`  - Umbrales:`)
      console.log(`    * Temp max: ${config.temperature_max}°C`)
      console.log(`    * Suelo: ${config.soil_humidity_min}% - ${config.soil_humidity_max}%`)
      console.log(`    * Aire: ${config.air_humidity_min}% - ${config.air_humidity_max}%`)
    })
    
    const config = configs.rows[0] // Usar la primera
    
    // PASO 2: Verificar dispositivo activo para este usuario
    console.log(`\n📱 PASO 2: Buscando dispositivo activo para usuario ${config.user_id}...`)
    const deviceQuery = `
      SELECT id, device_name, is_active_communication, user_id
      FROM devices 
      WHERE user_id = $1 AND is_active_communication = true
    `
    const devices = await client.query(deviceQuery, [config.user_id])
    console.log(`Dispositivos activos encontrados: ${devices.rows.length}`)
    
    if (devices.rows.length === 0) {
      console.log('❌ NO HAY DISPOSITIVOS ACTIVOS PARA ESTE USUARIO')
      return
    }
    
    const device = devices.rows[0]
    console.log(`✅ Dispositivo activo: ${device.device_name} (ID: ${device.id})`)
    
    // PASO 3: Simular exactamente la consulta de evaluateAutomaticIrrigation
    console.log(`\n🔍 PASO 3: Simulando consulta de evaluateAutomaticIrrigation...`)
    const configQueryFromService = `
      SELECT
        ic.id as config_id,
        ic.user_id,
        ic.crop_id,
        c.name as crop_name,
        c.soil_humidity_min,
        c.soil_humidity_max,
        c.air_humidity_min,
        c.air_humidity_max,
        c.temperature_max,
        d.device_name
      FROM irrigation_configs ic
      INNER JOIN crops c ON c.id = ic.crop_id
      INNER JOIN devices d ON d.user_id = ic.user_id AND d.id = $1
      WHERE ic.mode_type = 'automatic'
        AND d.is_active_communication = true
      LIMIT 1
    `
    
    const serviceConfigResult = await client.query(configQueryFromService, [device.id])
    console.log(`Configuraciones encontradas por el servicio: ${serviceConfigResult.rows.length}`)
    
    if (serviceConfigResult.rows.length === 0) {
      console.log('❌ EL SERVICIO NO ENCUENTRA LA CONFIGURACIÓN')
      console.log('🔍 Esto significa que hay un problema en la consulta del servicio.')
      return
    }
    
    const serviceConfig = serviceConfigResult.rows[0]
    console.log('✅ Configuración encontrada por el servicio:')
    console.log(`  - Config ID: ${serviceConfig.config_id}`)
    console.log(`  - Dispositivo: ${serviceConfig.device_name}`)
    
    // PASO 4: Verificar estado actual de la bomba
    console.log(`\n🚰 PASO 4: Verificando estado actual de la bomba...`)
    const pumpQuery = `
      SELECT id, status, started_at 
      FROM pump_activations 
      WHERE irrigation_config_id = $1 
        AND status IN ('active', 'paused')
      ORDER BY started_at DESC 
      LIMIT 1
    `
    const pumpResult = await client.query(pumpQuery, [serviceConfig.config_id])
    console.log(`Bombas activas/pausadas: ${pumpResult.rows.length}`)
    
    const activePump = pumpResult.rows[0]
    if (activePump) {
      console.log(`🚰 Hay bomba activa: ${activePump.status} desde ${activePump.started_at}`)
    } else {
      console.log('✅ No hay bomba activa - OK para activar nueva')
    }
    
    // PASO 5: Evaluar condiciones manualmente
    console.log(`\n🧪 PASO 5: Evaluando condiciones con datos de prueba...`)
    const testData = {
      temperature: 36.5,
      air_humidity: 35.0,
      soil_humidity: 25.0
    }
    
    console.log('Datos de prueba:', testData)
    console.log('Umbrales del cultivo:')
    console.log(`  - Temp max: ${serviceConfig.temperature_max}`)
    console.log(`  - Suelo min: ${serviceConfig.soil_humidity_min}`)
    console.log(`  - Aire min: ${serviceConfig.air_humidity_min}`)
    
    const temperatureHigh = testData.temperature > serviceConfig.temperature_max
    const soilHumidityLow = testData.soil_humidity < serviceConfig.soil_humidity_min
    const airHumidityLow = testData.air_humidity < serviceConfig.air_humidity_min
    
    console.log('\n🔍 Evaluación de condiciones:')
    console.log(`  - Temperatura alta: ${testData.temperature} > ${serviceConfig.temperature_max} = ${temperatureHigh}`)
    console.log(`  - Suelo bajo: ${testData.soil_humidity} < ${serviceConfig.soil_humidity_min} = ${soilHumidityLow}`)
    console.log(`  - Aire bajo: ${testData.air_humidity} < ${serviceConfig.air_humidity_min} = ${airHumidityLow}`)
    
    const shouldActivate = temperatureHigh || soilHumidityLow || airHumidityLow
    console.log(`\n🤖 ¿Debería activarse? ${shouldActivate}`)
    console.log(`   Lógica: ${temperatureHigh} || ${soilHumidityLow} || ${airHumidityLow} = ${shouldActivate}`)
    
    if (!shouldActivate) {
      console.log('❌ Las condiciones NO justifican activación. FIN.')
      return
    }
    
    if (activePump) {
      console.log('❌ Ya hay una bomba activa. FIN.')
      return
    }
    
    // PASO 6: Simular activación manual
    console.log(`\n🟢 PASO 6: Las condiciones SÍ justifican activación. Activando manualmente...`)
    
    await client.query('BEGIN')
    
    try {
      // Marcar configuración como activa
      console.log('Marcando configuración como activa...')
      await client.query(
        `UPDATE irrigation_configs SET is_active = true WHERE id = $1`,
        [serviceConfig.config_id]
      )
      
      // Crear pump_activation
      console.log('Creando pump_activation...')
      const insertPumpResult = await client.query(`
        INSERT INTO pump_activations (irrigation_config_id, started_at, status, duration_minutes)
        VALUES ($1, NOW(), 'active', NULL)
        RETURNING *
      `, [serviceConfig.config_id])
      
      console.log('✅ Pump activation creada:', insertPumpResult.rows[0])
      
      await client.query('COMMIT')
      console.log('✅ Transacción confirmada')
      
      // Verificar resultado
      console.log('\n📊 VERIFICANDO RESULTADO FINAL...')
      const finalConfig = await client.query('SELECT is_active FROM irrigation_configs WHERE id = $1', [serviceConfig.config_id])
      console.log(`is_active final: ${finalConfig.rows[0]?.is_active}`)
      
      const finalPump = await client.query(`
        SELECT * FROM pump_activations 
        WHERE irrigation_config_id = $1 
        ORDER BY created_at DESC LIMIT 1
      `, [serviceConfig.config_id])
      
      if (finalPump.rows.length > 0) {
        console.log('✅ Activación de bomba confirmada:', finalPump.rows[0])
      }
      
    } catch (error) {
      await client.query('ROLLBACK')
      console.error('❌ Error en activación:', error)
    }
    
  } catch (error) {
    console.error('❌ ERROR GENERAL:', error.message)
    console.error('Stack:', error.stack)
  } finally {
    client.release()
    process.exit(0)
  }
}

debug()
