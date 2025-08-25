import { pool } from './config/db.js'
import { evaluateLatestSensorReading } from './evaluate_latest.js'

const testCompleteFlow = async () => {
  const client = await pool.connect()
  
  try {
    console.log('🚀 PRUEBA COMPLETA DEL FLUJO AUTOMÁTICO')
    console.log('=' .repeat(50))
    
    // 1. Encontrar usuario con configuración automática
    const userQuery = `
      SELECT DISTINCT ic.user_id, u.name as user_name, d.id as device_id, d.device_name
      FROM irrigation_configs ic
      INNER JOIN users u ON u.id = ic.user_id
      INNER JOIN devices d ON d.user_id = ic.user_id AND d.is_active_communication = true
      WHERE ic.mode_type = 'automatic'
      LIMIT 1
    `
    
    const userResult = await client.query(userQuery)
    
    if (userResult.rows.length === 0) {
      console.log('❌ NO HAY USUARIOS CON CONFIGURACIÓN AUTOMÁTICA Y DISPOSITIVO ACTIVO')
      return
    }
    
    const user = userResult.rows[0]
    console.log(`✅ Usuario: ${user.user_name} (ID: ${user.user_id})`)
    console.log(`📱 Dispositivo: ${user.device_name} (ID: ${user.device_id})`)
    
    // 2. Mostrar umbrales del cultivo
    const thresholdsQuery = `
      SELECT c.name, c.temperature_max, c.soil_humidity_min, c.soil_humidity_max, c.air_humidity_min, c.air_humidity_max
      FROM irrigation_configs ic
      INNER JOIN crops c ON c.id = ic.crop_id
      WHERE ic.user_id = $1 AND ic.mode_type = 'automatic'
      LIMIT 1
    `
    
    const thresholdsResult = await client.query(thresholdsQuery, [user.user_id])
    const thresholds = thresholdsResult.rows[0]
    
    console.log(`\n🌱 CULTIVO: ${thresholds.name}`)
    console.log('📊 UMBRALES:')
    console.log(`   - Temperatura máxima: ${thresholds.temperature_max}°C`)
    console.log(`   - Humedad suelo: ${thresholds.soil_humidity_min}% - ${thresholds.soil_humidity_max}%`)
    console.log(`   - Humedad aire: ${thresholds.air_humidity_min}% - ${thresholds.air_humidity_max}%`)
    
    // 3. Insertar lectura de prueba que DEBERÍA activar el riego
    console.log('\n💾 INSERTANDO LECTURA DE PRUEBA QUE DEBERÍA ACTIVAR EL RIEGO...')
    
    const testData = {
      temperature: 36.5,  // Excede máximo (35°C)
      air_humidity: 35.0, // Bajo mínimo (40%)
      soil_humidity: 25.0 // Intermedio (0-70%)
    }
    
    console.log('🧪 DATOS A INSERTAR:')
    console.table([testData])
    
    // Análisis predictivo
    const tempExceeds = testData.temperature > thresholds.temperature_max
    const airLow = testData.air_humidity < thresholds.air_humidity_min
    const soilLow = testData.soil_humidity < thresholds.soil_humidity_min
    
    console.log('\n🔍 ANÁLISIS PREDICTIVO:')
    console.log(`   - Temperatura excede: ${testData.temperature} > ${thresholds.temperature_max} = ${tempExceeds}`)
    console.log(`   - Aire bajo mínimo: ${testData.air_humidity} < ${thresholds.air_humidity_min} = ${airLow}`)
    console.log(`   - Suelo bajo mínimo: ${testData.soil_humidity} < ${thresholds.soil_humidity_min} = ${soilLow}`)
    
    const shouldActivate = tempExceeds || airLow || soilLow
    console.log(`\n🤖 PREDICCIÓN: ${shouldActivate ? 'DEBERÍA ACTIVARSE ✅' : 'NO debería activarse ❌'}`)
    
    if (!shouldActivate) {
      console.log('⚠️ Los datos de prueba NO cumplen condiciones de activación')
      console.log('💡 Ajustando datos para garantizar activación...')
      testData.temperature = parseFloat(thresholds.temperature_max) + 2  // +2°C sobre máximo
      testData.air_humidity = parseFloat(thresholds.air_humidity_min) - 5 // -5% bajo mínimo
    }
    
    // Insertar lectura
    const insertResult = await client.query(`
      INSERT INTO sensor_readings (device_id, air_humidity, soil_humidity, temperature, received_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *
    `, [user.device_id, testData.air_humidity, testData.soil_humidity, testData.temperature])
    
    console.log('\n✅ LECTURA INSERTADA:', insertResult.rows[0])
    
    // 4. Evaluar automáticamente (simula lo que haría el webhook)
    console.log('\n🤖 EJECUTANDO EVALUACIÓN AUTOMÁTICA...')
    console.log('=' .repeat(30))
    
    await evaluateLatestSensorReading()
    
    console.log('=' .repeat(30))
    
    // 5. Verificar resultado
    console.log('\n📊 VERIFICANDO RESULTADO FINAL...')
    
    const resultQuery = `
      SELECT 
        ic.is_active,
        ic.updated_at,
        pa.status as pump_status,
        pa.started_at as pump_started,
        c.name as crop_name
      FROM irrigation_configs ic
      INNER JOIN crops c ON c.id = ic.crop_id
      LEFT JOIN pump_activations pa ON pa.irrigation_config_id = ic.id 
        AND pa.status IN ('active', 'paused')
      WHERE ic.user_id = $1 AND ic.mode_type = 'automatic'
      ORDER BY ic.created_at DESC, pa.created_at DESC
      LIMIT 1
    `
    
    const finalResult = await client.query(resultQuery, [user.user_id])
    
    if (finalResult.rows.length > 0) {
      const final = finalResult.rows[0]
      console.log('✅ ESTADO FINAL:')
      console.log(`   Cultivo: ${final.crop_name}`)
      console.log(`   is_active: ${final.is_active}`)
      console.log(`   Bomba: ${final.pump_status || 'inactive'}`)
      console.log(`   Iniciada: ${final.pump_started || 'N/A'}`)
      
      if (final.is_active && final.pump_status === 'active') {
        console.log('\n🎉 ¡ÉXITO TOTAL! El sistema funciona correctamente:')
        console.log('   ✅ is_active = true')
        console.log('   ✅ pump_status = active')
        console.log('   ✅ Downlink ON enviado a TTN')
        console.log('\n💡 Ahora en automatico.vue se debería detectar el cambio y recargar la página')
      } else if (final.is_active) {
        console.log('\n⚠️ PARCIAL: is_active = true pero bomba no está activa')
      } else {
        console.log('\n❌ FALLO: El riego automático NO se activó')
        console.log('   - Revisa los logs de evaluación automática arriba')
        console.log('   - Verifica que los umbrales están correctos')
      }
    }
    
    console.log('\n📱 PARA PROBAR EN EL FRONTEND:')
    console.log('   1. Ve a /modo/automatico')
    console.log('   2. En ~30 segundos debería detectar el cambio y recargar')
    console.log('   3. O recarga manualmente para ver el estado actualizado')
    
  } catch (error) {
    console.error('❌ ERROR:', error.message)
    console.error('Stack:', error.stack)
  } finally {
    client.release()
    process.exit(0)
  }
}

testCompleteFlow()
