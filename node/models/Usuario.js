// src/mi-api-productos/models/Usuario.js
const mongoose = require('mongoose');

// Definición del esquema para la colección 'usuarios'
const UsuarioSchema = new mongoose.Schema({
    rut: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    correo: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, // Nota: En un entorno real se usaría hashing (ej. bcrypt)
    rol: { type: String, enum: ['admin', 'client'], default: 'client' }, // Rol: admin o client
    region: { type: String },
    comuna: { type: String },
    direccion: { type: String, required: true },
    // El ID (_id) se genera automáticamente por MongoDB
});

module.exports = mongoose.model('Usuario', UsuarioSchema);