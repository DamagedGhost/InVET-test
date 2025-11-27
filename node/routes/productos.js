// src/mi-api-productos/routes/productos.js
const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto'); // Importa el modelo

// POST /api/productos
// Crear un nuevo producto
router.post('/', async (req, res) => {
    console.log('[PROD] ➕ Recibiendo datos para nuevo producto:', req.body.title);
    try {
        const newProducto = new Producto(req.body);
        const savedProducto = await newProducto.save();
        console.log(`[PROD] ✅ Producto creado con ID: ${savedProducto._id}`);
        // 201 Created
        res.status(201).json(savedProducto); 
    } catch (error) {
        // Manejo de errores de validación o unicidad
        console.error(`[PROD] ❌ Error al crear producto: ${error.message}`);
        res.status(400).json({ message: 'Error al crear producto', error: error.message });
    }
});

// GET /api/productos
// MODIFICADO: Trae TODOS los productos (Admin necesita ver todo). 
// El filtrado para el público se hará en el Frontend.
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find().sort({ codigo: 1 });
        console.log(`[PROD] Devolviendo ${productos.length} productos (Totales).`);
        res.json(productos);
    } catch (error) {
        console.error(`[PROD] Error: ${error.message}`);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});

// GET: Solo traer productos ACTIVOS
router.get('/', async (req, res) => {
    try {
        // FILTRO: { activo: true }
        const productos = await Producto.find({ activo: true }).sort({ codigo: 1 });
        console.log(`[PROD] Devolviendo ${productos.length} productos activos.`);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});

// GET /api/productos/:id
// Obtener un producto por su ID de MongoDB (_id)
router.get('/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            console.log(`[PROD] ❌ ID de producto no encontrado: ${req.params.id}`);
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        console.log(`[PROD] ✅ Producto ${req.params.id} encontrado.`);
        res.json(producto);
    } catch (error) {
        console.error(`[PROD] ❌ Error al obtener producto: ${error.message}`);
        res.status(500).json({ message: 'Error al obtener producto' });
    }
});

// PUT /api/productos/:id
// Actualizar un producto por su ID
router.put('/:id', async (req, res) => {
    console.log(`[PROD] ✍️ Petición de actualización para ID: ${req.params.id}`);
    try {
        const updatedProducto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // new: true devuelve el documento actualizado
        );
        if (!updatedProducto) {
            console.log(`[PROD] ❌ ID de producto no encontrado: ${req.params.id}`);
            return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
        }
        console.log(`[PROD] ✅ Producto ${req.params.id} actualizado.`);
        res.json(updatedProducto);
    } catch (error) {
        console.error(`[PROD] ❌ Error al actualizar producto: ${error.message}`);
        res.status(400).json({ message: 'Error al actualizar producto', error: error.message });
    }
});

// DELETE /api/productos/:id
// DELETE: Eliminación Lógica (Asegúrate de tener esto así)
router.delete('/:id', async (req, res) => {
    console.log(`[PROD] Petición de eliminación lógica para ID: ${req.params.id}`);
    try {
        const deletedProducto = await Producto.findByIdAndUpdate(
            req.params.id,
            { activo: false }, 
            { new: true }
        );
        if (!deletedProducto) return res.status(404).json({ message: 'Producto no encontrado' });
        
        res.status(200).json({ message: 'Producto desactivado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
});

module.exports = router;