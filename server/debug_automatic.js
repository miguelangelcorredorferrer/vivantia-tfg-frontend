import { pool } from './config/db.js'
import { evaluateAutomaticIrrigation } from './services/automaticIrrigationService.js'

console.log('🔍 INICIANDO DEBUG...')

const debug = async () => {
  let client
  try {
    client = await pool.connect()
    console.log('✅ Conexión a BD establecida')
    
    // 1. Verificar dispositivos activos
    console.log('\n📱 Dispositivos activos:')
    const devicesResult = await client.query(`
      SELECT id, device_name, user_id, is_active_communication 
      FROM devices 
      WHERE is_active_communication = true
    `)
    console.log('Dispositivos encontrados:', devicesResult.rows.length)
    devicesResult.rows.forEach(d => {
      console.log(`  - ID: ${d.id}, Nombre: ${d.device_name}, Usuario: ${d.user_id}`)
    })
    
    // 2. Verificar configuraciones automáticas
    console.log('\n🤖 Configuraciones automáticas:')
    const configResult = await client.query(`
      SELECT ic.*, c.name as crop_name, c.temperature_max, c.soil_humidity_min, c.air_humidity_min
      FROM irrigation_configs ic
      INNER JOIN crops c ON c.id = ic.crop_id
      WHERE ic.mode_type = 'automatic'
    `)
    console.log('Configs encontradas:', configResult.rows.length)
    configResult.rows.forEach(c => {
      console.log(`  - Config ID: ${c.id}, Usuario: ${c.user_id}, Cultivo: ${c.crop_name}, is_active: ${c.is_active}`)
      console.log(`    Umbrales: temp_max=${c.temperature_max}, soil_min=${c.soil_humidity_min}, air_min=${c.air_humidity_min}`)
    })
    
    // 3. Si hay dispositivo y config, hacer prueba
    if (devicesResult.rows.length > 0 && configResult.rows.length > 0) {
      const device = devicesResult.rows[0]
      const config = configResult.rows[0]
      
      console.log(`\n🧪 Haciendo prueba con dispositivo ${device.id}...`)
      
      // Insertar lectura de prueba
      const insertResult = await client.query(`
        INSERT INTO sensor_readings (device_id, air_humidity, soil_humidity, temperature)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `, [device.id, 35.0, 25.0, 36.5])
      
      console.log('✅ Lectura insertada:', insertResult.rows[0])
      
      // Llamar evaluación
      console.log('\n🤖 Llamando evaluateAutomaticIrrigation...')
      await evaluateAutomaticIrrigation(device.id, {
        temperature: 36.5,
        air_humidity: 35.0,
        soil_humidity: 25.0,
        device_id: device.id
      })
      
      // Verificar resultado
      console.log('\n📊 Verificando resultado...')
      const configAfter = await client.query('SELECT is_active FROM irrigation_configs WHERE id = $1', [config.id])
      console.log('is_active después:', configAfter.rows[0]?.is_active)
      
      const pumps = await client.query(`
        SELECT * FROM pump_activations 
        WHERE irrigation_config_id = $1 
        ORDER BY created_at DESC LIMIT 1
      `, [config.id])
      console.log('Activaciones de bomba:', pumps.rows.length)
      if (pumps.rows.length > 0) {
        console.log('Última activación:', pumps.rows[0])
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.error('Stack:', error.stack)
  } finally {
    if (client) client.release()
    process.exit(0)
  }
}

debug()
