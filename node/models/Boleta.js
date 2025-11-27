const mongoose = require('mongoose');

// Esquema para los items dentro de la boleta (Embedidos)
const ItemBoletaSchema = new mongoose.Schema({
    productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    titulo: { type: String, required: true },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true }
}, { _id: false });

const BoletaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fecha: { type: Date, default: Date.now },
    items: [ItemBoletaSchema],
    total: { type: Number, required: true },
    estado: { type: String, default: 'Emitida' } // Emitida, Anulada, etc.
});

module.exports = mongoose.model('Boleta', BoletaSchema);