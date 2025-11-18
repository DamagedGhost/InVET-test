// src/mi-api-productos/db.js
const mongoose = require('mongoose');

// Función para conectar a la base de datos
const connectDB = async () => {
    try {
        // Obtenemos la URI de conexión desde las variables de entorno
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error de conexión a MongoDB: ${error.message}`);
        // Salir del proceso si hay un error crítico en la conexión
        process.exit(1); 
    }
};

module.exports = connectDB;