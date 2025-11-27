import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminTemplate from '../../src/templates/AdminTemplate';

const AdminHomePage = () => {

    return (
        <AdminTemplate>
            <main className="flex-grow-1" id="main-content" role="main">
                
                {/* 🔥 STATIC HEADER (SIEMPRE VISIBLE) */}
                <div className="container-fluid py-4">
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item active" aria-current="page">
                                Administración
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* 🔥 CONTENIDO DINÁMICO DE LAS RUTAS */}
                <div className="container-fluid">
                    <Outlet /> 
                </div>

            </main>
        </AdminTemplate>
    );
};

export default AdminHomePage;
