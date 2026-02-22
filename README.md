# 🚀 Sistema de Inventario y Ventas (Backend)

Backend del **Sistema de Gestión Comercial Multi-Negocio (SaaS)** diseñado para pequeños y medianos comercios que necesitan control profesional de inventario, ventas y auditoría.

Desarrollado con **Node.js + TypeScript + PostgreSQL**, aplicando arquitectura limpia, separación de responsabilidades y principios de seguridad empresarial.

---

## 🎯 Objetivo del Proyecto

Brindar una solución tecnológica que permita a los negocios:

- 📦 Gestionar inventario
- 🛒 Registrar ventas y compras
- 📊 Controlar stock en tiempo real
- 🔍 Auditar acciones del sistema
- 📈 Generar reportes históricos
- 🏢 Operar múltiples negocios desde una misma plataforma (Multi-Tenant)

> El sistema está preparado para evolucionar a un modelo SaaS comercial escalable.

---

## 🏗️ Arquitectura del Sistema

Se implementa una **Arquitectura en Capas (Layered Architecture)** para garantizar:

- Separación de responsabilidades
- Escalabilidad
- Código mantenible
- Fácil testeo
- Seguridad estructural

```
/src
 ├── app.ts                # Punto de entrada
 ├── config/               # Configuración DB y entorno
 ├── controllers/          # Manejo HTTP (Request / Response)
 ├── services/             # Lógica de negocio
 ├── repositories/         # Acceso a datos (SQL puro)
 ├── models/               # Interfaces y contratos
 ├── routes/               # Definición de endpoints
 ├── middlewares/          # Seguridad, JWT, auditoría
 ├── utils/                # Funciones auxiliares
 └── types/                # Extensiones de Express
```

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| Node.js 18+ | Runtime |
| TypeScript | Tipado estático y seguridad |
| Express | Framework HTTP |
| PostgreSQL 16+ | Base de datos relacional |
| SQL Puro | Control total de consultas |
| JWT | Autenticación |
| dotenv | Variables de entorno |
| Nodemon | Desarrollo |

---

## 🔐 Seguridad Implementada

### 1️⃣ Autenticación – JWT

Se utiliza **JSON Web Tokens** para validar identidad.

1. El usuario inicia sesión
2. Se genera un token con:
   - `id_usuario`
   - `negocio_id`
   - `rol`
   - `permisos`
3. El token se envía en cada request protegido

```
Authorization: Bearer <token>
```

### 2️⃣ Autorización – Roles + Permisos Granulares

Se implementa control de acceso basado en:

- **Rol** (`admin`, `dueño`, `empleado`)
- **Permisos específicos** (ej: `productos.editar`)

**Middleware:**

```ts
authorizePermissions("productos.editar")
```

Esto permite control fino sobre qué puede hacer cada usuario.

### 3️⃣ Multi-Tenant Seguro

Cada tabla crítica incluye `negocio_id`. Todas las consultas están filtradas por:

```sql
WHERE negocio_id = $1
```

Esto garantiza:

- Aislamiento total de datos
- Seguridad entre negocios
- Arquitectura SaaS real

### 4️⃣ Auditoría Automática

Middleware que registra automáticamente en cada acción crítica:

- Usuario
- Acción
- Método HTTP
- IP
- Fecha y hora

> No tiene CRUD manual. Se registra automáticamente.

**Beneficios:** Trazabilidad · Seguridad empresarial · Prevención de fraude interno

---

## 📦 Gestión de Inventario

### ✔ Movimientos de Stock

El stock **no se modifica directamente**. Toda entrada o salida genera un registro en `movimientos_stock`. Las ventas y compras se ejecutan dentro de **transacciones SQL** para evitar inconsistencias.

**Beneficios:** Integridad de datos · Historial completo · Reportes confiables

### 🗑️ Soft Delete (Eliminación Lógica)

No se realizan `DELETE` físicos. Se utiliza un campo `activo BOOLEAN`:

```sql
UPDATE tabla SET activo = false
```

**Ventajas:** Conservación histórica · Auditoría completa · Métricas correctas

---

## 🧠 Decisiones de Ingeniería

### ❌ No se usa ORM

Se usa **SQL puro** porque:

- Mayor control
- Mejor rendimiento
- Consultas optimizadas
- Transacciones claras

### 📂 Manejo de Importaciones

Se utilizan rutas relativas:

```ts
import { getUsuarios } from '../controllers/usuario.controller';
```

**Motivo:** Node.js no reconoce `src/...` por defecto, evita configuraciones adicionales y funciona igual en desarrollo y producción.

---

## 🚦 Instalación y Uso

### Requisitos

- Node.js 18+
- PostgreSQL 16+

### Instalación

```bash
npm install
```

### Crear archivo `.env`

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=sistema_inventario
JWT_SECRET=clave_super_segura
```

### Ejecutar en desarrollo

```bash
npm run dev
```

---

## 📊 Estado del Proyecto

| Estado | Funcionalidad |
|---|---|
| ✅ | Arquitectura base |
| ✅ | CRUD principales |
| ✅ | Soft delete |
| ✅ | Multi-tenant |
| ✅ | Auditoría automática |
| ✅ | Control de stock transaccional |
| ✅ | Autenticación JWT |
| 🔄 | Control de roles avanzado |
| 🔄 | Reportes avanzados |
| 🔄 | Deploy en producción |

---

## 🔎 Conceptos Clave

| Concepto | Significado |
|---|---|
| Autenticación | Verifica quién eres |
| Autorización | Verifica qué puedes hacer |
| Multi-Tenant | Un sistema para múltiples negocios aislados |
| Soft Delete | Eliminación lógica |
| Transacciones | Operaciones atómicas en base de datos |

---

## 🚀 Escalabilidad Futura

El sistema está preparado para:

- Panel administrativo global
- Suscripciones SaaS
- Facturación electrónica
- Integración con apps móviles
- Microservicios
- Dockerización

---

## 🧩 Filosofía del Proyecto

Este backend fue diseñado priorizando:

- 🔐 Seguridad
- 📊 Integridad de datos
- 🧱 Arquitectura limpia
- 🚀 Escalabilidad comercial
- 🧠 Buenas prácticas profesionales

> No es solo un CRUD.  
> Es una base sólida para un producto real de mercado.

---

## 👨‍💻 Autor

**Deiby**  
Ingeniero de Software y Computación