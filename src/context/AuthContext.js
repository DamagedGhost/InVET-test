import React, { createContext, useContext, useState, useEffect } from 'react';
import useUserViewModel from '../viewmodels/useUserViewModel';
import { useNavigate } from 'react-router-dom';

const AUTH_KEY = 'authUser'; // Clave para guardar en localStorage
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    // Al cargar, intenta leer el usuario desde localStorage
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem(AUTH_KEY);
        try {
            // Si existe, lo cargamos en el estado
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            console.error("Error al parsear usuario de localStorage", e);
            localStorage.removeItem(AUTH_KEY); // Limpiar si está corrupto
            return null;
        }
    });

    const { findUserByEmailAndPassword } = useUserViewModel();
    const navigate = useNavigate();

    // CUALQUIER cambio en 'user' se guarda en localStorage
    useEffect(() => {
        if (user) {
            // Si el usuario existe (login), lo guardamos
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        } else {
            // Si el usuario es null (logout), lo borramos
            localStorage.removeItem(AUTH_KEY);
        }
    }, [user]); // Este efecto se ejecuta cada vez que 'user' cambia

    // Función de Login (ahora solo setea el estado)
    const login = (email, password) => {
        const foundUser = findUserByEmailAndPassword(email, password);
        if (foundUser) {
            setUser(foundUser); // <-- Esto activa el useEffect y lo guarda
            if (foundUser.rol === 'admin') {
                navigate('/Admin');
            } else {
                navigate('/');
            }
            return true;
        }
        alert('Correo o contraseña incorrectos.');
        return false;
    };

    // Función de Logout (ahora solo limpia el estado)
    const logout = () => {
        setUser(null); // <-- Esto activa el useEffect y lo borra
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para consumir el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};