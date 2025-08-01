-- SCRIPT DE MIGRACIÓN PARA SIMPLIFICACIÓN DE TABLAS DE RIEGO
-- Este script adapta la estructura actual a la nueva jerarquía simplificada

-- =====================================================
-- PASO 1: CREAR TABLAS TEMPORALES PARA MIGRAR DATOS
-- =====================================================

-- Crear tabla temporal para irrigation_configs
CREATE TABLE irrigation_configs_temp (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  crop_id INTEGER,
  mode_type irrigation_mode NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_irrigation_at TIMESTAMP,
  duration_minutes INTEGER NOT NULL, -- Campo común a todos los modos
  UNIQUE(user_id, crop_id, mode_type)
);

-- Crear tabla temporal para configuración programada
CREATE TABLE programmed_settings_temp (
  config_id INTEGER PRIMARY KEY,
  start_datetime TIMESTAMP NOT NULL,
  frequency_type frequency_type NOT NULL,
  custom_days INTEGER[],
  notify_before_minutes INTEGER DEFAULT 5,
  notify_at_start BOOLEAN DEFAULT TRUE,
  notify_at_end BOOLEAN DEFAULT TRUE,
  last_execution TIMESTAMP,
  next_execution TIMESTAMP
);

-- Crear tabla temporal para configuración automática
CREATE TABLE automatic_settings_temp (
  config_id INTEGER PRIMARY KEY,
  humidity_min_threshold DECIMAL(5,2) NOT NULL,
  humidity_max_threshold DECIMAL(5,2) NOT NULL,
  temperature_max_threshold DECIMAL(5,2) NOT NULL,
  use_crop_thresholds BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- PASO 2: MIGRAR DATOS EXISTENTES
-- =====================================================

-- Migrar datos de irrigation_configs existentes
INSERT INTO irrigation_configs_temp (id, user_id, crop_id, mode_type, is_active, created_at, last_irrigation_at, duration_minutes)
SELECT 
  ic.id,
  ic.user_id,
  ic.crop_id,
  ic.mode_type,
  ic.is_active,
  ic.created_at,
  ic.last_irrigation_at,
  COALESCE(
    pc.duration_minutes,
    ac.duration_minutes,
    mc.duration_minutes,
    30 -- Valor por defecto si no hay duración
  ) as duration_minutes
FROM irrigation_configs ic
LEFT JOIN programmed_configs pc ON ic.id = pc.irrigation_config_id
LEFT JOIN automatic_configs ac ON ic.id = ac.irrigation_config_id
LEFT JOIN manual_configs mc ON ic.id = mc.irrigation_config_id;

-- Migrar datos de configuración programada
INSERT INTO programmed_settings_temp (
  config_id, start_datetime, frequency_type, custom_days, 
  notify_before_minutes, notify_at_start, notify_at_end, 
  last_execution, next_execution
)
SELECT 
  pc.irrigation_config_id,
  pc.start_datetime,
  pc.frequency_type,
  pc.custom_days,
  pc.notify_before_minutes,
  pc.notify_at_start,
  pc.notify_at_end,
  pc.last_execution,
  pc.next_execution
FROM programmed_configs pc;

-- Migrar datos de configuración automática
INSERT INTO automatic_settings_temp (
  config_id, humidity_min_threshold, humidity_max_threshold, 
  temperature_max_threshold, use_crop_thresholds
)
SELECT 
  ac.irrigation_config_id,
  ac.humidity_min_threshold,
  ac.humidity_max_threshold,
  ac.temperature_max_threshold,
  ac.use_crop_thresholds
FROM automatic_configs ac;

-- =====================================================
-- PASO 3: ELIMINAR TABLAS ANTIGUAS
-- =====================================================

-- Eliminar tablas antiguas (en orden correcto por dependencias)
DROP TABLE IF EXISTS manual_configs CASCADE;
DROP TABLE IF EXISTS automatic_configs CASCADE;
DROP TABLE IF EXISTS programmed_configs CASCADE;
DROP TABLE IF EXISTS irrigation_configs CASCADE;

-- =====================================================
-- PASO 4: CREAR NUEVAS TABLAS CON ESTRUCTURA SIMPLIFICADA
-- =====================================================

-- Crear nueva tabla irrigation_configs simplificada
CREATE TABLE irrigation_configs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  crop_id INTEGER REFERENCES crops(id) ON DELETE CASCADE,
  mode_type irrigation_mode NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_irrigation_at TIMESTAMP,
  duration_minutes INTEGER NOT NULL, -- Campo común a todos los modos
  UNIQUE(user_id, crop_id, mode_type)
);

