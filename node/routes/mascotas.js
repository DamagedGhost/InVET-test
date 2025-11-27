const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Helper: No limpiamos, solo decodificamos por seguridad URL
const obtenerRut = (param) => decodeURIComponent(param);

// GET Todas
router.get('/:rutCliente/mascotas', async (req, res) => {
    try {
        const rut = obtenerRut(req.params.rutCliente);
        const usuario = await Usuario.findOne({ rut: rut }); // Busca EXACTO (con puntos y guión)
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(usuario.mascotas || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET Una
router.get('/:rutCliente/mascotas/:idMascota', async (req, res) => {
    try {
        const rut = obtenerRut(req.params.rutCliente);
        const usuario = await Usuario.findOne({ rut: rut });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
        
        const mascota = usuario.mascotas.id(req.params.idMascota);
        if (!mascota) return res.status(404).json({ message: "Mascota no encontrada" });
        
        res.json(mascota);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST Crear
router.post('/:rutCliente/mascotas', async (req, res) => {
    try {
        const rut = obtenerRut(req.params.rutCliente);
        console.log(`[BACKEND] Buscando RUT: ${rut}`); // Log para depurar
        
        const usuario = await Usuario.findOne({ rut: rut });
        if (!usuario) return res.status(404).json({ message: "Usuario/Cliente no encontrado con ese RUT" });

        usuario.mascotas.push(req.body);
        await usuario.save();
        res.json(usuario.mascotas[usuario.mascotas.length - 1]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT Actualizar
router.put('/:rutCliente/mascotas/:idMascota', async (req, res) => {
    try {
        const rut = obtenerRut(req.params.rutCliente);
        const usuario = await Usuario.findOne({ rut: rut });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const mascota = usuario.mascotas.id(req.params.idMascota);
        if (!mascota) return res.status(404).json({ message: "Mascota no encontrada" });

        Object.assign(mascota, req.body);
        await usuario.save();
        res.json(mascota);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE Eliminar
router.delete('/:rutCliente/mascotas/:idMascota', async (req, res) => {
    try {
        const rut = obtenerRut(req.params.rutCliente);
        const usuario = await Usuario.findOne({ rut: rut });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const mascota = usuario.mascotas.id(req.params.idMascota);
        if (!mascota) return res.status(404).json({ message: "Mascota no encontrada" });

        mascota.deleteOne();
        await usuario.save();
        res.json({ message: "Mascota eliminada" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;