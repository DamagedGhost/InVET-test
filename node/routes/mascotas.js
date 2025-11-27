const express = require('express');
const router = express.Router();

// Importar el modelo correcto
const Cliente = require('../models/Cliente');

// Función para limpiar RUT
const limpiarRut = (rut) => rut.replace(/\./g, "").replace("-", "");

// ================================
// Obtener todas las mascotas
// ================================
router.get('/:rutCliente/mascotas', async (req, res) => {
    try {
        const rutLimpio = limpiarRut(req.params.rutCliente);
        const cliente = await Cliente.findOne({ rut: rutLimpio });

        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

        res.json(cliente.mascotas || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================================
// Obtener una mascota por ID
// ================================
router.get('/:rutCliente/mascotas/:idMascota', async (req, res) => {
    try {
        const rutLimpio = limpiarRut(req.params.rutCliente);
        const cliente = await Cliente.findOne({ rut: rutLimpio });

        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

        const mascota = cliente.mascotas.id(req.params.idMascota);

        if (!mascota) return res.status(404).json({ message: "Mascota no encontrada" });

        res.json(mascota);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================================
// Crear una mascota
// ================================
router.post('/:rutCliente/mascotas', async (req, res) => {
    try {
        const rutLimpio = limpiarRut(req.params.rutCliente);
        const cliente = await Cliente.findOne({ rut: rutLimpio });

        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

        cliente.mascotas.push(req.body);
        await cliente.save();

        res.json(cliente.mascotas[cliente.mascotas.length - 1]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================================
// Actualizar una mascota
// ================================
router.put('/:rutCliente/mascotas/:idMascota', async (req, res) => {
    try {
        const rutLimpio = limpiarRut(req.params.rutCliente);
        const cliente = await Cliente.findOne({ rut: rutLimpio });

        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

        const mascota = cliente.mascotas.id(req.params.idMascota);
        if (!mascota) return res.status(404).json({ message: "Mascota no encontrada" });

        Object.assign(mascota, req.body);
        await cliente.save();

        res.json(mascota);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================================
// Eliminar mascota
// ================================
router.delete('/:rutCliente/mascotas/:idMascota', async (req, res) => {
    try {
        const rutLimpio = limpiarRut(req.params.rutCliente);
        const cliente = await Cliente.findOne({ rut: rutLimpio });

        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

        const mascota = cliente.mascotas.id(req.params.idMascota);
        if (!mascota) return res.status(404).json({ message: "Mascota no encontrada" });

        mascota.deleteOne();
        await cliente.save();

        res.json({ message: "Mascota eliminada" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
