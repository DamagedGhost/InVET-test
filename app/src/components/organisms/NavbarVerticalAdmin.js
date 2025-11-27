import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const NavbarVerticalAdmin = () => {
    const { user, logout } = useAuth();
    return (
        <div>
            {/* --- SIDEBAR --- */}
            <aside className="d-flex flex-column justify-content-between vh-100" id="sidebar">
                
                {/* Logo e Identidad */}
                <div>
                    <div className="d-flex align-items-center gap-2 p-3 border-bottom border-secondary">
                        <i className="bi bi-hospital-fill fs-4 text-info"></i>
                        <span className="fs-4 fw-bold tracking-wide">InVET Admin</span>
                    </div>

                    <div className="mt-3 px-2" id="admin-nav-top">
                        <ul className="nav flex-column gap-1">
                            <li className="nav-item">
                                <Link className="nav-link text-white d-flex align-items-center gap-3 py-2 px-3 rounded hover-bg-secondary" to="/Admin">
                                    <i className="bi bi-speedometer2"></i>
                                    Dashboard
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white d-flex align-items-center gap-3 py-2 px-3 rounded" to="/Admin/Boletas">
                                    <i className="bi bi-receipt-cutoff"></i>
                                    Ventas
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white d-flex align-items-center gap-3 py-2 px-3 rounded" to="/Admin/Inventario">
                                    <i className="bi bi-capsule"></i>
                                    Inventario
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white d-flex align-items-center gap-3 py-2 px-3 rounded" to="/Admin/Reporte">
                                    <i className="bi bi-file-earmark-bar-graph"></i>
                                    Reportes
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white d-flex align-items-center gap-3 py-2 px-3 rounded" to="/Admin/Usuarios">
                                    <i className="bi bi-people"></i>
                                    Usuarios
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white d-flex align-items-center gap-3 py-2 px-3 rounded" to="/admin/clientes/mascotas">
                                    <i className="bi bi-heart-pulse"></i>
                                    Pacientes (Mascotas)
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* Footer Sidebar */}
                <div className="p-3 bg-dark bg-opacity-25">
                     <div className="d-flex align-items-center mb-3">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '40px', height: '40px'}}>
                                <span className="fw-bold">{user ? user.nombre.charAt(0) : 'A'}</span>
                            </div>
                            <div className="d-flex flex-column overflow-hidden">
                                <span className="fw-bold text-truncate">{user ? user.nombre : 'Admin'}</span>
                                <small className="text-white-50" style={{fontSize: '0.75rem'}}>{user ? user.rol : 'Staff'}</small>
                            </div>
                    </div>
                    <button className="btn btn-outline-danger w-100 btn-sm d-flex align-items-center justify-content-center gap-2" onClick={logout}>
                        <i className="bi bi-box-arrow-right"></i> Salir
                    </button>
                </div>
            </aside>

            {/* Header: use the same sidebar background variable and text color */}
            <header
                id="header"
                className="d-flex justify-content-between align-items-center shadow-sm px-4 py-2"
                style={{
                    backgroundColor: 'var(--sidebar-bg)',
                    color: 'var(--sidebar-text, #fff)'
                }}
            >
                <h1 className="h5 m-0 fw-semibold" style={{ color: 'inherit' }}>Panel de Control</h1>
                <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-bell fs-5 cursor-pointer" style={{ color: 'inherit' }}></i>
                </div>
            </header>
        </div>
    );
};

export default NavbarVerticalAdmin;