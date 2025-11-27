import React from 'react';
import AdminTemplate from '../../templates/AdminTemplate';
import useBoletaViewModel from '../../viewmodels/useBoletaViewModel';
import LoadingSpinner from '../../components/atoms/LoadingSpinner';

const ListadoBoletas = () => {
    const { boletas, loading, error } = useBoletaViewModel();

    // --- FUNCIÓN PARA VER DETALLE EN ALERT ---
    const handleVerDetalle = (boleta) => {
        // Validación defensiva: Si items viene undefined, usamos array vacío
        const items = boleta.items || [];

        if (items.length === 0) {
            alert("⚠️ Esta boleta no tiene detalles de productos registrados.");
            return;
        }

        // 1. Formatear la lista de productos para texto plano
        const listaProductos = items.map(item => 
            `- ${item.titulo} (x${item.cantidad}): $${(item.precio || 0).toLocaleString()}`
        ).join('\n');

        // 2. Formatear la fecha
        const fechaFormateada = boleta.fecha ? new Date(boleta.fecha).toLocaleString() : 'Fecha desconocida';

        // 3. Construir el mensaje completo
        const mensaje = `
 DETALLE DE BOLETA
--------------------------------------------------
 ID: ${boleta.id}
 Fecha: ${boleta.fecha}
 Cliente: ${boleta.cliente}
 Estado: ${boleta.estado}
--------------------------------------------------
 PRODUCTOS COMPRADOS:
${listaProductos}
--------------------------------------------------
 TOTAL PAGADO: $${(boleta.total || 0).toLocaleString()}
        `;

        // 4. Mostrar la alerta
        alert(mensaje);
    };

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
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="h4 mb-0">Historial de Boletas Emitidas</h2>
                            <span className="badge bg-primary">{boletas.length} Registros</span>
                        </div>

                        {loading && <LoadingSpinner text="Cargando historial de ventas..." />}
                        
                        {error && (
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                <div>Error al cargar las ventas. Intente recargar la página.</div>
                            </div>
                        )}

                        {!loading && !error && (
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col">ID Boleta</th>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Cliente</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col" className="text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {boletas.length > 0 ? (
                                            boletas.map((boleta) => (
                                                <tr key={boleta.id}>
                                                    <td>
                                                        <small className="text-muted font-monospace">
                                                            {boleta.id.substring(boleta.id.length - 8)}...
                                                        </small>
                                                    </td>
                                                    <td>{boleta.fecha}</td>
                                                    <td>{boleta.cliente}</td>
                                                    <td className="fw-bold text-success">
                                                        ${(boleta.total || 0).toLocaleString()}
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${boleta.estado === 'Emitida' ? 'bg-success' : 'bg-secondary'}`}>
                                                            {boleta.estado}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <button 
                                                            className="btn btn-sm btn-outline-primary" 
                                                            onClick={() => handleVerDetalle(boleta)}
                                                            title="Ver detalle completo"
                                                        >
                                                            <i className="bi bi-eye me-1"></i> Ver Detalle
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4 text-muted">
                                                    <i className="bi bi-inbox fs-4 d-block mb-2"></i>
                                                    No hay ventas registradas en el sistema.
                                                </td>
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