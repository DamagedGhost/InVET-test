import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // 1. ¿Hay un usuario logueado?
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. ¿El usuario es 'admin'?
  if (user.rol !== 'admin') {
    // Si es un cliente, lo mandamos a la home
    return <Navigate to="/" replace />;
  }

  // 3. Si es admin, dejamos que vea el contenido
  return <Outlet />;
};

export default ProtectedRoute;