import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import './App.css';

// Autenticación
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Páginas Generales Admin
import AdminHomePage from './pages/AdminHomePage';

// --- Páginas de Usuarios ---
import MainUsuario from './pages/Usuarios/MainUsuario';
import ListarUsuarios from './pages/Usuarios/ListarUsuarios';
import AgregarUsuario from './pages/Usuarios/AgregarUsuario';
import EditarUsuario from './pages/Usuarios/EditarUsuario';

// --- Páginas de Inventario ---
import MainInventario from './pages/Inventario/MainInventario';
import ListadoProductos from './pages/Inventario/ListadoProductos';
import NuevoProducto from './pages/Inventario/NuevoProducto';
import EditarProducto from './pages/Inventario/EditarProducto';
import ProductoReporte from './pages/Inventario/ProductoReporte';
import ProductosCriticos from './pages/Inventario/ProductosCriticos';

function App() {
  return (
    <>
      <Routes>
        {/* 1. Ruta Pública: Login es la página por defecto '/' */}
        <Route path="/" element={<LoginPage />} />

        {/* 2. Rutas Protegidas (Requieren Login y Rol Admin) */}
        <Route element={<ProtectedRoute />}>
            
            {/* Dashboard Principal */}
            <Route path="/admin" element={<AdminHomePage />} />

            {/* RUTAS DE USUARIOS */}
            <Route path="/admin/usuarios" element={<MainUsuario />} />
            <Route path="/admin/usuarios/listarusuarios" element={<ListarUsuarios />} />
            <Route path="/admin/usuarios/agregarusuario" element={<AgregarUsuario />} />
            {/* :id indica que es un parámetro variable */}
            <Route path="/admin/usuarios/editarusuario/:id" element={<EditarUsuario />} />

            {/* RUTAS DE INVENTARIO */}
            <Route path="/admin/inventario" element={<MainInventario />} />
            <Route path="/admin/inventario/listadoproductos" element={<ListadoProductos />} />
            <Route path="/admin/inventario/nuevoproducto" element={<NuevoProducto />} />
            <Route path="/admin/inventario/editarproducto/:id" element={<EditarProducto />} />
            <Route path="/admin/inventario/productoreporte" element={<ProductoReporte />} />
            <Route path="/admin/inventario/productoscriticos" element={<ProductosCriticos />} />
            
        </Route>

        {/* 3. Ruta 404: Para cuando escriben una URL que no existe */}
        <Route path="*" element={
            <div className="text-center mt-5">
                <h2>404</h2>
                <p>Página no encontrada</p>
                <a href="/">Volver al inicio</a>
            </div>
        } />

      </Routes>
    </>
  );
}

export default App;