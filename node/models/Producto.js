const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true }, 
    title: { type: String, required: true },
    descripcion: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    stockCritico: { type: Number, default: 5 },
    categoria: { type: String, required: true },
    image: { type: String }, 
    miniatura1: { type: String },
    miniatura2: { type: String },
    
    // CAMBIO VET-10: Flag para eliminación lógica
    activo: { type: Boolean, default: true } 
});

module.exports = mongoose.model('Producto', ProductoSchema);