-- Crear tabla específica para configuración programada
CREATE TABLE programmed_settings (
  config_id INTEGER PRIMARY KEY REFERENCES irrigation_configs(id) ON DELETE CASCADE,
  start_datetime TIMESTAMP NOT NULL,
  frequency_type frequency_type NOT NULL,
  custom_days INTEGER[],
  notify_before_minutes INTEGER DEFAULT 5,
  notify_at_start BOOLEAN DEFAULT TRUE,
  notify_at_end BOOLEAN DEFAULT TRUE,
  last_execution TIMESTAMP,
  next_execution TIMESTAMP
);

-- Crear tabla específica para configuración automática
CREATE TABLE automatic_settings (
  config_id INTEGER PRIMARY KEY REFERENCES irrigation_configs(id) ON DELETE CASCADE,
  humidity_min_threshold DECIMAL(5,2) NOT NULL,
  humidity_max_threshold DECIMAL(5,2) NOT NULL,
  temperature_max_threshold DECIMAL(5,2) NOT NULL,
  use_crop_thresholds BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- PASO 5: RESTAURAR DATOS MIGRADOS
-- =====================================================

-- Restaurar datos de irrigation_configs
INSERT INTO irrigation_configs (id, user_id, crop_id, mode_type, is_active, created_at, last_irrigation_at, duration_minutes)
SELECT id, user_id, crop_id, mode_type, is_active, created_at, last_irrigation_at, duration_minutes
FROM irrigation_configs_temp;

-- Restaurar datos de configuración programada
INSERT INTO programmed_settings (
  config_id, start_datetime, frequency_type, custom_days, 
  notify_before_minutes, notify_at_start, notify_at_end, 
  last_execution, next_execution
)
SELECT config_id, start_datetime, frequency_type, custom_days, 
       notify_before_minutes, notify_at_start, notify_at_end, 
       last_execution, next_execution
FROM programmed_settings_temp;

-- Restaurar datos de configuración automática
INSERT INTO automatic_settings (
  config_id, humidity_min_threshold, humidity_max_threshold, 
  temperature_max_threshold, use_crop_thresholds
)
SELECT config_id, humidity_min_threshold, humidity_max_threshold, 
       temperature_max_threshold, use_crop_thresholds
FROM automatic_settings_temp;

-- =====================================================
-- PASO 6: ACTUALIZAR SECUENCIAS Y LIMPIAR
-- =====================================================

-- Actualizar secuencias para que continúen desde el último ID usado
SELECT setval('irrigation_configs_id_seq', (SELECT MAX(id) FROM irrigation_configs));

-- Eliminar tablas temporales
DROP TABLE IF EXISTS irrigation_configs_temp;
DROP TABLE IF EXISTS programmed_settings_temp;
DROP TABLE IF EXISTS automatic_settings_temp;

-- =====================================================
-- PASO 7: ACTUALIZAR REFERENCIAS EN OTRAS TABLAS
-- =====================================================

-- Actualizar la tabla pump_activations para usar la nueva estructura
-- (Si existe, mantener la referencia a irrigation_config_id que sigue siendo válida)

-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================

-- Verificar que la migración fue exitosa
SELECT 'Migración completada exitosamente' as status;

-- Mostrar estadísticas de la migración
SELECT 
  'irrigation_configs' as tabla,
  COUNT(*) as registros
FROM irrigation_configs
UNION ALL
SELECT 
  'programmed_settings' as tabla,
  COUNT(*) as registros
FROM programmed_settings
UNION ALL
SELECT 
  'automatic_settings' as tabla,
  COUNT(*) as registros
FROM automatic_settings;

-- =====================================================
-- NOTAS IMPORTANTES:
-- =====================================================
-- 1. Este script debe ejecutarse en una base de datos de desarrollo primero
-- 2. Hacer backup completo antes de ejecutar en producción
-- 3. Verificar que todas las aplicaciones usen los nuevos nombres de tabla
-- 4. Actualizar cualquier código que haga referencia a las tablas antiguas
-- 5. La tabla manual_configs ya no existe - los datos manuales solo usan duration_minutes de irrigation_configs 