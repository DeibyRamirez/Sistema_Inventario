import { Router } from 'express';
import { getDetallesVenta } from '../controllers/detalle_venta.controller';
import { authorizeRoles } from '../middlewares/roles.midleware';


const router = Router();

// GET /api/detalles_ventas -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/detalle_venta', authorizeRoles("admin", "dueño"), getDetallesVenta); 

// Exportamos el objeto router por defecto
export default router;