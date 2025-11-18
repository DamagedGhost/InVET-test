import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//TODO: ESTA ES UNA URL DE PRUEBA, SE CONECTA A UN SERVIDOR EXTERNO, CON EL PROPÓSITO DE PROBAR LA APLICACIÓN EN UN ENTORNO REAL, DEBE SER LA URL DE NUESTRO BACKEND
// URL base de nuestro backend
const API_BASE_URL = 'http://98.91.150.2:5000/api'; 
const AUTH_KEY = 'authUser'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    // Al cargar, intenta leer el usuario desde localStorage
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem(AUTH_KEY);
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            console.error("[FE-AUTH] Error al parsear usuario de localStorage", e);
            localStorage.removeItem(AUTH_KEY); 
            return null;
        }
    });

    const navigate = useNavigate();

    // Sincronizar estado 'user' con localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(AUTH_KEY);
        }
    }, [user]); 

    // Función de Login: Ahora usa la API REST
    const login = async (correo, password) => {
        const url = `${API_BASE_URL}/usuarios/login`;
        console.log(`[FE-AUTH] ➡️ Llamada a login: ${url}`); // Debug: URL de la llamada
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, password }),
            });

            // Debug: Staus y respuesta (si es necesario)
            console.log(`[FE-AUTH] ⬅️ Respuesta de la API, Status: ${response.status}`); 
            
            const data = await response.json();

            if (response.ok) {
                // Login exitoso
                console.log("[FE-AUTH] ✅ Login exitoso. Usuario:", data.user.correo);
                const loggedInUser = data.user;
                setUser(loggedInUser); 
                
                // Redirección basada en el rol
                if (loggedInUser.rol === 'admin') {
                    navigate('/Admin');
                } else {
                    // Por ahora, si no es admin, lo dejamos en /
                    navigate('/');
                }
                return true;
            } else {
                // Login fallido (contraseña o correo incorrectos)
                console.error("[FE-AUTH] ❌ Login fallido. Mensaje:", data.message);
                alert(data.message || 'Error de autenticación.');
                return false;
            }
        } catch (e) {
            console.error("[FE-AUTH] ⚠️ Error de red o conexión. Asegúrate que el backend esté activo en puerto 5000.", e);
            alert('Error de conexión con el servidor. Asegúrate de que el backend esté activo en el puerto 5000.');
            return false;
        }
    };

    // Función de Logout (limpia el estado local y redirige)
    const logout = () => {
        console.log("[FE-AUTH] 🚪 Logout ejecutado.");
        setUser(null); 
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