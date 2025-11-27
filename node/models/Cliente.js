const mongoose = require('mongoose');

const MascotaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    especie: { type: String, required: true },
    raza: { type: String },
    edad: { type: Number },
    peso: { type: Number },
}, { _id: true });

const ClienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String },
    direccion: { type: String },
    tipo_persona: { type: String, default: 'CLIENTE' },

    mascotas: [MascotaSchema] // <-- Anidado aquí
});

module.exports = mongoose.model('Cliente', ClienteSchema);
