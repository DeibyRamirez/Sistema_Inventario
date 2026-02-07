# 🚀 Sistema de Inventario y Ventas (Backend)

Bienvenido al núcleo del **Sistema de Gestión Comercial** diseñado para pequeños y medianos negocios.  
Este backend está construido con **Node.js**, **TypeScript** y **PostgreSQL**, siguiendo buenas prácticas de ingeniería de software, enfocado en **escalabilidad, seguridad e integridad de datos**.

---

## 🎯 Objetivo del Proyecto

Resolver la problemática de negocios que no cuentan con un sistema formal para:

- Gestión de inventario
- Registro de ventas y compras
- Control de stock
- Auditoría de acciones
- Reportes históricos

El sistema está diseñado como **multi-negocio (multi-tenant)**, permitiendo que múltiples comercios usen la misma plataforma de forma segura.

---

## 🏗️ Arquitectura del Proyecto

Se implementó una **Arquitectura en Capas**, separando responsabilidades para facilitar mantenimiento, pruebas y escalabilidad.

```text
/src
 ├── app.ts                # Punto de entrada de la aplicación
 ├── config/               # Configuración de DB y variables de entorno
 ├── controllers/          # Manejo de peticiones HTTP (Request / Response)
 ├── services/             # Lógica de negocio y validaciones
 ├── repositories/         # Acceso a datos (SQL puro y transacciones)
 ├── models/               # Interfaces y contratos de datos (TypeScript)
 ├── routes/               # Definición de endpoints
 ├── middlewares/          # Middlewares (auditoría, seguridad, JWT)
 ├── utils/                # Funciones auxiliares
 └── types/                # Extensiones de tipos (Express Request)

---



🛠️ Tecnologías Utilizadas
Runtime: Node.js 18+

Lenguaje: TypeScript

Framework: Express

Base de Datos: PostgreSQL 16+

ORM: ❌ No se usa (SQL puro para mayor control)

Autenticación: JSON Web Tokens (JWT) (en proceso)

Herramientas: Nodemon, ts-node, dotenv

💡 Decisiones de Ingeniería
1️⃣ Arquitectura Modular
Cada capa cumple una única responsabilidad:

Controllers: Reciben y responden peticiones HTTP

Services: Contienen la lógica de negocio

Repositories: Ejecutan consultas SQL y transacciones

Models: Definen contratos de datos

Esto permite:

Código limpio

Pruebas más simples

Fácil escalabilidad

2️⃣ Soft Delete (Eliminación Lógica)
Para preservar el historial y evitar corrupción de métricas:

No se utilizan DELETE físicos

Se implementa una columna activo (BOOLEAN)

Las eliminaciones son UPDATE activo = false

Esto garantiza:

Integridad histórica

Reportes confiables

Auditoría completa

3️⃣ Multi-negocio (Multi-tenant)
El sistema está diseñado para múltiples negocios:

Cada tabla clave contiene negocio_id

Todas las consultas están filtradas por negocio

Un negocio nunca puede acceder a datos de otro

Esto permite escalar el sistema como SaaS.

4️⃣ Auditoría Automática
Se implementó un sistema de auditoría que registra:

Usuario

Acción realizada

Método HTTP

IP de origen

Fecha y hora

La auditoría:

No tiene CRUD

Se registra automáticamente mediante middleware

Garantiza trazabilidad y seguridad

## 5️⃣ Control de Stock
El stock no se modifica directamente:

Toda entrada o salida genera un registro en movimientos_stock

Las ventas y compras actualizan stock dentro de transacciones

Evita inconsistencias y errores humanos

📦 Manejo de Importaciones
En este proyecto se utilizan rutas relativas (../) para las importaciones internas.

❓ ¿Por qué no usamos src/...?
Node.js no reconoce rutas absolutas como src/... por defecto.
Al ejecutar el proyecto, Node interpreta estas rutas como paquetes dentro de node_modules, lo que provoca errores de resolución.

✅ Solución adoptada
Se optó por rutas relativas porque:

Son entendidas nativamente por Node.js

No requieren configuración adicional

Funcionan en desarrollo y producción sin problemas

Ejemplo correcto:

import { getUsuarios } from '../controllers/usuario.controller';
En el futuro, podrían configurarse alias (src/...) usando tsconfig-paths, pero se priorizó estabilidad y simplicidad.

🚦 Primeros Pasos
Requisitos
Node.js 18+

PostgreSQL 16+

Instalación
Clona el repositorio

Instala dependencias:

npm install
Crea y configura el archivo .env:

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=sistema_inventario
Ejecuta el servidor en desarrollo:

npm run dev
✅ Estado del Proyecto
 Arquitectura base

 CRUD principales

 Auditoría automática

 Movimientos de stock

 Soft delete

 Autenticación JWT

 Control de roles avanzado

 Reportes avanzados

 Despliegue en producción

🧠 Nota Final
Este backend fue diseñado con criterios de software profesional, priorizando:

Integridad de datos

Seguridad

Escalabilidad

Buenas prácticas

Es un proyecto con potencial real de uso comercial y crecimiento como plataforma SaaS.

👨‍💻 Autor: Deiby
🎓 Ingeniería de Software y Computación


---