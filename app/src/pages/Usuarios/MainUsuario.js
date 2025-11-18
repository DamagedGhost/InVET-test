import React from 'react';
import AdminTemplate from "../../templates/AdminTemplate";
import Button from "../../components/atoms/Button";

const Usuario = () => {
    return (
        <AdminTemplate>
            <main className="flex-grow-1" id="main-content" role="main">
                <div className="container-fluid py-4">
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Usuarios</li>
                        </ol>
                    </nav>

                    <header className="d-flex align-items-start justify-content-between mb-4">
                        <div>
                            <h1 className="h4 mb-1">Gestión de Usuarios</h1>
                            <p className="text-muted mb-0">Visualiza, crea y administra los usuarios y clientes.</p>
                        </div>
                        <div className="d-flex gap-2">
                            {/* Usamos el componente Button con 'href' para navegar */}
                            <Button label="Agregar Usuario" href="/Admin/Usuarios/AgregarUsuario" />
                            <Button label="Listar Usuarios" href="/Admin/Usuarios/ListarUsuarios" />
                        </div>
                    </header>
                    
                    {/* Aquí podrías agregar tarjetas de resumen como en Inventario */}
                </div>
            </main>
        </AdminTemplate>
    )
}

export default Usuario;