import { Router } from 'express';
import { getProveedores } from '../controllers/proveedor.controller';



const router = Router();

// GET /api/proveedores -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', getProveedores); 

// Exportamos el objeto router por defecto
export default router;