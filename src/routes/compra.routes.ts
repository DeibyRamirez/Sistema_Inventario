import { Router } from 'express';
import { getCompras } from 'src/controllers/compra.controller';



const router = Router();

// GET /api/compras -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/compra', getCompras); 

// Exportamos el objeto router por defecto
export default router;