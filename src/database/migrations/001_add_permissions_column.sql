-- Migration: Add permisos column to usuarios table
-- Purpose: Enable granular permissions for employees without changing roles.
-- Type: JSONB for flexibility (PostgreSQL 9.4+)

ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS permisos JSONB DEFAULT '[]'::jsonb;

-- Example: Give specific permissions to an employee
-- UPDATE usuarios SET permisos = '["productos.crear", "productos.editar"]'::jsonb WHERE id_usuario = 123;
