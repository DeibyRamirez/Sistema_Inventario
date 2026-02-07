import { Router } from 'express';
import { getVentas } from 'src/controllers/venta.controller';


const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/venta', getVentas); 

// Exportamos el objeto router por defecto
export default router;