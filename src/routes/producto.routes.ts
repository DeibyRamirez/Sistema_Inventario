import { Router } from 'express';
import { getProductos } from '../controllers/producto.controller';


const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', getProductos); 

// Exportamos el objeto router por defecto
export default router;