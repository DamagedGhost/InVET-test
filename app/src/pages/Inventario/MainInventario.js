import React from 'react';
import AdminTemplate from "../../templates/AdminTemplate";
import Button from '../../components/atoms/Button';
import useProductsViewModel from '../../viewmodels/useProductsViewModel'; // 1. Importar

const MainInventario = () => {
    const { products } = useProductsViewModel(); // 2. Obtener productos

    // 3. Encontrar el producto más reciente (el ID es un timestamp)
    const ultimoProducto = products.reduce((max, p) => (p.id > max.id ? p : max), products[0]);
    const ultimaActualizacion = new Date(ultimoProducto?.id || Date.now()).toLocaleDateString('es-CL');

    return (
        <AdminTemplate>
          <main className="flex-grow-1" id="main-content" role="main">
            <div className="container-fluid py-4">
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Inventario</li>
                </ol>
              </nav>

              <header className="d-flex align-items-start justify-content-between mb-4">
                <div>
                  <h1 className="h4 mb-1">Gestión de Inventario</h1>
                  <p className="text-muted mb-0">Visualiza, crea y administra los productos del inventario.</p>
                </div>
                <div className="d-flex gap-2">
                  <Button label="Crear producto" href="/Admin/Inventario/NuevoProducto" />
                  <Button label="Mostrar productos" href="/Admin/Inventario/ListadoProductos" />
                  <Button label="Reporte de productos" variant="outline-secondary" href="/Admin/Inventario/ProductoReporte" />
                  <Button label="Productos críticos" variant="outline-danger" href="/Admin/Inventario/ProductosCriticos" />
                </div>
              </header>

              <section aria-labelledby="inventario-overview" className="mb-4">
                <h2 id="inventario-overview" className="visually-hidden">Resumen de inventario</h2>
                <div className="row g-3">
                  <div className="col-sm-6 col-md-6">
                    <div className="card shadow-sm profile-card-animation-1">
                      <div className="card-body">
                        <small className="text-muted">Total productos (SKU)</small>
                        {/* 4. Dato real */}
                        <div className="h5 mt-2">{products.length} Productos</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6">
                    <div className="card shadow-sm profile-card-animation-4">
                      <div className="card-body">
                        <small className="text-muted">Última actualización</small>
                        {/* 5. Dato real */}
                        <div className="h5 mt-2">{ultimaActualizacion}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </main>
        </AdminTemplate>
    );
};

export default MainInventario;