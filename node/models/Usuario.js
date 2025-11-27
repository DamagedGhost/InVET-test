// src/mi-api-productos/models/Usuario.js
const mongoose = require('mongoose');

const MascotaSchema = new mongoose.Schema({
    nombre: String,
    especie: String,
    raza: String,
    edad: Number,
    peso: Number
}, { _id: true });

// Definición del esquema para la colección 'usuarios'
const UsuarioSchema = new mongoose.Schema({
    rut: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    correo: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, 
    rol: { type: String, enum: ['admin', 'client'], default: 'client' }, // Rol: admin o client
    region: { type: String },
    comuna: { type: String },
    direccion: { type: String, required: true },
    // El ID (_id) se genera automáticamente por MongoDB

     mascotas: [MascotaSchema]  // ← Aquí van las mascotas
});

module.exports = mongoose.model('Usuario', UsuarioSchema);