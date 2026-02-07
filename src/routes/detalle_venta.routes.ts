import { Router } from 'express';
import { getDetallesVenta } from 'src/controllers/detalle_venta.controller';


const router = Router();

// GET /api/detalles_ventas -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/detalle_venta', getDetallesVenta); 

// Exportamos el objeto router por defecto
export default router;