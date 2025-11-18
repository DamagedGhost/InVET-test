import { useState, useEffect, useCallback } from 'react';

//TODO: ESTA ES UNA URL DE PRUEBA, SE CONECTA A UN SERVIDOR EXTERNO, CON EL PROPÓSITO DE PROBAR LA APLICACIÓN EN UN ENTORNO REAL, DEBE SER LA URL DE NUESTRO BACKEND
const API_BASE_URL = 'http://98.91.150.2:5000/api/usuarios';

const useUserViewModel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener todos los usuarios (y recargar el estado)
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        console.log(`[FE-USER] ➡️ Llamada GET: ${API_BASE_URL}`);
        try {
            const response = await fetch(API_BASE_URL);
            console.log(`[FE-USER] ⬅️ Respuesta GET. Status: ${response.status}`);
            
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de usuarios.');
            }
            const data = await response.json();
            
            setUsers(data);
            console.log(`[FE-USER] ✅ ${data.length} usuarios cargados.`);
        } catch (e) {
            setError(e.message);
            console.error("[FE-USER] ❌ Error al cargar usuarios:", e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // --- FUNCIÓN CREATE ---
    const addUser = async (userData) => {
        console.log('[FE-USER] ➡️ Llamada POST para crear:', userData.correo);
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            console.log(`[FE-USER] ⬅️ Respuesta POST. Status: ${response.status}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al agregar usuario.');
            }
            
            console.log('[FE-USER] ✅ Usuario creado exitosamente. Recargando lista...');
            await fetchUsers();
            return data.user; 

        } catch (e) {
            alert(`Error al crear usuario: ${e.message}`);
            console.error("[FE-USER] ❌ Error en POST:", e.message);
            return null;
        }
    };

    // --- FUNCIÓN READ (Single) ---
    const getUserById = (id) => {
        return users.find(u => u.id === id);
    };
    
    // Esta es la versión que hace fetch directo para edición
    const fetchUserById = async (id) => {
        const url = `${API_BASE_URL}/${id}`;
        console.log(`[FE-USER] ➡️ Llamada GET single: ${url}`);
        try {
            const response = await fetch(url);
            console.log(`[FE-USER] ⬅️ Respuesta GET single. Status: ${response.status}`);
            
            if (!response.ok) {
                throw new Error('Usuario no encontrado en la base de datos.');
            }
            const data = await response.json();
            console.log('[FE-USER] ✅ Usuario individual obtenido.');
            return data;
        } catch (e) {
            console.error("[FE-USER] ❌ Error al obtener usuario por ID:", e.message);
            return null;
        }
    };

    // --- FUNCIÓN UPDATE ---
    const updateUser = async (id, updatedData) => {
        const url = `${API_BASE_URL}/${id}`;
        console.log(`[FE-USER] ➡️ Llamada PUT para ID: ${id}`);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            console.log(`[FE-USER] ⬅️ Respuesta PUT. Status: ${response.status}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al actualizar usuario.');
            }

            console.log('[FE-USER] ✅ Usuario actualizado exitosamente. Recargando lista...');
            await fetchUsers();
            return data.user;
            
        } catch (e) {
            alert(`Error al actualizar usuario: ${e.message}`);
            console.error("[FE-USER] ❌ Error en PUT:", e.message);
            return null;
        }
    };

    // --- FUNCIÓN DELETE ---
    const deleteUser = async (id) => {
        const url = `${API_BASE_URL}/${id}`;
        console.log(`[FE-USER] ➡️ Llamada DELETE para ID: ${id}`);
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            
            console.log(`[FE-USER] ⬅️ Respuesta DELETE. Status: ${response.status}`);
            
            if (!response.ok) {
                throw new Error('Error al eliminar usuario.');
            }

            console.log('[FE-USER] ✅ Usuario eliminado exitosamente. Recargando lista...');
            await fetchUsers();
            return true;
            
        } catch (e) {
            alert(`Error al eliminar usuario: ${e.message}`);
            console.error("[FE-USER] ❌ Error en DELETE:", e.message);
            return false;
        }
    };

    // Ya no se usa para login
    const findUserByEmailAndPassword = () => {
        return null;
    };

    return { 
        users, 
        loading,
        error,
        fetchUsers,
        addUser, 
        getUserById, 
        fetchUserById, 
        updateUser, 
        deleteUser,
        findUserByEmailAndPassword 
    };
};

export default useUserViewModel;