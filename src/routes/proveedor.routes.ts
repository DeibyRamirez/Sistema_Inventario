import { Router } from 'express';
import { getProveedores, postProveedores, putProveedores, deleteProveedores, getProveedoresFiltrada } from '../controllers/proveedor.controller';



const router = Router();

// GET /api/proveedores -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', getProveedores);
router.get('/filtrado', getProveedoresFiltrada);
router.post('/', postProveedores); 
router.put('/:id_proveedor', putProveedores); 
router.delete('/:id_proveedor', deleteProveedores); 

// Exportamos el objeto router por defecto
export default router;