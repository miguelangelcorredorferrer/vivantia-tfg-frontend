import { pool } from './config/db.js'
import { evaluateAutomaticIrrigation } from './services/automaticIrrigationService.js'

/**
 * Función simple para evaluar la última lectura cuando se inserta manualmente
 */
const evaluateLatestSensorReading = async () => {
  const client = await pool.connect()
  
  try {
    console.log('🤖 EVALUANDO ÚLTIMA LECTURA DE SENSORES...')
    
    // 1. Obtener la última lectura insertada
    const latestReadingQuery = `
      SELECT 
        sr.*,
        d.user_id,
        d.device_name,
        d.is_active_communication
      FROM sensor_readings sr
      INNER JOIN devices d ON d.id = sr.device_id
      WHERE d.is_active_communication = true
      ORDER BY sr.received_at DESC
      LIMIT 1
    `
    
    const readingResult = await client.query(latestReadingQuery)
    
    if (readingResult.rows.length === 0) {
      console.log('❌ No hay lecturas recientes en dispositivos activos')
      return
    }
    
    const reading = readingResult.rows[0]
    console.log('📊 Última lectura encontrada:')
    console.log(`   Dispositivo: ${reading.device_name} (ID: ${reading.device_id})`)
    console.log(`   Temperatura: ${reading.temperature}°C`)
    console.log(`   Humedad aire: ${reading.air_humidity}%`)
    console.log(`   Humedad suelo: ${reading.soil_humidity}%`)
    console.log(`   Recibida: ${reading.received_at}`)
    
    // 2. Verificar si hay configuración automática para este dispositivo
    const configQuery = `
      SELECT ic.id as config_id, ic.user_id, c.name as crop_name
      FROM irrigation_configs ic
      INNER JOIN crops c ON c.id = ic.crop_id
      INNER JOIN devices d ON d.user_id = ic.user_id AND d.id = $1
      WHERE ic.mode_type = 'automatic'
        AND d.is_active_communication = true
      LIMIT 1
    `
    
    const configResult = await client.query(configQuery, [reading.device_id])
    
    if (configResult.rows.length === 0) {
      console.log('ℹ️ No hay configuración automática para este dispositivo')
      return
    }
    
    const config = configResult.rows[0]
    console.log(`✅ Configuración automática encontrada para cultivo: ${config.crop_name}`)
    
    // 3. Evaluar automáticamente
    console.log('🔄 Ejecutando evaluación automática...')
    await evaluateAutomaticIrrigation(reading.device_id, {
      temperature: parseFloat(reading.temperature),
      air_humidity: parseFloat(reading.air_humidity), 
      soil_humidity: parseFloat(reading.soil_humidity),
      device_id: reading.device_id,
      timestamp: reading.received_at
    })
    
    console.log('✅ Evaluación completada')
    
  } catch (error) {
    console.error('❌ Error en evaluación:', error.message)
  } finally {
    client.release()
  }
}

// Si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  evaluateLatestSensorReading().then(() => {
    console.log('🏁 Evaluación finalizada')
    process.exit(0)
  })
}

export { evaluateLatestSensorReading }
