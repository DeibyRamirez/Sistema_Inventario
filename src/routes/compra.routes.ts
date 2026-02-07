import { Router } from 'express';
import { getCompras } from '../controllers/compra.controller';



const router = Router();

// GET /api/compras -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', getCompras); 

// Exportamos el objeto router por defecto
export default router;