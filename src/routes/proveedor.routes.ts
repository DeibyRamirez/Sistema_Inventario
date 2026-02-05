import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.midleware';
import { getProveedores } from 'src/controllers/proveedor.controller';



const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', getProveedores); 

// Exportamos el objeto router por defecto
export default router;