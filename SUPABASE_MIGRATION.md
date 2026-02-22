# Guía de Migración y Producción con Supabase

Este documento detalla la estrategia para llevar el sistema de inventario a producción utilizando Supabase.

## 1. Estrategia de Migración: ¿Base de datos o Full Suite?

Recomendación: **Usar Supabase principalmente como Base de Datos PostgreSQL Gestionada y Storage**, manteniendo el backend en Node.js/Express.

### ¿Por qué mantener el Backend en Node.js?
*   **Lógica de Negocio Compleja:** Ya tienes una arquitectura en capas (Controllers, Services, Repositories) que maneja transacciones complejas (ventas, stock). Migrar todo esto a *Edge Functions* o *Stored Procedures* sería reescribir la aplicación.
*   **Control Total:** Express te da control total sobre los middlewares y la seguridad personalizada que acabamos de implementar (RBAC granular).
*   **Facilidad de Migración:** Cambiar la conexión de la DB local a la nube es trivial.

### ¿Qué pasa con la Autenticación (Auth)?
Tienes dos opciones:

**Opción A: Mantener tu Auth actual (JWT propio)**
*   **Ventajas:** Ya está funcionando. Tienes control total de la tabla `usuarios` y los roles. No dependes de un tercero.
*   **Desventajas:** Tienes que gestionar la seguridad de las contraseñas, emails de recuperación, etc.
*   **Recomendación:** Para este MVP/Fase 1, **mantén tu Auth actual**. Es seguro (usas bcrypt + JWT) y ya está integrado con tu sistema de roles y permisos. Migrar a Supabase Auth requeriría cambiar todos los middlewares y la lógica de usuarios.

**Opción B: Migrar a Supabase Auth (Futuro)**
*   Implementar en una fase 2 para delegar el manejo de sesiones, OAuth (Google/Facebook login), y emails de confirmación.

## 2. Preparación de la Base de Datos (PostgreSQL)

Supabase es PostgreSQL bajo el capó. Tu esquema actual es 100% compatible.

### Pasos para Migrar:
1.  **Crear Proyecto en Supabase:** Obtén la `DATABASE_URL` desde los settings.
2.  **Backup Local:**
    ```bash
    pg_dump -U tu_usuario -h localhost -d sistema_inventario > backup.sql
    ```
3.  **Restaurar en Supabase:**
    Puedes usar la interfaz SQL de Supabase o conectar via terminal:
    ```bash
    psql -h db.ref.supabase.co -U postgres -d postgres -f backup.sql
    ```
4.  **Variables de Entorno:**
    Actualiza tu archivo `.env` en producción (ej. Railway/Render) con los datos de Supabase.

## 3. Seguridad y RLS (Row Level Security)

Actualmente, tu seguridad es **a nivel de aplicación** (en el Backend Node.js).
*   El backend verifica `negocio_id` en cada consulta.
*   Esto es seguro SIEMPRE QUE el acceso a la DB sea *solo* a través del backend.

**Mejora Profesional (Defensa en Profundidad):**
Habilitar RLS en Supabase/Postgres como capa extra de seguridad.

Ejemplo de política RLS para la tabla `productos`:
```sql
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Aislamiento por Negocio" ON productos
USING (negocio_id = current_setting('app.current_negocio_id')::int);
```
*Nota:* Para que esto funcione con tu backend actual, tendrías que configurar una transacción que setee `app.current_negocio_id` antes de cada query, lo cual agrega complejidad. **Por ahora, confía en tu lógica de backend robusta.**

## 4. Variables de Entorno para Producción

Crea un archivo `.env.production` (o configura en el dashboard de tu host):

```env
PORT=8080
DB_HOST=db.ref.supabase.co
DB_USER=postgres
DB_PASSWORD=tu_password_seguro
DB_NAME=postgres
DB_PORT=5432
JWT_SECRET=super_secreto_largo_y_aleatorio_generado_con_openssl
NODE_ENV=production
```

## 5. Recomendaciones de Deploy

Para el backend (Node.js/Express):
*   **Railway:** Muy fácil, detecta el repositorio y despliega. Compatible con variables de entorno.
*   **Render:** Opción sólida con capa gratuita.
*   **Fly.io:** Para escalar globalmente.

## 6. Escalabilidad

*   **Índices:** Asegúrate de crear índices en las columnas foráneas (`negocio_id`, `usuario_id`, `producto_id`) para que las consultas sean rápidas a medida que crecen los datos.
    ```sql
    CREATE INDEX idx_productos_negocio ON productos(negocio_id);
    CREATE INDEX idx_ventas_negocio ON ventas(negocio_id);
    ```

---
**Resumen:** Tu código está listo. Solo necesitas cambiar la URL de conexión a la DB y desplegar el backend.
