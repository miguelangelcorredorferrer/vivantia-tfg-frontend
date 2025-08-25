import { pool } from '../config/db.js';
import { sendDownlinkForConfig } from './ttnService.js';

import {
  createCropThresholdAlert,
  createAutomaticIrrigationStartedAlert,
  createAutomaticIrrigationStoppedAlert,
  createAutomaticConfigSavedAlert,
  createAutomaticConfigCancelledAlert
} from './irrigationAlertService.js';

/**
 * Evalúa si debe activar o desactivar el riego automático basado en datos de sensores
 * Se ejecuta cada vez que llegan nuevos datos del TTN webhook
 */
const evaluateAutomaticIrrigation = async (deviceId, sensorData) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    console.log('🤖 [AUTO] Iniciando evaluación automática para dispositivo:', deviceId);
    console.log('📊 [AUTO] Datos de sensores:', sensorData);

    // 1. Buscar configuración automática activa para este dispositivo
    const configQuery = `
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
    `;
    
    const configResult = await client.query(configQuery, [deviceId]);
    
    if (configResult.rows.length === 0) {
      console.log('ℹ️ [AUTO] No hay configuración automática activa para este dispositivo');
      await client.query('COMMIT');
      return;
    }
    
    const config = configResult.rows[0];
    console.log('✅ [AUTO] Configuración automática encontrada:', config);

    // 2. Verificar estado actual de la bomba
    const pumpQuery = `
      SELECT id, status, started_at 
      FROM pump_activations 
      WHERE irrigation_config_id = $1 
        AND status IN ('active', 'paused')
      ORDER BY started_at DESC 
      LIMIT 1
    `;
    const pumpResult = await client.query(pumpQuery, [config.config_id]);
    const activePump = pumpResult.rows[0];
    
    console.log('🚰 [AUTO] Estado actual de la bomba:', activePump?.status || 'inactiva');

    // 3. Evaluar condiciones para activar/desactivar
    const shouldActivate = evaluateActivationConditions(sensorData, config);
    const shouldDeactivate = evaluateDeactivationConditions(sensorData, config);
    
    console.log('🔍 [AUTO] Evaluación de condiciones:', { shouldActivate, shouldDeactivate });

    if (!activePump && shouldActivate) {
      // 🟢 ACTIVAR RIEGO
      console.log('🟢 [AUTO] Activando riego automático');
      
      // Marcar la configuración como activa
      await client.query(
        `UPDATE irrigation_configs SET is_active = true WHERE id = $1`,
        [config.config_id]
      );
      console.log('✅ [AUTO] Configuración marcada como activa');
      
      // Crear pump_activation (sin duration_minutes para modo automático)
      const insertPumpQuery = `
        INSERT INTO pump_activations (irrigation_config_id, started_at, status, duration_minutes)
        VALUES ($1, NOW(), 'active', NULL)
        RETURNING id
      `;
      const pumpActivationResult = await client.query(insertPumpQuery, [config.config_id]);
      
      // NOTA: El comando ON se envía desde el frontend (toggleAutomaticPump)
      // para evitar comandos duplicados. No enviar desde aquí.
      console.log('ℹ️ [AUTO] Comando ON será enviado por el frontend');
      
      // Crear alerta
      await createAutomaticIrrigationStartedAlert(
        config.user_id, 
        config.crop_name,
        `Temp: ${sensorData.temperature}°C, Hum.Suelo: ${sensorData.soil_humidity}%`
      );
      
    } else if (activePump && activePump.status === 'active' && shouldDeactivate) {
      // 🔴 DESACTIVAR RIEGO
      console.log('🔴 [AUTO] Desactivando riego automático');
      
      // Completar pump_activation
      const updatePumpQuery = `
        UPDATE pump_activations 
        SET status = 'completed', ended_at = NOW()
        WHERE id = $1
      `;
      await client.query(updatePumpQuery, [activePump.id]);
      
      // Enviar comando OFF
      try {
        await sendDownlinkForConfig(config.config_id, 'OFF');
        console.log('✅ [AUTO] Comando OFF enviado exitosamente');
      } catch (downlinkError) {
        console.error('❌ [AUTO] Error enviando comando OFF:', downlinkError);
      }
      
      // Crear alerta
      await createAutomaticIrrigationStoppedAlert(
        config.user_id,
        config.crop_name,
        `Humedad objetivo alcanzada: ${sensorData.soil_humidity}%`
      );
      
      // Actualizar última fecha de riego
      await client.query(
        'UPDATE irrigation_configs SET last_irrigation_at = NOW() WHERE id = $1',
        [config.config_id]
      );
    }

    await client.query('COMMIT');
    console.log('✅ [AUTO] Evaluación automática completada');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ [AUTO] Error en evaluación automática:', error);
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Evalúa si debe activarse el riego basado en condiciones de sensores
 */
