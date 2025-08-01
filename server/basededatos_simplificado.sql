-- PROPUESTA DE SIMPLIFICACIÓN JERÁRQUICA
-- Opción 1: Consolidación en una sola tabla con campos opcionales

CREATE TABLE irrigation_configs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  crop_id INTEGER REFERENCES crops(id) ON DELETE CASCADE,
  mode_type irrigation_mode NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_irrigation_at TIMESTAMP,
  
  -- Campos comunes a todos los modos
  duration_minutes INTEGER NOT NULL,
  
  -- Campos específicos para modo PROGRAMMED
  start_datetime TIMESTAMP, -- Solo para programmed
  frequency_type frequency_type, -- Solo para programmed
  custom_days INTEGER[], -- Solo para programmed
  notify_before_minutes INTEGER DEFAULT 5, -- Solo para programmed
  notify_at_start BOOLEAN DEFAULT TRUE, -- Solo para programmed
  notify_at_end BOOLEAN DEFAULT TRUE, -- Solo para programmed
  last_execution TIMESTAMP, -- Solo para programmed
  next_execution TIMESTAMP, -- Solo para programmed
  
  -- Campos específicos para modo AUTOMATIC
  humidity_min_threshold DECIMAL(5,2), -- Solo para automatic
  humidity_max_threshold DECIMAL(5,2), -- Solo para automatic
  temperature_max_threshold DECIMAL(5,2), -- Solo para automatic
  use_crop_thresholds BOOLEAN DEFAULT TRUE, -- Solo para automatic
  
  -- Campos específicos para modo MANUAL
  -- (No tiene campos específicos adicionales, solo duration_minutes)
  
  UNIQUE(user_id, crop_id, mode_type)
);

-- Opción 2: Mantener jerarquía pero simplificar relaciones
-- (Más recomendada para mantener integridad de datos)

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

-- Tabla específica para configuración programada
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

-- Tabla específica para configuración automática
CREATE TABLE automatic_settings (
  config_id INTEGER PRIMARY KEY REFERENCES irrigation_configs(id) ON DELETE CASCADE,
  humidity_min_threshold DECIMAL(5,2) NOT NULL,
  humidity_max_threshold DECIMAL(5,2) NOT NULL,
  temperature_max_threshold DECIMAL(5,2) NOT NULL,
  use_crop_thresholds BOOLEAN DEFAULT TRUE
);

-- Tabla específica para configuración manual
-- (No es necesaria ya que solo usa duration_minutes de la tabla padre)
-- CREATE TABLE manual_settings (
--   config_id INTEGER PRIMARY KEY REFERENCES irrigation_configs(id) ON DELETE CASCADE
-- );

-- VENTAJAS DE LA SIMPLIFICACIÓN:
-- 1. Elimina redundancia de irrigation_config_id en las tablas hijas
-- 2. Centraliza campos comunes como duration_minutes
-- 3. Mejora la integridad referencial
-- 4. Simplifica las consultas JOIN
-- 5. Reduce la complejidad del modelo de datos 