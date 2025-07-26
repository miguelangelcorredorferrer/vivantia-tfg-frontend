-- Script para verificar y aplicar restricciones de cascada
-- Ejecutar este script si las eliminaciones en cascada no funcionan

-- Verificar restricciones existentes
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    rc.delete_rule
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name IN ('crops', 'devices', 'alerts', 'irrigation_configs', 'pump_activations', 'sensor_readings');

-- Aplicar restricciones de cascada si no existen
-- Nota: Solo ejecutar si las restricciones no están presentes

-- Para crops
ALTER TABLE crops DROP CONSTRAINT IF EXISTS crops_user_id_fkey;
ALTER TABLE crops ADD CONSTRAINT crops_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Para devices
ALTER TABLE devices DROP CONSTRAINT IF EXISTS devices_user_id_fkey;
ALTER TABLE devices ADD CONSTRAINT devices_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Para alerts
ALTER TABLE alerts DROP CONSTRAINT IF EXISTS alerts_user_id_fkey;
ALTER TABLE alerts ADD CONSTRAINT alerts_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Para irrigation_configs
ALTER TABLE irrigation_configs DROP CONSTRAINT IF EXISTS irrigation_configs_user_id_fkey;
ALTER TABLE irrigation_configs ADD CONSTRAINT irrigation_configs_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Para pump_activations (a través de irrigation_configs)
-- Esta se elimina automáticamente cuando se elimina irrigation_configs

-- Para sensor_readings (a través de devices)
-- Esta se elimina automáticamente cuando se elimina devices 