const evaluateActivationConditions = (sensorData, config) => {
  const { temperature, soil_humidity, air_humidity } = sensorData;
  
  // Condiciones para activar riego:
  // 1. Temperatura supera el máximo
  const temperatureHigh = temperature > config.temperature_max;
  
  // 2. Humedad del suelo está por debajo o igual al mínimo (CRUCIAL para activar cuando suelo = 0 y min = 0)
  const soilHumidityLow = soil_humidity <= config.soil_humidity_min;
  
  // 3. Humedad del aire está por debajo del mínimo (condición adicional)
  const airHumidityLow = air_humidity < config.air_humidity_min;
  
  console.log('🔍 [AUTO] Condiciones de activación:', {
    temperatureHigh: `${temperature}°C > ${config.temperature_max}°C = ${temperatureHigh}`,
    soilHumidityLow: `${soil_humidity}% <= ${config.soil_humidity_min}% = ${soilHumidityLow}`,
    airHumidityLow: `${air_humidity}% < ${config.air_humidity_min}% = ${airHumidityLow}`
  });
  
  // ✅ ACTIVAR si CUALQUIERA de estas condiciones se cumple (OR logic):
  // - Temperatura es muy alta
  // - Humedad del suelo es muy baja  
  // - Humedad del aire es muy baja
  const result = temperatureHigh || soilHumidityLow || airHumidityLow;
  console.log(`🔍 [AUTO] Resultado activación: ${temperatureHigh} || ${soilHumidityLow} || ${airHumidityLow} = ${result}`);
  return result;
};

/**
 * Evalúa si debe desactivarse el riego basado en condiciones de sensores
 */
const evaluateDeactivationConditions = (sensorData, config) => {
  const { temperature, soil_humidity, air_humidity } = sensorData;
  
  // Condiciones para desactivar riego:
  // 1. Humedad del suelo alcanza el máximo (condición principal)
  const soilHumidityOptimal = soil_humidity >= config.soil_humidity_max;
  
  // 2. Temperatura vuelve a nivel aceptable (opcional)
  const temperatureNormal = temperature <= config.temperature_max;
  
  console.log('🔍 [AUTO] Condiciones de desactivación:', {
    soilHumidityOptimal: `${soil_humidity}% >= ${config.soil_humidity_max}% = ${soilHumidityOptimal}`,
    temperatureNormal: `${temperature}°C <= ${config.temperature_max}°C = ${temperatureNormal}`
  });
  
  // Desactivar principalmente cuando la humedad del suelo es óptima
  return soilHumidityOptimal;
};

/**
 * Obtiene el estado actual de configuraciones automáticas para un usuario
 */
const getAutomaticIrrigationStatus = async (userId) => {
  try {
    console.log('🔎 [AUTO] Iniciando getAutomaticIrrigationStatus para userId:', userId);

    const query = `
      SELECT
        ic.id as config_id,
        ic.mode_type,
        ic.is_active,
        c.name as crop_name,
        c.soil_humidity_min,
        c.soil_humidity_max,
        c.air_humidity_min,
        c.air_humidity_max,
        c.temperature_max,
        d.device_name,
        pa.id as pump_activation_id,
        pa.status as pump_status,
        pa.started_at
      FROM irrigation_configs ic
      INNER JOIN crops c ON c.id = ic.crop_id
      LEFT JOIN devices d ON d.user_id = ic.user_id AND d.is_active_communication = true
      LEFT JOIN pump_activations pa ON pa.irrigation_config_id = ic.id AND pa.status IN ('active', 'paused')
      WHERE ic.user_id = $1
        AND ic.mode_type = 'automatic'
      ORDER BY ic.created_at DESC
      LIMIT 1
    `;

    console.log('📝 [AUTO] Ejecutando query con userId:', userId);
    const result = await pool.query(query, [userId]);
    console.log('✅ [AUTO] Query ejecutada, resultados:', result.rows.length);
    console.log('📊 [AUTO] Datos obtenidos:', result.rows[0]);

    return result.rows[0] || null;
  } catch (error) {
    console.error('❌ [AUTO] Error obteniendo estado automático:', error);
    console.error('❌ [AUTO] SQL Error details:', error.detail);
    console.error('❌ [AUTO] SQL Error code:', error.code);
    throw error;
  }
};

export {
  evaluateAutomaticIrrigation,
  getAutomaticIrrigationStatus,
  evaluateActivationConditions,
  evaluateDeactivationConditions
};
