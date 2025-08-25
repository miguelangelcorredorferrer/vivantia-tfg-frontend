import { pool } from './config/db.js'

const testRealtimeEvaluation = async () => {
  const client = await pool.connect()
  
  try {
    console.log('🚀 PRUEBA DE EVALUACIÓN EN TIEMPO REAL')
    console.log('=' .repeat(50))
    
    // 1. Buscar usuario con configuración automática
    const userQuery = `
      SELECT DISTINCT ic.user_id, u.name as user_name
      FROM irrigation_configs ic
      INNER JOIN users u ON u.id = ic.user_id
      WHERE ic.mode_type = 'automatic'
      LIMIT 1
    `
    
    const userResult = await client.query(userQuery)
    
    if (userResult.rows.length === 0) {
      console.log('❌ NO HAY USUARIOS CON CONFIGURACIÓN AUTOMÁTICA')
      return
    }
    
    const user = userResult.rows[0]
    console.log(`✅ Usuario encontrado: ${user.user_name} (ID: ${user.user_id})`)
    
    // 2. Insertar una nueva lectura de prueba
    console.log('\n💾 INSERTANDO LECTURA DE PRUEBA...')
    
    // Buscar dispositivo del usuario
    const deviceQuery = `
      SELECT id, device_name 
      FROM devices 
      WHERE user_id = $1 AND is_active_communication = true
      LIMIT 1
    `
    const deviceResult = await client.query(deviceQuery, [user.user_id])
    
    if (deviceResult.rows.length === 0) {
      console.log('❌ NO HAY DISPOSITIVO ACTIVO PARA ESTE USUARIO')
      return
    }
    
    const device = deviceResult.rows[0]
    console.log(`📱 Dispositivo activo: ${device.device_name} (ID: ${device.id})`)
    
    // Insertar lectura que DEBERÍA activar el riego
    const testReading = {
      device_id: device.id,
      temperature: 36.5,    // Alta temperatura
      air_humidity: 35.0,   // Baja humedad aire  
      soil_humidity: 25.0   // Humedad suelo intermedia
    }
    
    console.log('🧪 Datos de prueba a insertar:', testReading)
    
    const insertResult = await client.query(`
      INSERT INTO sensor_readings (device_id, air_humidity, soil_humidity, temperature, received_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *
    `, [testReading.device_id, testReading.air_humidity, testReading.soil_humidity, testReading.temperature])
    
    console.log('✅ Lectura insertada:', insertResult.rows[0])
    
    // 3. Simular llamada al endpoint de evaluación
    console.log('\n🔄 SIMULANDO ENDPOINT /automatic/evaluate...')
    
    const { evaluateLatestReading } = await import('./controllers/automaticEvaluationController.js')
    
    // Simular request y response
    const mockReq = {
      params: { userId: user.user_id }
    }
    
    const mockRes = {
      json: (data) => {
        console.log('📤 RESPUESTA DEL ENDPOINT:')
        console.log(JSON.stringify(data, null, 2))
        return data
      },
      status: (code) => ({
        json: (data) => {
          console.log(`📤 RESPUESTA ${code}:`)
          console.log(JSON.stringify(data, null, 2))
          return data
        }
      })
    }
    
    // Llamar al endpoint
    await evaluateLatestReading(mockReq, mockRes)
    
    // 4. Verificar resultado final
    console.log('\n📊 VERIFICACIÓN FINAL...')
    const finalQuery = `
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
    
    const finalResult = await client.query(finalQuery, [user.user_id])
    
    if (finalResult.rows.length > 0) {
      const final = finalResult.rows[0]
      console.log('✅ ESTADO FINAL:')
      console.log(`   Cultivo: ${final.crop_name}`)
      console.log(`   is_active: ${final.is_active}`)
      console.log(`   Bomba: ${final.pump_status || 'inactive'}`)
      console.log(`   Bomba iniciada: ${final.pump_started || 'N/A'}`)
      
      if (final.is_active && final.pump_status === 'active') {
        console.log('\n🎉 ¡ÉXITO! El riego automático se activó correctamente')
      } else {
        console.log('\n❌ FALLO: El riego automático NO se activó')
        console.log('Verifica los umbrales del cultivo y las condiciones de activación')
      }
    }
    
  } catch (error) {
    console.error('❌ ERROR:', error.message)
    console.error('Stack:', error.stack)
  } finally {
    client.release()
    process.exit(0)
  }
}

testRealtimeEvaluation()
