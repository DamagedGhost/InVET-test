// src/mi-api-productos/index.js
require('dotenv').config(); 
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./db'); 

// Importación de rutas
const productoRoutes = require('./routes/productos');
const userRoutes = require('./routes/usuarios');
const mascotasRoutes = require('./routes/mascotas');
const boletaRoutes = require('./routes/Boletas'); // <--- 1. IMPORTAR RUTAS DE BOLETAS

connectDB();

const app = express();

app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.originalUrl}`);
    next();
});

// --- Definición de Rutas ---
app.use('/api/productos', productoRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/clientes', mascotasRoutes);
app.use('/api/boletas', boletaRoutes); // <--- 2. USAR LA RUTA

app.get('/', (req, res) => {
    res.send('API REST de InVET activa y conectada a MongoDB.');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`[API] Servidor Express corriendo en el puerto ${PORT}`);
});