# 🚀 Sistema de Inventario y Ventas (Backend)

Bienvenido al núcleo del sistema de gestión comercial. Este backend está construido con **Node.js**, **TypeScript** y **PostgreSQL**, enfocado en la escalabilidad, la integridad de los datos y el rendimiento.

---

## 🏗️ Arquitectura del Proyecto

Hemos implementado una **Arquitectura en Capas** para separar las responsabilidades y facilitar el mantenimiento.

```text
/src
  ├── config/       # Conexión a DB (pg) y variables de entorno.
  ├── controllers/  # Manejan peticiones HTTP y envían respuestas.
  ├── services/     # Lógica de negocio (procesos y validaciones).
  ├── models/       # Interfaces de TypeScript (contratos de datos).
  ├── repositories/ # Consultas SQL puras (Acceso a datos).
  ├── routes/       # Definición de rutas (endpoints).
  ├── middlewares/  # Seguridad: JWT y control de acceso.
  └── utils/        # Funciones auxiliares.
```

## 🛠️ Tecnologías Principales
Runtime: Node.js

Lenguaje: TypeScript

Base de Datos: PostgreSQL

Seguridad: JSON Web Tokens (JWT)

## 💡 Decisiones de Ingeniería
1. Gestión de Datos: Soft Delete
Para garantizar la integridad histórica, no eliminamos registros físicamente (DELETE).

Usamos una columna activo (BOOLEAN) por defecto en true.

Las eliminaciones son en realidad un UPDATE a false.

2. Multi-inquilino (Multi-tenant)
Cada consulta está filtrada estrictamente por negocio_id, asegurando que cada cliente solo vea su propia información.

## 🚦 Primeros Pasos
Requisitos
PostgreSQL 16+

Node.js 18+

Instalación
Clona el repositorio.

Instala dependencias:

Bash
npm install
Configura tu archivo .env.

Ejecuta en desarrollo:

Bash
npm run dev