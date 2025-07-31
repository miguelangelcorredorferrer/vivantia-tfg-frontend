-- Secuencia correcta para eliminar registros respetando las restricciones de clave foránea
-- Orden: primero las tablas que dependen de irrigation_configs, luego irrigation_configs

-- 1. Eliminar pump_activations (depende de irrigation_configs)
DELETE FROM pump_activations;

-- 2. Eliminar manual_configs (depende de irrigation_configs)
DELETE FROM manual_configs;

-- 3. Eliminar automatic_configs (depende de irrigation_configs)
DELETE FROM automatic_configs;

-- 4. Eliminar programmed_configs (depende de irrigation_configs)
DELETE FROM programmed_configs;

-- 5. Finalmente eliminar irrigation_configs
DELETE FROM irrigation_configs; 