import { pool } from '../config/db.js';
import { sendDownlinkForConfig } from './ttnService.js';

import {
  createCropThresholdAlert,
  createAutomaticIrrigationStartedAlert,
  createAutomaticIrrigationStoppedAlert,
  createAutomaticConfigSavedAlert,
  createAutomaticConfigCancelledAlert,
  createAutomaticActivatedTemperatureAlert,
  createAutomaticActivatedSoilHumidityAlert,
  createAutomaticActivatedAirHumidityAlert,
  createAutomaticDeactivatedOptimalAlert,
  createAutomaticDeactivatedSoilOptimalAlert,
  createIrrigationStartedAlert,
  createIrrigationEndedAlert
} from './irrigationAlertService.js';

/**
 * Evalúa si debe activar o desactivar el riego automático basado en datos de sensores
 * Se ejecuta cada vez que llegan nuevos datos del TTN webhook
 */
// Mapa para evitar evaluaciones múltiples simultáneas por dispositivo
const evaluationLocks = new Map();

const evaluateAutomaticIrrigation = async (deviceId, sensorData) => {
  // Prevenir evaluaciones múltiples simultáneas para el mismo dispositivo
  const lockKey = `device_${deviceId}`;
  if (evaluationLocks.has(lockKey)) {
    console.log('⏸️ [AUTO] Evaluación ya en progreso para dispositivo:', deviceId);
    return;
  }
  
  evaluationLocks.set(lockKey, true);
  
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
      
      // Verificar que no hay otra bomba activa para esta configuración (protección extra)
      const doubleCheckQuery = `
        SELECT id FROM pump_activations 
        WHERE irrigation_config_id = $1 AND status IN ('active', 'paused')
        LIMIT 1
      `;
      const doubleCheck = await client.query(doubleCheckQuery, [config.config_id]);
      
      if (doubleCheck.rows.length > 0) {
        console.log('⚠️ [AUTO] Ya hay una bomba activa para esta configuración - evitando duplicado');
        await client.query('COMMIT');
        return;
      }
      
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
      
      // Enviar comando ON para activar la bomba
      try {
        console.log(`🚀 [AUTO] ENVIANDO COMANDO ON para config ${config.config_id}, usuario ${config.user_id}, cultivo ${config.crop_name}`);
        await sendDownlinkForConfig(config.config_id, 'ON');
        console.log('✅ [AUTO] Comando ON enviado exitosamente desde backend');
      } catch (downlinkError) {
        console.error('❌ [AUTO] Error enviando comando ON:', downlinkError);
      }
      
      // Crear alertas específicas según la condición que se cumplió
      const { temperature, soil_humidity, air_humidity } = sensorData;
      const temperatureHigh = temperature > config.temperature_max;
      const soilHumidityLow = soil_humidity <= config.soil_humidity_min;
      const airHumidityLow = air_humidity < config.air_humidity_min;
      
      // Crear alerta general de riego iniciado
      await createIrrigationStartedAlert(
        config.user_id, 
        config.crop_name, 
        'automático',
        `Temp: ${temperature}°C, Hum.Suelo: ${soil_humidity}%, Hum.Aire: ${air_humidity}%`
      );
      
      // Crear alertas específicas por cada umbral que se cumplió
      if (temperatureHigh) {
        await createAutomaticActivatedTemperatureAlert(
          config.user_id, config.crop_name, temperature, config.temperature_max
        );
      }
      
      if (soilHumidityLow) {
        await createAutomaticActivatedSoilHumidityAlert(
          config.user_id, config.crop_name, soil_humidity, config.soil_humidity_min
        );
      }
      
      if (airHumidityLow) {
        await createAutomaticActivatedAirHumidityAlert(
          config.user_id, config.crop_name, air_humidity, config.air_humidity_min
        );
      }
      
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
      
      // Crear alertas de desactivación
      const { temperature, soil_humidity, air_humidity } = sensorData;
      
      // Alerta general de riego finalizado
      await createIrrigationEndedAlert(
        config.user_id,
        config.crop_name,
        'automático',
        Math.round((new Date() - new Date(activePump.started_at)) / 60000) // duración en minutos
      );
      
      // Alerta específica de desactivación por condiciones óptimas
      await createAutomaticDeactivatedOptimalAlert(
        config.user_id,
        config.crop_name,
        `Temp: ${temperature}°C, Hum.Suelo: ${soil_humidity}%, Hum.Aire: ${air_humidity}%`
      );
      
      // Actualizar última fecha de riego
      await client.query(
        'UPDATE irrigation_configs SET last_irrigation_at = NOW() WHERE id = $1',
        [config.config_id]
      );
      
      // Cancelar configuración automática para desbloquear otros modos
      try {
        // Eliminar automatic_settings (mantener irrigation_configs para historial)
        await client.query(`DELETE FROM automatic_settings WHERE config_id = $1`, [config.config_id]);
        
        // Desactivar irrigation_config
        await client.query(`UPDATE irrigation_configs SET is_active = false WHERE id = $1`, [config.config_id]);
        
        console.log('🗑️ [AUTO] Configuración automática cancelada - otros modos desbloqueados');
        
        // Crear alerta de configuración cancelada
        await createAutomaticConfigCancelledAlert(config.user_id, config.crop_name);
        
      } catch (cancelError) {
        console.error('❌ [AUTO] Error cancelando configuración automática:', cancelError);
      }
    }

    await client.query('COMMIT');
    console.log('✅ [AUTO] Evaluación automática completada');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ [AUTO] Error en evaluación automática:', error);
    throw error;
  } finally {
    client.release();
    // Liberar el lock para permitir futuras evaluaciones
    evaluationLocks.delete(lockKey);
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
  
  // Condiciones para desactivar riego (misma lógica que frontend):
  // 1. Temperatura OK (no supera el máximo)
  const temperatureOk = temperature <= config.temperature_max;
  
  // 2. Humedad del suelo en rango óptimo
  const soilHumidityOk = soil_humidity >= config.soil_humidity_min && 
                         soil_humidity <= config.soil_humidity_max;
  
  // 3. Humedad del aire OK (supera el mínimo)
  const airHumidityOk = air_humidity >= config.air_humidity_min;
  
  console.log('🔍 [AUTO] Condiciones de desactivación:', {
    temperatureOk: `${temperature}°C <= ${config.temperature_max}°C = ${temperatureOk}`,
    soilHumidityOk: `${soil_humidity}% (${config.soil_humidity_min}%-${config.soil_humidity_max}%) = ${soilHumidityOk}`,
    airHumidityOk: `${air_humidity}% >= ${config.air_humidity_min}% = ${airHumidityOk}`
  });
  
  // Desactivar cuando TODAS las condiciones están OK (igual que frontend)
  const shouldDeactivate = temperatureOk && soilHumidityOk && airHumidityOk;
  console.log(`🎯 [AUTO] shouldDeactivate = ${shouldDeactivate}`);
  
  return shouldDeactivate;
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
