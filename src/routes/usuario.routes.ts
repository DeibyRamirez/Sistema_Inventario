import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.midleware';
import { getProductos } from '../controllers/producto.controller';
import { getUsuarios } from 'src/controllers/usuario.controller';


const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/usuario', getUsuarios); 

// Exportamos el objeto router por defecto
export default router;