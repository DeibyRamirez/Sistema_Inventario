import { Router } from 'express';
import { getNegocios, postNegocios, putNegocios, deleteNegocios, getOneNegocios } from '../controllers/negocio.controller';
import { verifyToken } from '../middlewares/auth.midleware';
import { authorizeRoles } from '../middlewares/roles.midleware';


const router = Router();

// GET /api/negocios -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', verifyToken, authorizeRoles("admin"),  getNegocios); 
router.get('/:id_negocio', verifyToken, authorizeRoles("admin", "dueño"), getOneNegocios);
router.post('/', verifyToken, authorizeRoles("admin"), postNegocios); 
router.put('/:id_negocio', verifyToken, authorizeRoles("admin", "dueño"), putNegocios); 
router.delete('/:id_negocio', verifyToken, authorizeRoles("admin" ), deleteNegocios); 

// Exportamos el objeto router por defecto
export default router;