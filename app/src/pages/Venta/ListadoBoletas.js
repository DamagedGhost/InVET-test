import React, { useEffect } from 'react';
import AdminTemplate from '../../templates/AdminTemplate';
import useBoletaViewModel from '../../viewmodels/useBoletaViewModel';
import LoadingSpinner from '../../components/atoms/LoadingSpinner';

const ListadoBoletas = () => {
    // Usamos el hook existente
    const { boletas, loading, error } = useBoletaViewModel(); 

    // Opcional: Si quieres refrescar data al entrar
    // useEffect(() => { cargarBoletas() }, []); 
    // (Tu hook ya tiene un useEffect interno, así que debería cargar solo)

    return (
        <AdminTemplate>
            <main className="flex-grow-1" id="main-content">
                <div className="container-fluid py-4">
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                            <li className="breadcrumb-item active">Historial de Ventas</li>
                        </ol>
                    </nav>

                    <div className="bg-white p-4 shadow-sm rounded">
                        <h2 className="h4 mb-4">Historial de Boletas Emitidas</h2>

                        {loading && <LoadingSpinner text="Cargando ventas..." />}
                        {error && <div className="alert alert-danger">Error al cargar ventas</div>}

                        {!loading && !error && (
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered">
                                    <thead className="table-light">
                                        <tr>
                                            <th>ID Boleta</th>
                                            <th>Fecha</th>
                                            <th>Cliente</th>
                                            <th>Total</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {boletas.length > 0 ? (
                                            boletas.map((boleta) => (
                                                <tr key={boleta.id}>
                                                    <td><small>{boleta.id}</small></td>
                                                    <td>{boleta.fecha}</td>
                                                    <td>{boleta.cliente}</td>
                                                    <td className="fw-bold text-success">
                                                        ${boleta.total.toLocaleString()}
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${boleta.estado === 'Emitida' ? 'bg-success' : 'bg-secondary'}`}>
                                                            {boleta.estado}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {/* Aquí podrías agregar un botón para ver detalle completo */}
                                                        <button className="btn btn-sm btn-outline-primary" onClick={() => alert(`Detalle ID: ${boleta.id}`)}>
                                                            <i className="bi bi-eye"></i> Ver
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">No hay ventas registradas.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </AdminTemplate>
    );
};

export default ListadoBoletas;