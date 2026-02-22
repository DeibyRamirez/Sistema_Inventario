import { Router } from 'express';
import { getProveedores, postProveedores, putProveedores, deleteProveedores, getProveedoresFiltrada } from '../controllers/proveedor.controller';
import { verifyToken } from '../middlewares/auth.midleware';
import { authorizeRoles } from '../middlewares/roles.midleware';



const router = Router();

// GET /api/proveedores -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', verifyToken, authorizeRoles("admin", "dueño", "empleado"), getProveedores);
router.get('/filtrado', verifyToken, getProveedoresFiltrada);
router.post('/', verifyToken, authorizeRoles("admin", "dueño"), postProveedores); 
router.put('/:id_proveedor', verifyToken, authorizeRoles("admin", "dueño"), putProveedores); 
router.delete('/:id_proveedor', verifyToken, authorizeRoles("admin", "dueño"), deleteProveedores); 

// Exportamos el objeto router por defecto
export default router;