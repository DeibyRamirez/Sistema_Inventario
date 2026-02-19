import { Router } from 'express';
import { getNegocios, postNegocios, putNegocios, deleteNegocios, getOneNegocios } from '../controllers/negocio.controller';
import { verifyToken } from '../middlewares/auth.midleware';


const router = Router();

// GET /api/negocios -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', verifyToken,  getNegocios); 
router.get('/:id_negocio', verifyToken, getOneNegocios);
router.post('/', verifyToken, postNegocios); 
router.put('/:id_negocio', verifyToken, putNegocios); 
router.delete('/:id_negocio', verifyToken, deleteNegocios); 

// Exportamos el objeto router por defecto
export default router;