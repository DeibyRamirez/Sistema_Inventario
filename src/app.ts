import express from 'express';
import dotenv from 'dotenv';
import { query } from './config/db';

import productosRoutes from './routes/producto.routes';

dotenv.config();

const app = express();
app.use(express.json());

// Ahora sí, usamos el nombre que importamos arriba
app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;

// Prueba de conexión a la DB antes de arrancar el servidor
const startServer = async () => {
    try {
        await query('SELECT NOW()'); // Intenta una consulta simple
        console.log('✅ Conexión a PostgreSQL exitosa');
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error conectando a la base de datos:', error);
        process.exit(1);
    }
};

startServer();