// src/mi-api-productos/crearAdmin.js
require('dotenv').config(); // Cargar variables de entorno
const mongoose = require('mongoose');
const Usuario = require('./models/Usuario'); // Importar el modelo de Usuario
const connectDB = require('./db'); // Importar la conexión a la DB

const crearAdmin = async () => {
    //  Conectar a la base de datos
    await connectDB();

    //  Definir los datos del usuario Admin
    // Estos campos coinciden con los que definiste en models/Usuario.js
    const adminData = {
        rut: '99.999.999-K',          // RUT ficticio para el admin
        nombre: 'Super',
        apellidos: 'Administrador',
        correo: 'admin@mail.com',      // Correo para el login
        password: '123',               // Contraseña simple (SIN encriptar por ahora)
        rol: 'admin',                  // Rol clave para acceder al panel de administración
        region: 'Metropolitana',
        comuna: 'Santiago',
        direccion: 'Oficina Central 123'
    };

    try {
        //  Verificar si ya existe
        const existeAdmin = await Usuario.findOne({ correo: adminData.correo });
        
        if (existeAdmin) {
            console.log(' El usuario admin ya existe en la base de datos.');
            // Opcional: Si quieres sobrescribirlo/actualizarlo, descomenta la siguiente línea:
            // await Usuario.findOneAndUpdate({ correo: adminData.correo }, adminData);
        } else {
            //  Crear el usuario
            const nuevoAdmin = new Usuario(adminData);
            await nuevoAdmin.save();
            console.log(' Usuario ADMIN creado exitosamente:');
            console.log(`   - Correo: ${adminData.correo}`);
            console.log(`   - Contraseña: ${adminData.password}`);
        }

    } catch (error) {
        console.error(' Error al crear el usuario admin:', error.message);
    } finally {
        //  Cerrar la conexión y terminar el script
        mongoose.connection.close();
        process.exit();
    }
};

// Ejecutar la función
crearAdmin();