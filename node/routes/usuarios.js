// src/mi-api-productos/routes/usuarios.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); // Importa el modelo

// POST /api/usuarios/login
// Lógica de autenticación
router.post('/login', async (req, res) => {
    const { correo, password } = req.body;
    console.log(`[AUTH] Intento de login para: ${correo}`); // Depuración: Quién intenta iniciar sesión
    
    try {
        // Buscar el usuario por correo
        const user = await Usuario.findOne({ correo });

        // 1. Verificar si el usuario existe
        if (!user) {
            console.log(`[AUTH] ❌ Correo no encontrado: ${correo}`);
            return res.status(401).json({ message: 'Credenciales inválidas: Correo no encontrado' });
        }

        // 2. Verificar la contraseña (SIN HASHING por simplicidad, ¡PERO PELIGROSO en producción!)
        if (user.password !== password) {
            console.log(`[AUTH] ❌ Contraseña incorrecta para: ${correo}`);
            return res.status(401).json({ message: 'Credenciales inválidas: Contraseña incorrecta' });
        }
        
        console.log(`[AUTH] ✅ Login exitoso para ${correo} (${user.rol})`);

        // Si las credenciales son correctas, devolvemos los datos del usuario (excluyendo la contraseña)
        const userObject = user.toObject();
        delete userObject.password; 

        res.json({ 
            message: 'Login exitoso', 
            user: {
                id: userObject._id, 
                ...userObject 
            }
        });

    } catch (error) {
        console.error(`[AUTH] Error interno al intentar login: ${error.message}`);
        res.status(500).json({ message: 'Error del servidor durante el login' });
    }
});


// POST /api/usuarios
// Crear un nuevo usuario (Registro)
router.post('/', async (req, res) => {
    console.log('[USER] ➕ Recibiendo datos para nuevo usuario:', req.body.correo);
    try {
        const newUser = new Usuario(req.body);
        const savedUser = await newUser.save();
        
        console.log(`[USER] ✅ Usuario creado con ID: ${savedUser._id}`);

        const userObject = savedUser.toObject();
        delete userObject.password; 

        res.status(201).json({ 
            message: 'Usuario creado exitosamente',
            user: { id: userObject._id, ...userObject }
        });
    } catch (error) {
        let message = 'Error al crear usuario';
        if (error.code === 11000) { 
            message = 'El RUT o Correo ya están registrados.';
        }
        console.error(`[USER] ❌ Error al crear usuario: ${message} - ${error.message}`);
        res.status(400).json({ message, error: error.message });
    }
});


// GET /api/usuarios
// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await Usuario.find().sort({ nombre: 1 }).select('-password');
        console.log(`[USER] 🔎 Devolviendo ${users.length} usuarios.`);
        
        const mappedUsers = users.map(user => ({
            id: user._id,
            ...user.toObject() 
        }));

        res.json(mappedUsers);
    } catch (error) {
        console.error(`[USER] ❌ Error al listar usuarios: ${error.message}`);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});


// PUT /api/usuarios/:id
// Actualizar un usuario por su ID
router.put('/:id', async (req, res) => {
    console.log(`[USER] ✍️ Petición de actualización para ID: ${req.params.id}`);
    try {
        if (req.body.password === undefined || req.body.password === '') {
            delete req.body.password;
        }

        const updatedUser = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password'); 
        
        if (!updatedUser) {
            console.log(`[USER] ❌ ID de usuario no encontrado: ${req.params.id}`);
            return res.status(404).json({ message: 'Usuario no encontrado para actualizar' });
        }
        
        console.log(`[USER] ✅ Usuario ${req.params.id} actualizado.`);

        const userObject = updatedUser.toObject();
        res.json({ 
            message: 'Usuario actualizado exitosamente',
            user: { id: userObject._id, ...userObject }
        });
    } catch (error) {
        console.error(`[USER] ❌ Error al actualizar usuario: ${error.message}`);
        res.status(400).json({ message: 'Error al actualizar usuario', error: error.message });
    }
});


// DELETE /api/usuarios/:id
// Eliminar un usuario por su ID
router.delete('/:id', async (req, res) => {
    console.log(`[USER] 🗑️ Petición de eliminación para ID: ${req.params.id}`);
    try {
        const deletedUser = await Usuario.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            console.log(`[USER] ❌ ID de usuario no encontrado: ${req.params.id}`);
            return res.status(404).json({ message: 'Usuario no encontrado para eliminar' });
        }
        console.log(`[USER] ✅ Usuario ${req.params.id} eliminado.`);
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error(`[USER] ❌ Error al eliminar usuario: ${error.message}`);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
});


module.exports = router;