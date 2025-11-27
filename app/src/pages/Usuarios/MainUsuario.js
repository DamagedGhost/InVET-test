import React from 'react';
import AdminTemplate from "../../templates/AdminTemplate";
import Button from "../../components/atoms/Button";
import useUserViewModel from '../../viewmodels/useUserViewModel';
import LoadingSpinner from '../../components/atoms/LoadingSpinner';

const MainUsuario = () => {
    const { users, loading } = useUserViewModel();

    // --- LÓGICA DE NEGOCIO ---
    
    // 1. Total de Usuarios
    const totalUsuarios = users.length;

    // 2. Desglose por Rol
    const admins = users.filter(u => u.rol === 'admin').length;
    const clientes = users.filter(u => u.rol !== 'admin').length; // Asumimos que si no es admin, es cliente/staff

    // 3. Total de Mascotas (Recorremos usuarios y sumamos sus mascotas)
    const totalMascotas = users.reduce((acc, u) => {
        return acc + (u.mascotas ? u.mascotas.length : 0);
    }, 0);

    // 4. Promedio de mascotas por cliente (solo clientes con mascotas)
    const promedioMascotas = clientes > 0 ? (totalMascotas / clientes).toFixed(1) : 0;

    if (loading) {
        return (
            <AdminTemplate>
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <LoadingSpinner text="Cargando base de datos de usuarios..." />
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
                            <li className="breadcrumb-item active" aria-current="page">Usuarios</li>
                        </ol>
                    </nav>

                    {/* Header */}
                    <header className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-5 gap-3">
                        <div>
                            <h1 className="h3 fw-bold text-dark mb-1">
                                <i className="bi bi-people-fill me-2 text-primary"></i>
                                Gestión de Usuarios
                            </h1>
                            <p className="text-muted mb-0">Administra cuentas, roles y perfiles de clientes.</p>
                        </div>
                        
                        <div className="d-flex flex-wrap gap-2">
                            <Button 
                                label="Nuevo Usuario" 
                                href="/Admin/Usuarios/AgregarUsuario" 
                                variant="success" 
                                icon={<i className="bi bi-person-plus-fill me-2"></i>}
                            />
                            <Button 
                                label="Ver Listado Completo" 
                                href="/Admin/Usuarios/ListarUsuarios" 
                                variant="outline-primary" 
                            />
                        </div>
                    </header>

                    {/* Tarjetas de Resumen (KPIs) */}
                    <section aria-labelledby="users-overview" className="mb-5">
                        <h2 id="users-overview" className="visually-hidden">Resumen de usuarios</h2>
                        
                        <div className="row g-4">
                            {/* Tarjeta 1: Total Usuarios */}
                            <div className="col-sm-6 col-lg-3">
                                <div className="card shadow-sm border-0 border-start border-4 border-primary h-100">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <div>
                                            <span className="text-uppercase text-muted small fw-bold">Total Cuentas</span>
                                            <h2 className="mb-0 fw-bold text-dark">{totalUsuarios}</h2>
                                        </div>
                                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                                            <i className="bi bi-person-badge fs-4"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta 2: Clientes Activos */}
                            <div className="col-sm-6 col-lg-3">
                                <div className="card shadow-sm border-0 border-start border-4 border-info h-100">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <div>
                                            <span className="text-uppercase text-muted small fw-bold">Clientes</span>
                                            <h2 className="mb-0 fw-bold text-dark">{clientes}</h2>
                                            <small className="text-muted" style={{fontSize: '0.75rem'}}>{admins} Admins</small>
                                        </div>
                                        <div className="bg-info bg-opacity-10 p-3 rounded-circle text-info">
                                            <i className="bi bi-people fs-4"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta 3: Total Mascotas (¡NUEVO!) */}
                            <div className="col-sm-6 col-lg-3">
                                <div className="card shadow-sm border-0 border-start border-4 border-warning h-100">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <div>
                                            <span className="text-uppercase text-muted small fw-bold">Pacientes (Mascotas)</span>
                                            <h2 className="mb-0 fw-bold text-dark">{totalMascotas}</h2>
                                        </div>
                                        <div className="bg-warning bg-opacity-10 p-3 rounded-circle text-warning">
                                            <i className="bi bi-heart-pulse fs-4"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta 4: Promedio */}
                            <div className="col-sm-6 col-lg-3">
                                <div className="card shadow-sm border-0 border-start border-4 border-success h-100">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <div>
                                            <span className="text-uppercase text-muted small fw-bold">Promedio / Cliente</span>
                                            <h2 className="mb-0 fw-bold text-dark">{promedioMascotas}</h2>
                                            <small className="text-success small fw-bold">Mascotas por dueño</small>
                                        </div>
                                        <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                                            <i className="bi bi-graph-up-arrow fs-4"></i>
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
                                <a href="/Admin/Usuarios/AgregarUsuario" className="card p-4 border-0 shadow-sm text-decoration-none hover-card h-100">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-success bg-opacity-10 p-3 rounded me-3">
                                            <i className="bi bi-person-plus-fill text-success fs-3"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1 text-dark fw-bold">Registrar Cliente</h6>
                                            <small className="text-muted">Crea una nueva cuenta para acceder a la tienda.</small>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="/Admin/Usuarios/ListarUsuarios" className="card p-4 border-0 shadow-sm text-decoration-none hover-card h-100">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
                                            <i className="bi bi-list-ul text-primary fs-3"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1 text-dark fw-bold">Directorio Completo</h6>
                                            <small className="text-muted">Busca, edita o elimina usuarios del sistema.</small>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                {/* Este enlace lleva directo a gestionar mascotas, útil integración */}
                                <a href="/admin/clientes/mascotas" className="card p-4 border-0 shadow-sm text-decoration-none hover-card h-100">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-warning bg-opacity-10 p-3 rounded me-3">
                                            <i className="bi bi-journal-medical text-warning fs-3"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1 text-dark fw-bold">Fichas Clínicas</h6>
                                            <small className="text-muted">Gestionar historial y datos de mascotas.</small>
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
}

export default MainUsuario;