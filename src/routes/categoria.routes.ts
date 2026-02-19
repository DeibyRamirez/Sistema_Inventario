import { Router } from 'express';
import { getCategorias, postCategorias, putCategorias, deleteCategorias } from '../controllers/categoria.controller';
import { verifyToken } from '../middlewares/auth.midleware';


const router = Router();

// GET /api/categoria -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/:id_negocio', verifyToken, getCategorias);
router.post('/', verifyToken, postCategorias); 
router.put('/:id_categoria', verifyToken, putCategorias); 
router.delete('/:id_categoria', verifyToken, deleteCategorias);  

// Exportamos el objeto router por defecto
export default router;