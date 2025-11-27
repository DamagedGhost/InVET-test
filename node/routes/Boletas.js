const express = require('express');
const router = express.Router();
const Boleta = require('../models/Boleta');
const Producto = require('../models/Producto');

// POST /api/boletas - Crear nueva venta
router.post('/', async (req, res) => {
    console.log('[BOLETA] Intentando crear nueva boleta...');
    const { usuario, items, total, estado } = req.body;

    try {
        // 1. Validar Stock antes de procesar
        for (const item of items) {
            const producto = await Producto.findById(item.productoId);
            if (!producto) {
                return res.status(404).json({ message: `Producto no encontrado: ${item.titulo}` });
            }
            if (producto.stock < item.cantidad) {
                return res.status(400).json({ message: `Stock insuficiente para: ${item.titulo}` });
            }
        }

        // 2. Crear la Boleta
        const nuevaBoleta = new Boleta({
            usuario,
            items,
            total,
            estado
        });
        const boletaGuardada = await nuevaBoleta.save();

        // 3. Descontar Stock (Actualizar inventario)
        for (const item of items) {
            await Producto.findByIdAndUpdate(item.productoId, {
                $inc: { stock: -item.cantidad }
            });
            console.log(`[STOCK] Descontadas ${item.cantidad} unidades de ${item.titulo}`);
        }

        console.log(`[BOLETA] Boleta creada ID: ${boletaGuardada._id}`);
        res.status(201).json(boletaGuardada);

    } catch (error) {
        console.error(`[BOLETA] Error al procesar venta: ${error.message}`);
        res.status(500).json({ message: 'Error al procesar la venta', error: error.message });
    }
});

// GET /api/boletas - Listar historial (Para el Admin o Usuario)
router.get('/', async (req, res) => {
    try {
        // Populate trae los datos del Usuario asociado
        const boletas = await Boleta.find()
            .populate('usuario', 'nombre apellidos rut')
            .sort({ fecha: -1 });
        res.json(boletas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener boletas' });
    }
});

module.exports = router;