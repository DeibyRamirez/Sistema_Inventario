import express from 'express';
import dotenv from 'dotenv';
import { query } from './config/db';
import { setupSwagger } from './config/swagger'; // Import Swagger setup

import productosRoutes from './routes/producto.routes';
import usuariosRoutes from './routes/usuario.routes';
import ventasRoutes from './routes/venta.routes';
import comprasRoutes from './routes/compra.routes';
import negociosRoutes from './routes/negocio.routes';
import provedoresRoutes from './routes/proveedor.routes';
import categoriasRoutes from './routes/categoria.routes';
import detallesRoutes from './routes/detalle_venta.routes';
import movimientosRoutes from './routes/movimientoStock.routes';
import auditoriaRoutes from './routes/auditoria.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
app.use(express.json());

// Setup Swagger
setupSwagger(app);

// Ahora sí, usamos el nombre que importamos arriba
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/compras', comprasRoutes);
app.use('/api/negocios', negociosRoutes);
app.use('/api/proveedores', provedoresRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/detalles', detallesRoutes);
app.use('/api/movimientos', movimientosRoutes);
app.use('/api/auditoria', auditoriaRoutes);

app.use('/api/auth', authRoutes);



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