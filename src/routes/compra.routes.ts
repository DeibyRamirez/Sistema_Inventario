import { Router } from 'express';
import { getCompras, postCompras } from '../controllers/compra.controller';

const router = Router();

// GET /api/compras -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', getCompras); 
router.post('/', postCompras); 

// Exportamos el objeto router por defecto
export default router;