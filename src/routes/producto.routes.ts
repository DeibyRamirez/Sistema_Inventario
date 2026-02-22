import { Router } from 'express';
import { deleteProductos, getProductos, postProductos, putProductos } from '../controllers/producto.controller';
import { verifyToken } from '../middlewares/auth.midleware';
import { authorizeRoles } from '../middlewares/roles.midleware';
import { authorizePermissions } from '../middlewares/permissions.middleware';


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos del negocio
 */

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener lista de productos
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos del negocio del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 type: object
 *                 properties:
 *                   id_producto:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   precio_venta:
 *                     type: number
 *                   stock_actual:
 *                     type: integer
 *       401:
 *         description: No autorizado
 */
// GET /api/products -> Solo usuarios logueados del mismo negocio
router.get('/:negocio_id', verifyToken, authorizeRoles("admin", "dueño", "empleado"), getProductos); 

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - precio_venta
 *               - categoria_id
 *             properties:
 *               nombre:
 *                 type: string
 *               precio_venta:
 *                 type: number
 *               categoria_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 */
router.post('/', verifyToken, authorizeRoles("admin", "dueño"), postProductos); 

/**
 * @swagger
 * /api/productos/{id_producto}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_producto
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio_venta:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.put('/:id_producto', verifyToken, authorizeRoles("admin", "dueño"), putProductos); 

/**
 * @swagger
 * /api/productos/{id_producto}:
 *   delete:
 *     summary: Eliminar (desactivar) un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_producto
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Producto eliminado
 */
router.delete('/:id_producto', verifyToken, authorizePermissions("productos.eliminar"), deleteProductos);

// Exportamos el objeto router por defecto
export default router;