-- SCRIPT PARA ELIMINAR TABLAS ACTUALES Y RECREAR ESTRUCTURA SIMPLIFICADA
-- ⚠️ ADVERTENCIA: Este script eliminará TODOS los datos existentes
-- ⚠️ Hacer backup antes de ejecutar

-- =====================================================
-- PASO 1: ELIMINAR TABLAS EXISTENTES
-- =====================================================

-- Eliminar tablas en orden correcto (por dependencias)
DROP TABLE IF EXISTS pump_activations CASCADE;
DROP TABLE IF EXISTS manual_configs CASCADE;
DROP TABLE IF EXISTS automatic_configs CASCADE;
DROP TABLE IF EXISTS programmed_configs CASCADE;
DROP TABLE IF EXISTS irrigation_configs CASCADE;

-- =====================================================
-- PASO 2: CREAR NUEVA ESTRUCTURA SIMPLIFICADA
-- =====================================================

-- Crear tabla principal de configuraciones de riego
CREATE TABLE irrigation_configs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  crop_id INTEGER REFERENCES crops(id) ON DELETE CASCADE,
  mode_type irrigation_mode NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_irrigation_at TIMESTAMP,
  duration_minutes INTEGER NOT NULL, -- Campo común a todos los modos
  UNIQUE(user_id, crop_id, mode_type) -- Un usuario solo puede tener 1 config por cultivo y modo
);

-- Crear tabla específica para configuración programada
CREATE TABLE programmed_settings (
  config_id INTEGER PRIMARY KEY REFERENCES irrigation_configs(id) ON DELETE CASCADE,
  start_datetime TIMESTAMP NOT NULL,
  frequency_type frequency_type NOT NULL,
  custom_days INTEGER[], -- Array de días de la semana [1,2,3,4,5,6,7]
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

-- Recrear tabla pump_activations con la nueva estructura
CREATE TABLE pump_activations (
  id SERIAL PRIMARY KEY,
  irrigation_config_id INTEGER REFERENCES irrigation_configs(id),
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP,
  duration_minutes INTEGER,
  status pump_status DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- PASO 3: VERIFICACIÓN
-- =====================================================

-- Verificar que las tablas se crearon correctamente
SELECT 'Estructura simplificada creada exitosamente' as status;

-- Mostrar las nuevas tablas creadas
SELECT 
  table_name,
  'Creada' as estado
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('irrigation_configs', 'programmed_settings', 'automatic_settings', 'pump_activations')
ORDER BY table_name;

-- =====================================================
-- RESUMEN DE CAMBIOS:
-- =====================================================
-- ✅ Eliminadas: manual_configs, automatic_configs, programmed_configs (estructura antigua)
-- ✅ Creadas: irrigation_configs (con duration_minutes), programmed_settings, automatic_settings
-- ✅ Simplificación: Las tablas hijas usan config_id como PRIMARY KEY
-- ✅ Centralización: duration_minutes está en la tabla padre
-- ✅ Eliminación: manual_configs ya no existe (solo usa duration_minutes de irrigation_configs) 