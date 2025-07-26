CREATE TYPE user_role AS ENUM ('admin', 'usuario', 'visitante');
CREATE TYPE irrigation_mode AS ENUM ('manual', 'automatic', 'programmed');
CREATE TYPE frequency_type AS ENUM ('once', 'daily', 'custom');
CREATE TYPE pump_status AS ENUM ('active', 'completed', 'cancelled', 'paused', 'restart', 'error');
CREATE TYPE alert_severity AS ENUM ('info', 'success', 'warning', 'error');
CREATE TYPE alert_category AS ENUM (
  'user',           -- Acciones del usuario (registro, login, cambios)
  'environmental',  -- Condiciones ambientales (temperatura, humedad)
  'device',         -- Estado de dispositivos IoT
  'crop',           -- Gestión de cultivos
  'irrigation'      -- Actividad de riego
);

CREATE TYPE alert_subtype AS ENUM (
  -- User alerts
  'user_registered', 'user_logged_in', 'username_changed', 'password_changed',
  
  -- Environmental alerts
  'temperature_max_threshold', 'humidity_min_threshold', 'humidity_max_threshold',
  
  -- Device alerts
  'device_added', 'api_key_copied', 'device_offline', 'device_online',
  
  -- Crop alerts
  'crop_selected', 'crop_deselected', 'crop_edited', 'crop_deleted', 'crop_added',
  
  -- Irrigation alerts
  'manual_started', 'emergency_stop', 'manual_cancelled', 'programmed_saved',
  'programmed_reminder', 'programmed_schedule', 'programmed_cancelled', 'automatic_saved'
);

ALTER TABLE crops DROP CONSTRAINT crops_user_id_key;
ALTER TABLE devices ADD COLUMN ttn_region VARCHAR(10);
ALTER TABLE devices ADD COLUMN ttn_app_id VARCHAR(100);
ALTER TABLE devices ADD COLUMN ttn_access_key VARCHAR(255);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'visitante',
  token TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE crops (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL, -- 'Tomate', 'Lechuga', etc.
  description TEXT, -- Breve descripción del cultivo
  image VARCHAR(255), -- URL o ruta de la imagen del cultivo
  category VARCHAR(255), -- Categoría del cultivo (e.g., 'Frutas', 'Verduras')
  growth_days INTEGER, -- Días de crecimiento del cultivo
  humidity_min DECIMAL(5,2), -- % mínimo de humedad
  humidity_max DECIMAL(5,2), -- % máximo de humedad
  temperature_max DECIMAL(5,2), -- °C máximo
  session VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  selected BOOLEAN DEFAULT FALSE, -- Indica si el cultivo está seleccionado (FALSE por defecto)
  UNIQUE(user_id) -- Solo 1 cultivo por usuario
);

CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  device_name VARCHAR(255) NOT NULL,
  enddevice_id VARCHAR(255) NOT NULL,
  app_eui VARCHAR(16) NOT NULL,
  dev_eui VARCHAR(16) NOT NULL,
  app_key VARCHAR(32) NOT NULL,
  is_active_communication BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sensor_readings (
  id SERIAL PRIMARY KEY,
  device_id INTEGER REFERENCES devices(id) ON DELETE CASCADE,
  humidity DECIMAL(5,2), -- 0.00 - 100.00%
  temperature DECIMAL(5,2), -- -50.00 - 100.00°C
  received_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE irrigation_configs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  crop_id INTEGER REFERENCES crops(id) ON DELETE CASCADE, -- RELACIÓN CON CULTIVO
  mode_type irrigation_mode NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_irrigation_at TIMESTAMP, -- Campo del ultimo riego efectuado
  UNIQUE(user_id, crop_id, mode_type) -- Un usuario solo puede tener 1 config por cultivo y modo
);

CREATE TABLE programmed_configs (
  id SERIAL PRIMARY KEY,
  irrigation_config_id INTEGER REFERENCES irrigation_configs(id) ON DELETE CASCADE,
  
  -- Configuración de fecha y hora
  start_date DATE NOT NULL, -- Fecha de inicio del programa
  start_time TIME NOT NULL, -- Hora de inicio (ej: 08:00)
  end_date DATE, -- Fecha de fin (NULL para programas indefinidos)
  
  -- Configuración de duración
  duration_minutes INTEGER NOT NULL, -- Duración de cada riego en minutos
  duration_seconds INTEGER DEFAULT 0, -- Segundos adicionales
  
  -- Configuración de frecuencia
  frequency_type frequency_type NOT NULL, -- Tipo de frecuencia
  custom_days INTEGER[], -- Array de días de la semana [1,2,3,4,5,6,7] (1=lunes, 7=domingo)
  
  -- Configuración de notificaciones (IMPORTANTE: Se guardan las preferencias)
  notify_before_start BOOLEAN DEFAULT TRUE, -- Notificar 5 minutos antes
  notify_before_minutes INTEGER DEFAULT 5, -- Minutos antes de notificar
  notify_at_start BOOLEAN DEFAULT TRUE, -- Notificar al iniciar el riego
  notify_at_end BOOLEAN DEFAULT TRUE, -- Notificar al finalizar el riego
  
  -- Metadatos
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_execution TIMESTAMP, -- Última vez que se ejecutó
  next_execution TIMESTAMP -- Próxima ejecución programada
);

CREATE TABLE automatic_configs (
  id SERIAL PRIMARY KEY,
  irrigation_config_id INTEGER REFERENCES irrigation_configs(id) ON DELETE CASCADE,
  humidity_min_threshold DECIMAL(5,2) NOT NULL, -- Puede usar los valores del cultivo o personalizados
  humidity_max_threshold DECIMAL(5,2) NOT NULL,
  temperature_max_threshold DECIMAL(5,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  use_crop_thresholds BOOLEAN DEFAULT TRUE, -- Si usa los umbrales del cultivo o personalizados
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE manual_configs (
  id SERIAL PRIMARY KEY,
  irrigation_config_id INTEGER REFERENCES irrigation_configs(id) ON DELETE CASCADE,
  duration_minutes INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pump_activations (
  id SERIAL PRIMARY KEY,
  irrigation_config_id INTEGER REFERENCES irrigation_configs(id),
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP,
  duration_minutes INTEGER,
  status pump_status DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE alerts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  alert_type alert_category NOT NULL,
  alert_subtype alert_subtype NOT NULL,
  severity alert_severity DEFAULT 'info',
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);