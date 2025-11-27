const express = require("express");
const router = express.Router();
const Cliente = require("../models/Cliente");

// ===============================
// Crear mascota
// ===============================
router.post("/:idCliente/mascotas", async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.idCliente);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const nuevaMascota = {
            nombre: req.body.nombre,
            especie: req.body.especie,
            raza: req.body.raza,
            edad: req.body.edad,
            peso: req.body.peso
        };

        cliente.mascotas.push(nuevaMascota);
        await cliente.save();

        return res.status(201).json(cliente.mascotas.at(-1));
    } catch (error) {
        return res.status(500).json({ message: "Error al crear mascota", error });
    }
});

// ===============================
// Obtener mascotas del cliente
// ===============================
router.get("/:idCliente/mascotas", async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.idCliente);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        return res.json(cliente.mascotas || []);
    } 
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error });
    }
});

// ===============================
// Obtener mascota por ID
// ===============================
router.get("/:idCliente/mascotas/:idMascota", async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.idCliente);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const mascota = cliente.mascotas.id(req.params.idMascota);
        if (!mascota) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }

        return res.json(mascota);
    } 
    catch (error) {
        return res.status(500).json({ message: "Error al obtener mascota", error });
    }
});

// ===============================
// Actualizar mascota
// ===============================
router.put("/:idCliente/mascotas/:idMascota", async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.idCliente);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const mascota = cliente.mascotas.id(req.params.idMascota);
        if (!mascota) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }

        mascota.set(req.body);
        await cliente.save();

        return res.json(mascota);
    } 
    catch (error) {
        return res.status(500).json({ message: "Error al actualizar mascota", error });
    }
});

// ===============================
// Eliminar mascota
// ===============================
router.delete("/:idCliente/mascotas/:idMascota", async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.idCliente);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const mascota = cliente.mascotas.id(req.params.idMascota);
        if (!mascota) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }

        mascota.deleteOne();
        await cliente.save();

        return res.json({ message: "Mascota eliminada correctamente" });
    } 
    catch (error) {
        return res.status(500).json({ message: "Error al eliminar mascota", error });
    }
});

module.exports = router;
