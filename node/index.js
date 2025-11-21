// src/mi-api-productos/index.js
require('dotenv').config(); // Carga las variables de entorno desde .env
const express = require('express');
const cors = require('cors'); // Para permitir peticiones desde React (puerto 3000)
const connectDB = require('./db'); // Importa la función de conexión a la DB

// Importación de rutas
const productoRoutes = require('./routes/productos');
const userRoutes = require('./routes/usuarios');

// ---  Inicialización y Conexión a DB ---
connectDB();

const app = express();

// ---  Middlewares ---
// CORS: Permite que React (que correrá en un puerto diferente) pueda hacer peticiones
app.use(cors()); 
// Body Parser: Permite a Express leer JSON en el body de las peticiones (POST, PUT)
app.use(express.json());

// Middleware de Logging (Depuración Global)
app.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.originalUrl}`);
    next();
});

// --- Definición de Rutas (Endpoints) ---
// Las rutas de productos se manejarán con el prefijo /api/productos
app.use('/api/productos', productoRoutes);

// Las rutas de usuarios y login se manejarán con el prefijo /api/usuarios
app.use('/api/usuarios', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API REST de InVET activa y conectada a MongoDB.');
});

// --- Inicialización del Servidor ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`[API] Servidor Express corriendo en el puerto ${PORT}`);
});