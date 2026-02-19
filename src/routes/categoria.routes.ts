import { Router } from 'express';
import { getCategorias, postCategorias, putCategorias, deleteCategorias } from '../controllers/categoria.controller';


const router = Router();

// GET /api/categoria -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', getCategorias);
router.post('/', postCategorias); 
router.put('/:id_categoria', putCategorias); 
router.delete('/:id_categoria', deleteCategorias);  

// Exportamos el objeto router por defecto
export default router;