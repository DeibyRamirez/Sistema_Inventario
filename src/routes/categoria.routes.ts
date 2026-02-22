import { Router } from 'express';
import { getCategorias, postCategorias, putCategorias, deleteCategorias } from '../controllers/categoria.controller';
import { verifyToken } from '../middlewares/auth.midleware';
import { authorizeRoles } from '../middlewares/roles.midleware';


const router = Router();

// GET /api/categoria -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/:id_negocio', verifyToken, authorizeRoles("admin", "dueño", "empleado"), getCategorias);
router.post('/', verifyToken, authorizeRoles("admin", "dueño"), postCategorias); 
router.put('/:id_categoria', verifyToken, authorizeRoles("admin", "dueño"), putCategorias); 
router.delete('/:id_categoria', verifyToken, authorizeRoles("admin", "dueño"), deleteCategorias);  

// Exportamos el objeto router por defecto
export default router;