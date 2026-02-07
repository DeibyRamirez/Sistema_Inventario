import { Router } from 'express';
import { getCategorias } from 'src/controllers/categoria.controller';


const router = Router();

// GET /api/categoria -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/categoria', getCategorias); 

// Exportamos el objeto router por defecto
export default router;