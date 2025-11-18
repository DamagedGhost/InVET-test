import { useState } from 'react';
// import { useState, useEffect } from 'react';

// Tu lista original de usuarios
const mockUsers = [
    { id: 1, rut: '11.111.111-1', nombre: 'Juan', apellidos: 'Pérez', correo: 'admin@mail.com', password: '123', rol: 'admin', region: 'Metropolitana', comuna: 'Santiago', direccion: 'Calle Falsa 123' },
    { id: 2, rut: '12.222.222-2', nombre: 'Ana', apellidos: 'Gómez', correo: 'cliente@mail.com', password: '123', rol: 'client', region: 'Valparaíso', comuna: 'Viña del Mar', direccion: 'Av. Siempre Viva 456' },
    // ... (agregué solo 2 para el ejemplo, pero tu lista completa está bien)
];

const DB_NAME = 'users';

// Carga inicial de usuarios
const loadUsers = () => {
  try {
    const data = localStorage.getItem(DB_NAME);
    if (data) {
      return JSON.parse(data);
    } else {
      // Si no hay nada, cargamos los datos iniciales y los guardamos
      localStorage.setItem(DB_NAME, JSON.stringify(mockUsers));
      return mockUsers;
    }
  } catch (error) {
    console.error("Error al cargar usuarios", error);
    return mockUsers;
  }
};

const useUserViewModel = () => {
  const [users, setUsers] = useState(() => loadUsers());

  // Función interna para guardar
  const _saveAndSet = (newUsers) => {
    localStorage.setItem(DB_NAME, JSON.stringify(newUsers));
    setUsers(newUsers);
  };

  // --- FUNCIÓN CREATE ---
  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      rol: userData.rol || 'client' // Rol por defecto
    };
    const updatedUsers = [...users, newUser];
    _saveAndSet(updatedUsers);
  };

  // --- FUNCIÓN READ (Single) ---
  const getUserById = (id) => {
    return users.find(u => u.id === id);
  };

  // --- FUNCIÓN UPDATE ---
  const updateUser = (id, updatedData) => {
    const updatedUsers = users.map(u => 
      u.id === id ? { ...u, ...updatedData } : u
    );
    _saveAndSet(updatedUsers);
  };

  // --- FUNCIÓN DELETE ---
  const deleteUser = (id) => {
    const updatedUsers = users.filter(u => u.id !== id);
    _saveAndSet(updatedUsers);
  };

  // --- FUNCIÓN DE LOGIN ---
  const findUserByEmailAndPassword = (correo, password) => {
    return users.find(u => u.correo === correo && u.password === password);
  };

  return { 
    users, 
    addUser, 
    getUserById, 
    updateUser, 
    deleteUser,
    findUserByEmailAndPassword // <--- IMPORTANTE PARA LOGIN
  };
};

export default useUserViewModel;