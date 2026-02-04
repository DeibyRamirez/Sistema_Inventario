🚀 Sistema de Inventario y Ventas (Backend)
Bienvenido al núcleo del sistema de gestión comercial. Este backend está construido con Node.js, TypeScript y PostgreSQL, enfocado en la escalabilidad, la integridad de los datos y el rendimiento.

🏗️ Arquitectura del Proyecto
Hemos implementado una Arquitectura en Capas para separar las responsabilidades y facilitar el mantenimiento y las pruebas unitarias.

Plaintext
/src
  ├── config/       # Configuración de Pool de conexión (pg) y variables de entorno.
  ├── controllers/  # Orquestadores: reciben peticiones HTTP y manejan respuestas.
  ├── services/     # El "Cerebro": contiene la lógica de negocio y validaciones complejas.
  ├── models/       # Contratos: Interfaces de TypeScript que definen la forma de los datos.
  ├── repositories/ # Capa de Datos: Consultas SQL puras y acceso directo a la DB.
  ├── routes/       # Definición de Endpoints y aplicación de middlewares.
  ├── middlewares/  # Guardias: Seguridad, validación de JWT y manejo de roles.
  └── utils/        # Helpers: Funciones reutilizables y utilitarios globales.
🛠️ Tecnologías Principales
Runtime: Node.js

Lenguaje: TypeScript (Tipado fuerte para evitar errores en producción).

Base de Datos: PostgreSQL.

Driver DB: pg (SQL puro para máximo control y rendimiento).

Seguridad: JSON Web Tokens (JWT) para autenticación multi-inquilino.

💡 Decisiones de Ingeniería
1. Gestión de Datos: Soft Delete
Para garantizar la integridad histórica y contable, no eliminamos registros físicamente (DELETE).

Implementamos una columna activo (BOOLEAN) por defecto en true.

Las "eliminaciones" son en realidad un UPDATE a false.

Beneficio: Evitamos romper la integridad referencial en reportes de ventas y estadísticas históricas.

2. Multi-inquilino (Multi-tenant)
El sistema está diseñado para soportar múltiples negocios en la misma base de datos. Cada consulta está filtrada estrictamente por negocio_id, asegurando que cada cliente solo vea su propia información.

3. Transacciones ACID
En procesos críticos como el Módulo de Ventas, utilizamos transacciones de base de datos (BEGIN, COMMIT, ROLLBACK) para asegurar que el registro de la venta y la actualización del inventario ocurran de forma atómica.

🚦 Primeros Pasos
Requisitos
PostgreSQL 16+

Node.js 18+

Instalación
Clona el repositorio.

Instala las dependencias: npm install.

Configura tu archivo .env basándote en .env.example.

Ejecuta el modo desarrollo: npm run dev.