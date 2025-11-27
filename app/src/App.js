import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Paginas principales tienda
import HomePage from './pages/HomePage';
import ProductosPage from './pages/MainProductos/ProductosPage';
import DetalleProdPage from './pages/MainProductos/DetalleProdPage';
import CategoriasPage from './pages/Categorias/CategoriasPage';
import NosotrosPage from './pages/Nosotros/NosotrosPage';

// Paginas carrito
import CarritoPage from './pages/Carrito/CarritoPage';
import CompraPage from './pages/Carrito/CompraPage';
import PagoCorrectoPage from './pages/Carrito/PagoCorrectoPage';
import PagoErrorPage from './pages/Carrito/PagoErrorPage';

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

// --- CRUD de Mascotas ---
import MainMascotas from './pages/Clientes/Mascotas/MainMascotas';
import ListarMascotasPage from './pages/Clientes/Mascotas/ListarMascotasPage';
import NuevaMascota from './pages/Clientes/Mascotas/NuevaMascota';
import EditarMascota from './pages/Clientes/Mascotas/EditarMascota';

function App() {
  return (
    <>
      <Routes>

        {/* Rutas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/productos" element={<ProductosPage />} />

        {/* Detalle Producto */}
        <Route path="/productos/:title" element={<DetalleProdPage />} />

        {/* Carrito */}
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/compra" element={<CompraPage />} />
        <Route path="/pago-correcto" element={<PagoCorrectoPage />} />
        <Route path="/pago-error" element={<PagoErrorPage />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🔐 Rutas Protegidas */}
        <Route element={<ProtectedRoute />}>

          {/* Dashboard Admin */}
          <Route path="/admin" element={<AdminHomePage />} />

          {/* CRUD Usuarios */}
          <Route path="/admin/usuarios" element={<MainUsuario />} />
          <Route path="/admin/usuarios/listarusuarios" element={<ListarUsuarios />} />
          <Route path="/admin/usuarios/agregarusuario" element={<AgregarUsuario />} />
          <Route path="/admin/usuarios/editarusuario/:id" element={<EditarUsuario />} />

          {/* CRUD Inventario */}
          <Route path="/admin/inventario" element={<MainInventario />} />
          <Route path="/admin/inventario/listadoproductos" element={<ListadoProductos />} />
          <Route path="/admin/inventario/nuevoproducto" element={<NuevoProducto />} />
          <Route path="/admin/inventario/editarproducto/:id" element={<EditarProducto />} />
          <Route path="/admin/inventario/productoreporte" element={<ProductoReporte />} />
          <Route path="/admin/inventario/productoscriticos" element={<ProductosCriticos />} />

          {/* CRUD Mascotas */}
          <Route path="/admin/clientes/mascotas" element={<MainMascotas />} />
          <Route path="/admin/clientes/mascotas/listar" element={<ListarMascotasPage />} />
          <Route path="/admin/clientes/mascotas/nueva" element={<NuevaMascota />} />
          <Route path="/admin/clientes/mascotas/editar/:id" element={<EditarMascota />} />

        </Route>

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="text-center mt-5">
              <h2>404</h2>
              <p>Página no encontrada</p>
              <a href="/">Volver al inicio</a>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
