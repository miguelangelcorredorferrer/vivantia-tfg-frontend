-- SCRIPT DE ROLLBACK PARA REVERTIR LA MIGRACIÓN
-- Solo usar si necesitas volver a la estructura anterior

-- =====================================================
-- PASO 1: CREAR TABLAS TEMPORALES PARA MIGRAR DATOS
-- =====================================================

-- Crear tabla temporal para irrigation_configs original
CREATE TABLE irrigation_configs_old_temp (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  crop_id INTEGER,
  mode_type irrigation_mode NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_irrigation_at TIMESTAMP,
  UNIQUE(user_id, crop_id, mode_type)
);

-- Crear tabla temporal para programmed_configs original
CREATE TABLE programmed_configs_old_temp (
  id SERIAL PRIMARY KEY,
  irrigation_config_id INTEGER,
  start_datetime TIMESTAMP NOT NULL,
  duration_minutes INTEGER NOT NULL,
  frequency_type frequency_type NOT NULL,
  custom_days INTEGER[],
  notify_before_minutes INTEGER DEFAULT 5,
  notify_at_start BOOLEAN DEFAULT TRUE,
  notify_at_end BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_execution TIMESTAMP,
  next_execution TIMESTAMP
);

-- Crear tabla temporal para automatic_configs original
CREATE TABLE automatic_configs_old_temp (
  id SERIAL PRIMARY KEY,
  irrigation_config_id INTEGER,
  humidity_min_threshold DECIMAL(5,2) NOT NULL,
  humidity_max_threshold DECIMAL(5,2) NOT NULL,
  temperature_max_threshold DECIMAL(5,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  use_crop_thresholds BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla temporal para manual_configs original
CREATE TABLE manual_configs_old_temp (
  id SERIAL PRIMARY KEY,
  irrigation_config_id INTEGER,
  duration_minutes INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- PASO 2: MIGRAR DATOS DE LA NUEVA ESTRUCTURA A LA ANTIGUA
-- =====================================================

-- Migrar datos de irrigation_configs (sin duration_minutes)
INSERT INTO irrigation_configs_old_temp (id, user_id, crop_id, mode_type, is_active, created_at, last_irrigation_at)
SELECT id, user_id, crop_id, mode_type, is_active, created_at, last_irrigation_at
FROM irrigation_configs;

-- Migrar datos de configuración programada
INSERT INTO programmed_configs_old_temp (
  irrigation_config_id, start_datetime, duration_minutes, frequency_type, custom_days,
  notify_before_minutes, notify_at_start, notify_at_end, created_at, updated_at,
  last_execution, next_execution
)
SELECT 
  ps.config_id,
  ps.start_datetime,
  ic.duration_minutes,
  ps.frequency_type,
  ps.custom_days,
  ps.notify_before_minutes,
  ps.notify_at_start,
  ps.notify_at_end,
  ic.created_at,
  ic.created_at as updated_at,
  ps.last_execution,
  ps.next_execution
FROM programmed_settings ps
JOIN irrigation_configs ic ON ps.config_id = ic.id;

-- Migrar datos de configuración automática
INSERT INTO automatic_configs_old_temp (
  irrigation_config_id, humidity_min_threshold, humidity_max_threshold,
  temperature_max_threshold, duration_minutes, use_crop_thresholds, created_at
)
SELECT 
  as.config_id,
  as.humidity_min_threshold,
  as.humidity_max_threshold,
  as.temperature_max_threshold,
  ic.duration_minutes,
  as.use_crop_thresholds,
  ic.created_at
FROM automatic_settings as
JOIN irrigation_configs ic ON as.config_id = ic.id;

-- Migrar datos de configuración manual
INSERT INTO manual_configs_old_temp (
  irrigation_config_id, duration_minutes, created_at
)
SELECT 
  ic.id,
  ic.duration_minutes,
  ic.created_at
FROM irrigation_configs ic
WHERE ic.mode_type = 'manual';

-- =====================================================
-- PASO 3: ELIMINAR NUEVAS TABLAS
-- =====================================================

DROP TABLE IF EXISTS automatic_settings CASCADE;
DROP TABLE IF EXISTS programmed_settings CASCADE;
DROP TABLE IF EXISTS irrigation_configs CASCADE;

-- =====================================================
-- PASO 4: RECREAR TABLAS ORIGINALES
-- =====================================================

-- Recrear tabla irrigation_configs original
CREATE TABLE irrigation_configs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  crop_id INTEGER REFERENCES crops(id) ON DELETE CASCADE,
  mode_type irrigation_mode NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_irrigation_at TIMESTAMP,
  UNIQUE(user_id, crop_id, mode_type)
);

-- Recrear tabla programmed_configs original
CREATE TABLE programmed_configs (
  id SERIAL PRIMARY KEY,
  irrigation_config_id INTEGER REFERENCES irrigation_configs(id) ON DELETE CASCADE,
  start_datetime TIMESTAMP NOT NULL,
  duration_minutes INTEGER NOT NULL,
  frequency_type frequency_type NOT NULL,
  custom_days INTEGER[],
  notify_before_minutes INTEGER DEFAULT 5,
  notify_at_start BOOLEAN DEFAULT TRUE,
  notify_at_end BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_execution TIMESTAMP,
  next_execution TIMESTAMP
);

-- Recrear tabla automatic_configs original
CREATE TABLE automatic_configs (
  id SERIAL PRIMARY KEY,
  irrigation_config_id INTEGER REFERENCES irrigation_configs(id) ON DELETE CASCADE,
  humidity_min_threshold DECIMAL(5,2) NOT NULL,
  humidity_max_threshold DECIMAL(5,2) NOT NULL,
  temperature_max_threshold DECIMAL(5,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  use_crop_thresholds BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Recrear tabla manual_configs original
CREATE TABLE manual_configs (
  id SERIAL PRIMARY KEY,
  irrigation_config_id INTEGER REFERENCES irrigation_configs(id) ON DELETE CASCADE,
  duration_minutes INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- PASO 5: RESTAURAR DATOS ORIGINALES
-- =====================================================

-- Restaurar datos de irrigation_configs
INSERT INTO irrigation_configs (id, user_id, crop_id, mode_type, is_active, created_at, last_irrigation_at)
SELECT id, user_id, crop_id, mode_type, is_active, created_at, last_irrigation_at
FROM irrigation_configs_old_temp;

-- Restaurar datos de programmed_configs
INSERT INTO programmed_configs (
  irrigation_config_id, start_datetime, duration_minutes, frequency_type, custom_days,
  notify_before_minutes, notify_at_start, notify_at_end, created_at, updated_at,
  last_execution, next_execution
)
SELECT irrigation_config_id, start_datetime, duration_minutes, frequency_type, custom_days,
       notify_before_minutes, notify_at_start, notify_at_end, created_at, updated_at,
       last_execution, next_execution
FROM programmed_configs_old_temp;

-- Restaurar datos de automatic_configs
INSERT INTO automatic_configs (
  irrigation_config_id, humidity_min_threshold, humidity_max_threshold,
  temperature_max_threshold, duration_minutes, use_crop_thresholds, created_at
)
SELECT irrigation_config_id, humidity_min_threshold, humidity_max_threshold,
       temperature_max_threshold, duration_minutes, use_crop_thresholds, created_at
FROM automatic_configs_old_temp;

-- Restaurar datos de manual_configs
INSERT INTO manual_configs (irrigation_config_id, duration_minutes, created_at)
SELECT irrigation_config_id, duration_minutes, created_at
FROM manual_configs_old_temp;

-- =====================================================
-- PASO 6: LIMPIAR Y VERIFICAR
-- =====================================================

-- Actualizar secuencias
SELECT setval('irrigation_configs_id_seq', (SELECT MAX(id) FROM irrigation_configs));
SELECT setval('programmed_configs_id_seq', (SELECT MAX(id) FROM programmed_configs));
SELECT setval('automatic_configs_id_seq', (SELECT MAX(id) FROM automatic_configs));
SELECT setval('manual_configs_id_seq', (SELECT MAX(id) FROM manual_configs));

-- Eliminar tablas temporales
DROP TABLE IF EXISTS irrigation_configs_old_temp;
DROP TABLE IF EXISTS programmed_configs_old_temp;
DROP TABLE IF EXISTS automatic_configs_old_temp;
DROP TABLE IF EXISTS manual_configs_old_temp;

-- Verificar rollback
SELECT 'Rollback completado exitosamente' as status;

-- Mostrar estadísticas
SELECT 
  'irrigation_configs' as tabla,
  COUNT(*) as registros
FROM irrigation_configs
UNION ALL
SELECT 
  'programmed_configs' as tabla,
  COUNT(*) as registros
FROM programmed_configs
UNION ALL
SELECT 
  'automatic_configs' as tabla,
  COUNT(*) as registros
FROM automatic_configs
UNION ALL
SELECT 
  'manual_configs' as tabla,
  COUNT(*) as registros
FROM manual_configs; 