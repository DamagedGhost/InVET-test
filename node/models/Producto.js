// src/mi-api-productos/models/Producto.js
const mongoose = require('mongoose');

// Definición del esquema para la colección 'productos'
const ProductoSchema = new mongoose.Schema({
    // Utilizamos 'codigo' como identificador único
    codigo: { type: String, required: true, unique: true }, 
    title: { type: String, required: true },
    descripcion: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    stockCritico: { type: Number, default: 5 },
    categoria: { type: String, required: true },
    image: { type: String }, // URL de la imagen
    miniatura1: { type: String },
    miniatura2: { type: String },
    // El ID (_id) se genera automáticamente por MongoDB
});

module.exports = mongoose.model('Producto', ProductoSchema);