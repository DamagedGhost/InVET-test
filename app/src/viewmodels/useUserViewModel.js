import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://98.91.150.2:5000/api/usuarios';

const useUserViewModel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. FETCH ALL
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error('Error al cargar usuarios');
            const data = await response.json();
            const mappedUsers = data.map(u => ({...u, id: u._id || u.id})); 
            setUsers(mappedUsers);
        } catch (e) {
            setError(e.message);
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // 2. CREATE
    const addUser = useCallback(async (userData) => {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error al crear');
            await fetchUsers();
            return data.user; 
        } catch (e) {
            alert(`Error: ${e.message}`);
            return null;
        }
    }, [fetchUsers]);

    // 3. READ SINGLE (Sync)
    const getUserById = useCallback((id) => {
        return users.find(u => u.id === id);
    }, [users]);
    
    // 4. READ SINGLE ASYNC - Arregla carga en EditarUsuario
    const fetchUserById = useCallback(async (id) => {
        const url = `${API_BASE_URL}/${id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Usuario no encontrado');
            const data = await response.json();
            return { ...data, id: data._id };
        } catch (e) {
            console.error("Error fetchUserById:", e);
            return null;
        }
    }, []);

    // 5. UPDATE
    const updateUser = useCallback(async (id, updatedData) => {
        const url = `${API_BASE_URL}/${id}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error al actualizar');
            await fetchUsers();
            return data.user;
        } catch (e) {
            alert(`Error: ${e.message}`);
            return null;
        }
    }, [fetchUsers]);

    // 6. DELETE
    const deleteUser = useCallback(async (id) => {
        const url = `${API_BASE_URL}/${id}`;
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (!response.ok) throw new Error('Error al eliminar');
            await fetchUsers();
            return true;
        } catch (e) {
            alert(`Error: ${e.message}`);
            return false;
        }
    }, [fetchUsers]);

    return { 
        users, loading, error, fetchUsers, addUser, 
        getUserById, fetchUserById, updateUser, deleteUser
    };
};

export default useUserViewModel;