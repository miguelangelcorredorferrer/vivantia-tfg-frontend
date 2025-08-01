-- Script para añadir el estado 'programmed' al tipo ENUM pump_status
-- Ejecutar solo si la base de datos ya está en producción y no se puede recrear

-- 1. Añadir el nuevo valor al tipo ENUM
ALTER TYPE pump_status ADD VALUE 'programmed';

-- 2. Verificar que se añadió correctamente
-- Puedes ejecutar: SELECT unnest(enum_range(NULL::pump_status));

-- Nota: Este comando solo funciona si 'programmed' se añade al final del ENUM
-- Si necesitas insertarlo en una posición específica, necesitarías recrear el tipo 