import { Router } from 'express';
import { getCompras, postCompras } from '../controllers/compra.controller';
import { verifyToken } from '../middlewares/auth.midleware';
import { authorizeRoles } from '../middlewares/roles.midleware';


const router = Router();

// GET /api/compras -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/:negocio_id', verifyToken, authorizeRoles("admin", "dueño", "empleado"), getCompras); 
router.post('/', verifyToken, authorizeRoles("admin", "dueño"), postCompras); 

// Exportamos el objeto router por defecto
export default router;