import { Router } from 'express';
import { getVentas, postVentas } from '../controllers/venta.controller';
import { verifyToken } from '../middlewares/auth.midleware';
import { authorizeRoles } from '../middlewares/roles.midleware';


const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/:negocio_id', verifyToken, authorizeRoles("admin", "dueño", "empleado"), getVentas); 
router.post('/', verifyToken, authorizeRoles("admin", "dueño", "empleado"), postVentas); 

// Exportamos el objeto router por defecto
export default router;