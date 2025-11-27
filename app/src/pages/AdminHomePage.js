import React from 'react';
import AdminTemplate from '../templates/AdminTemplate';
import useProductsViewModel from '../viewmodels/useProductsViewModel';
import useUserViewModel from '../viewmodels/useUserViewModel';
import useBoletaViewModel from '../viewmodels/useBoletaViewModel';
import DonutChart from '../components/organisms/Grafico'; // Asegúrate de que este componente exista en esta ruta

const AdminHomePage = () => {
    // 1. Obtenemos todos los datos de nuestros ViewModels
    const { products } = useProductsViewModel();
    const { users } = useUserViewModel();
    const { boletas } = useBoletaViewModel();

    // 2. Preparamos los datos para los gráficos
    
    // --- Gráfico 1: Productos por Categoría ---
    const productData = products.reduce((acc, p) => {
        const categoria = p.categoria || 'Sin Categoría';
        const existing = acc.find(item => item.label === categoria);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ id: acc.length, value: 1, label: categoria });
        }
        return acc;
    }, []);

    // --- Gráfico 2: Usuarios por Rol ---
    const userData = users.reduce((acc, u) => {
        // Mapeamos 'admin' a Admin y cualquier otra cosa a Cliente
        const rol = u.rol === 'admin' ? 'Administradores' : 'Clientes';
        const existing = acc.find(item => item.label === rol);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ id: acc.length, value: 1, label: rol });
        }
        return acc;
    }, []);

    // Cálculo de ganancias totales (Suma de todas las boletas)
    const ventasTotales = boletas.reduce((acc, b) => acc + (b.total || 0), 0);

    return (
      <AdminTemplate>
        <main className="flex-grow-1" id="main-content" role="main">
          <div className="container-fluid py-4">
            
            {/* Header / Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-3">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item active" aria-current="page">Panel de Control</li>
              </ol>
            </nav>
            
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h4">Dashboard General</h1>
                <span className="text-muted small">Resumen de actividad de la clínica</span>
            </div>
            
            {/* 3. Tarjetas de Resumen (KPIs) */}
            <section className="row g-3 mb-5">
                {/* Tarjeta Productos */}
                <div className="col-md-3">
                    <div className="card shadow-sm border-0 h-100 border-start border-4 border-primary">
                        <div className="card-body text-center">
                            <i className="bi bi-box-seam fs-1 text-primary mb-2"></i>
                            <h5 className="h2 mb-0 fw-bold">{products.length}</h5>
                            <small className="text-muted text-uppercase tracking-wide">Productos (SKU)</small>
                        </div>
                    </div>
                </div>

                {/* Tarjeta Usuarios */}
                <div className="col-md-3">
                    <div className="card shadow-sm border-0 h-100 border-start border-4 border-success">
                        <div className="card-body text-center">
                            <i className="bi bi-people fs-1 text-success mb-2"></i>
                            <h5 className="h2 mb-0 fw-bold">{users.length}</h5>
                            <small className="text-muted text-uppercase tracking-wide">Usuarios Registrados</small>
                        </div>
                    </div>
                </div>

                {/* Tarjeta Ventas (Cantidad) */}
                <div className="col-md-3">
                    <div className="card shadow-sm border-0 h-100 border-start border-4 border-warning">
                        <div className="card-body text-center">
                            <i className="bi bi-receipt fs-1 text-warning mb-2"></i>
                            <h5 className="h2 mb-0 fw-bold">{boletas.length}</h5>
                            <small className="text-muted text-uppercase tracking-wide">Ventas Realizadas</small>
                        </div>
                    </div>
                </div>

                 {/* Tarjeta Ingresos Totales */}
                 <div className="col-md-3">
                    <div className="card shadow-sm border-0 h-100 border-start border-4 border-info">
                        <div className="card-body text-center">
                            <i className="bi bi-currency-dollar fs-1 text-info mb-2"></i>
                            <h5 className="h2 mb-0 fw-bold">${ventasTotales.toLocaleString()}</h5>
                            <small className="text-muted text-uppercase tracking-wide">Ingresos Totales</small>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Sección de Gráficos */}
            <h5 className="mb-3 text-secondary border-bottom pb-2">Estadísticas Visuales</h5>
            <section className="row g-4">
                {/* Gráfico de Categorías */}
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body d-flex flex-column align-items-center">
                             {/* Componente Gráfico Donut */}
                             <DonutChart data={productData} title="Inventario por Categoría" />
                             <p className="mt-3 text-muted small text-center px-3">
                                Distribución de stock actual agrupado por las categorías definidas en el sistema.
                             </p>
                        </div>
                    </div>
                </div>

                {/* Gráfico de Usuarios */}
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body d-flex flex-column align-items-center">
                            {/* Componente Gráfico Donut */}
                            <DonutChart data={userData} title="Usuarios por Rol" />
                            <p className="mt-3 text-muted small text-center px-3">
                                Proporción de usuarios administradores vs. clientes registrados en la plataforma.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Accesos Rápidos (Extra) */}
                <div className="col-md-12 col-lg-2">
                    <div className="card shadow-sm border-0 h-100 bg-light">
                        <div className="card-body d-flex flex-column justify-content-center gap-3">
                            <h6 className="text-center text-muted fw-bold">Accesos Rápidos</h6>
                            <a href="/Admin/Inventario/NuevoProducto" className="btn btn-outline-primary btn-sm w-100">
                                <i className="bi bi-plus-circle me-2"></i>Nuevo Producto
                            </a>
                            <a href="/Admin/Usuarios/AgregarUsuario" className="btn btn-outline-success btn-sm w-100">
                                <i className="bi bi-person-plus me-2"></i>Nuevo Usuario
                            </a>
                            <a href="/Admin/Boleta" className="btn btn-outline-dark btn-sm w-100">
                                <i className="bi bi-search me-2"></i>Ver Ventas
                            </a>
                        </div>
                    </div>
                </div>
            </section>

          </div>
        </main>
      </AdminTemplate>
    );
};

export default AdminHomePage;