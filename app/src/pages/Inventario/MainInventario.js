import React from 'react';
import AdminTemplate from "../../templates/AdminTemplate";
import Button from '../../components/atoms/Button';
import useProductsViewModel from '../../viewmodels/useProductsViewModel';
import LoadingSpinner from '../../components/atoms/LoadingSpinner';

const MainInventario = () => {
    const { products, loading } = useProductsViewModel();

    // --- LÓGICA DE DATOS ---
    // 1. Filtramos solo los productos activos para las estadísticas
    const productosActivos = products.filter(p => p.activo !== false);

    // 2. Calculamos KPIs
    const totalProductos = productosActivos.length;
    
    const stockTotal = productosActivos.reduce((acc, p) => acc + p.stock, 0);
    
    const criticos = productosActivos.filter(p => p.stock <= p.stockCritico).length;

    // 3. Encontrar fecha más reciente (usando el ID si es timestamp o Date.now como fallback)
    // Nota: Si usas MongoDB _id, este no es directamente un timestamp comparable así, 
    // pero mantenemos tu lógica original o usamos la fecha actual si no hay datos.
    const ultimaActualizacion = new Date().toLocaleDateString('es-CL', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    if (loading) {
        return (
            <AdminTemplate>
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <LoadingSpinner text="Cargando panel de inventario..." />
                </div>
            </AdminTemplate>
        );
    }

    return (
        <AdminTemplate>
          <main className="flex-grow-1" id="main-content" role="main">
            <div className="container-fluid py-4">
              
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><a href="/Admin" className="text-decoration-none">Administración</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Inventario</li>
                </ol>
              </nav>

              {/* Header con Acciones */}
              <header className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-5 gap-3">
                <div>
                  <h1 className="h3 fw-bold text-dark mb-1">
                    <i className="bi bi-boxes me-2 text-primary"></i>
                    Gestión de Inventario
                  </h1>
                  <p className="text-muted mb-0">Control total de stock, productos y alertas.</p>
                </div>
                
                <div className="d-flex flex-wrap gap-2">
                  <Button 
                    label="Nuevo Producto" 
                    href="/Admin/Inventario/NuevoProducto" 
                    variant="primary" 
                    icon={<i className="bi bi-plus-lg me-2"></i>}
                  />
                  <Button 
                    label="Ver Listado" 
                    href="/Admin/Inventario/ListadoProductos" 
                    variant="outline-primary" 
                  />
                  <Button 
                    label="Reportes" 
                    href="/Admin/Inventario/ProductoReporte" 
                    variant="outline-secondary" 
                  />
                </div>
              </header>

              {/* Tarjetas de Resumen (KPIs) */}
              <section aria-labelledby="inventario-overview" className="mb-5">
                <h2 id="inventario-overview" className="visually-hidden">Resumen de inventario</h2>
                
                <div className="row g-4">
                  {/* Tarjeta 1: Total Productos */}
                  <div className="col-sm-6 col-lg-3">
                    <div className="card shadow-sm border-0 border-start border-4 border-primary h-100">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <span className="text-uppercase text-muted small fw-bold">SKUs Activos</span>
                            <h2 className="mb-0 fw-bold text-dark">{totalProductos}</h2>
                        </div>
                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                            <i className="bi bi-box-seam fs-4"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta 2: Stock Total */}
                  <div className="col-sm-6 col-lg-3">
                    <div className="card shadow-sm border-0 border-start border-4 border-info h-100">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <span className="text-uppercase text-muted small fw-bold">Unidades Totales</span>
                            <h2 className="mb-0 fw-bold text-dark">{stockTotal}</h2>
                        </div>
                        <div className="bg-info bg-opacity-10 p-3 rounded-circle text-info">
                            <i className="bi bi-layers fs-4"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta 3: Críticos (Alerta) */}
                  <div className="col-sm-6 col-lg-3">
                    <div className="card shadow-sm border-0 border-start border-4 border-danger h-100">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <span className="text-uppercase text-danger small fw-bold">Stock Crítico</span>
                            <h2 className="mb-0 fw-bold text-danger">{criticos}</h2>
                        </div>
                        <div className="bg-danger bg-opacity-10 p-3 rounded-circle text-danger">
                            <i className="bi bi-exclamation-triangle fs-4"></i>
                        </div>
                      </div>
                      {criticos > 0 && (
                          <div className="card-footer bg-danger bg-opacity-10 border-0 text-center">
                              <a href="/Admin/Inventario/ProductosCriticos" className="text-danger small fw-bold text-decoration-none stretched-link">
                                  Ver alertas <i className="bi bi-arrow-right"></i>
                              </a>
                          </div>
                      )}
                    </div>
                  </div>

                  {/* Tarjeta 4: Fecha */}
                  <div className="col-sm-6 col-lg-3">
                    <div className="card shadow-sm border-0 border-start border-4 border-secondary h-100">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <span className="text-uppercase text-muted small fw-bold">Sistema</span>
                            <h5 className="mb-0 fw-bold text-dark fs-6">{ultimaActualizacion}</h5>
                            <small className="text-success"><i className="bi bi-check-circle-fill"></i> Operativo</small>
                        </div>
                        <div className="bg-secondary bg-opacity-10 p-3 rounded-circle text-secondary">
                            <i className="bi bi-calendar-check fs-4"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Accesos Rápidos Inferiores */}
              <section>
                  <h5 className="text-muted mb-3">Accesos Directos</h5>
                  <div className="row g-3">
                      <div className="col-md-4">
                          <a href="/Admin/Inventario/ProductosCriticos" className="card p-3 border-0 shadow-sm text-decoration-none hover-card h-100">
                              <div className="d-flex align-items-center">
                                  <i className="bi bi-lightning-charge-fill text-warning fs-3 me-3"></i>
                                  <div>
                                      <h6 className="mb-1 text-dark fw-bold">Revisar Stock Bajo</h6>
                                      <small className="text-muted">Gestiona reabastecimiento urgente</small>
                                  </div>
                              </div>
                          </a>
                      </div>
                      <div className="col-md-4">
                          <a href="/Admin/Inventario/ListadoProductos" className="card p-3 border-0 shadow-sm text-decoration-none hover-card h-100">
                              <div className="d-flex align-items-center">
                                  <i className="bi bi-pencil-square text-primary fs-3 me-3"></i>
                                  <div>
                                      <h6 className="mb-1 text-dark fw-bold">Editar Catálogo</h6>
                                      <small className="text-muted">Modifica precios, nombres y fotos</small>
                                  </div>
                              </div>
                          </a>
                      </div>
                      <div className="col-md-4">
                          <a href="/Admin/Inventario/ProductoReporte" className="card p-3 border-0 shadow-sm text-decoration-none hover-card h-100">
                              <div className="d-flex align-items-center">
                                  <i className="bi bi-bar-chart-line-fill text-success fs-3 me-3"></i>
                                  <div>
                                      <h6 className="mb-1 text-dark fw-bold">Analíticas</h6>
                                      <small className="text-muted">Ver rendimiento del inventario</small>
                                  </div>
                              </div>
                          </a>
                      </div>
                  </div>
              </section>

            </div>
          </main>
        </AdminTemplate>
    );
};

export default MainInventario;