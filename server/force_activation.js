import { pool } from './config/db.js'

const forceActivation = async () => {
  const client = await pool.connect()
  
  try {
    console.log('🚀 FORZANDO ACTIVACIÓN DE RIEGO AUTOMÁTICO')
    console.log('=' .repeat(50))
    
    // 1. Buscar configuración automática
    const configQuery = `
      SELECT 
        ic.id as config_id,
        ic.user_id,
        ic.crop_id,
        ic.is_active,
        c.name as crop_name
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
    console.log('✅ Configuración encontrada:')
    console.log(`   Config ID: ${config.config_id}`)
    console.log(`   Usuario: ${config.user_id}`)
    console.log(`   Cultivo: ${config.crop_name}`)
    console.log(`   is_active ANTES: ${config.is_active}`)
    
    // 2. Forzar activación
    console.log('\n🟢 FORZANDO ACTIVACIÓN...')
    
    await client.query('BEGIN')
    
    try {
      // STEP 1: Cambiar is_active a true
      console.log('STEP 1: Cambiando is_active a true...')
      const updateResult = await client.query(
        `UPDATE irrigation_configs SET is_active = true, updated_at = NOW() WHERE id = $1 RETURNING *`,
        [config.config_id]
      )
      console.log('✅ UPDATE ejecutado:', updateResult.rows[0])
      
      // STEP 2: Crear pump_activation
      console.log('STEP 2: Creando pump_activation...')
      const pumpResult = await client.query(`
        INSERT INTO pump_activations (irrigation_config_id, started_at, status, duration_minutes)
        VALUES ($1, NOW(), 'active', NULL)
        RETURNING *
      `, [config.config_id])
      console.log('✅ Pump activation creada:', pumpResult.rows[0])
      
      await client.query('COMMIT')
      console.log('✅ TRANSACCIÓN CONFIRMADA')
      
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    }
    
    // 3. Verificar resultado
    console.log('\n📊 VERIFICANDO RESULTADO...')
    const finalResult = await client.query(
      'SELECT is_active, updated_at FROM irrigation_configs WHERE id = $1',
      [config.config_id]
    )
    
    console.log('✅ Estado final:')
    console.log(`   is_active DESPUÉS: ${finalResult.rows[0]?.is_active}`)
    console.log(`   updated_at: ${finalResult.rows[0]?.updated_at}`)
    
    // 4. Verificar pump_activations
    const pumpCheck = await client.query(`
      SELECT * FROM pump_activations 
      WHERE irrigation_config_id = $1 
      ORDER BY created_at DESC 
      LIMIT 1
    `, [config.config_id])
    
    if (pumpCheck.rows.length > 0) {
      console.log('✅ Pump activation confirmada:', pumpCheck.rows[0])
    } else {
      console.log('❌ NO se encontró pump activation')
    }
    
    console.log('\n🎉 ACTIVACIÓN FORZADA COMPLETADA')
    
  } catch (error) {
    console.error('❌ ERROR:', error.message)
    console.error('Stack:', error.stack)
  } finally {
    client.release()
    process.exit(0)
  }
}

forceActivation()
