-- Script para configurar zona horaria en PostgreSQL
-- Ejecutar este script para solucionar problemas de timestamps

-- Verificar zona horaria actual
SELECT current_setting('timezone') as current_timezone;

-- Verificar zona horaria del servidor
SHOW timezone;

-- Configurar zona horaria para la sesión actual
SET timezone = 'Europe/Madrid';

-- Verificar que se aplicó correctamente
SELECT current_setting('timezone') as new_timezone;

-- Verificar hora actual en diferentes formatos
SELECT 
    NOW() as current_timestamp,
    CURRENT_TIMESTAMP as current_timestamp_2,
    LOCALTIMESTAMP as local_timestamp,
    CURRENT_TIME as current_time_only;

-- Para hacer el cambio permanente, agregar a postgresql.conf:
-- timezone = 'Europe/Madrid'
-- Y reiniciar PostgreSQL

-- También se puede configurar por base de datos:
-- ALTER DATABASE vivantia SET timezone TO 'Europe/Madrid'; 