const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// ================================
// Obtener todas las mascotas de un cliente por RUT
// ================================
router.get('/:rutCliente/mascotas', async (req, res) => {
    const { rutCliente } = req.params;

    try {
        const usuario = await Usuario.findOne({ rut: rutCliente });

        if (!usuario) return res.status(404).json({ message: "Cliente no encontrado" });

        res.json(usuario.mascotas || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================================
// Obtener una mascota por ID
// ================================
router.get('/:rutCliente/mascotas/:idMascota', async (req, res) => {
    const { rutCliente, idMascota } = req.params;

    try {
        const usuario = await Usuario.findOne({ rut: rutCliente });

        if (!usuario) return res.status(404).json({ message: "Cliente no encontrado" });

        const mascota = usuario.mascotas.id(idMascota);

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
    const { rutCliente } = req.params;

    try {
        const usuario = await Usuario.findOne({ rut: rutCliente });

        if (!usuario) return res.status(404).json({ message: "Cliente no encontrado" });

        usuario.mascotas.push(req.body);
        await usuario.save();

        res.json(usuario.mascotas[usuario.mascotas.length - 1]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================================
// Actualizar una mascota
// ================================
router.put('/:rutCliente/mascotas/:idMascota', async (req, res) => {
    const { rutCliente, idMascota } = req.params;

    try {
        const usuario = await Usuario.findOne({ rut: rutCliente });

        if (!usuario) return res.status(404).json({ message: "Cliente no encontrado" });

        const mascota = usuario.mascotas.id(idMascota);

        if (!mascota) return res.status(404).json({ message: "Mascota no encontrada" });

        Object.assign(mascota, req.body);
        await usuario.save();

        res.json(mascota);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================================
// Eliminar una mascota
// ================================
router.delete('/:rutCliente/mascotas/:idMascota', async (req, res) => {
    const { rutCliente, idMascota } = req.params;

    try {
        const usuario = await Usuario.findOne({ rut: rutCliente });

        if (!usuario) return res.status(404).json({ message: "Cliente no encontrado" });

        const mascota = usuario.mascotas.id(idMascota);

        if (!mascota) return res.status(404).json({ message: "Mascota no encontrada" });

        mascota.deleteOne();
        await usuario.save();

        res.json({ message: "Mascota eliminada" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
