import { Router } from 'express';
import { getProveedores, postProveedores, putProveedores, deleteProveedores, getProveedoresFiltrada } from '../controllers/proveedor.controller';
import { verifyToken } from '../middlewares/auth.midleware';



const router = Router();

// GET /api/proveedores -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', verifyToken, getProveedores);
router.get('/filtrado', verifyToken, getProveedoresFiltrada);
router.post('/', verifyToken, postProveedores); 
router.put('/:id_proveedor', verifyToken, putProveedores); 
router.delete('/:id_proveedor', verifyToken, deleteProveedores); 

// Exportamos el objeto router por defecto
export default router;