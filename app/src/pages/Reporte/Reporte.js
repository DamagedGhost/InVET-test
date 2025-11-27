import React, { useState, useEffect } from 'react';
import AdminTemplate from "../../templates/AdminTemplate";
import useProductsViewModel from "../../viewmodels/useProductsViewModel";
import useUserViewModel from "../../viewmodels/useUserViewModel";
import useBoletaViewModel from "../../viewmodels/useBoletaViewModel";
import LoadingSpinner from "../../components/atoms/LoadingSpinner";

const ProductoReporte = () => {
    // 1. Obtenemos toda la data
    const { products, loading: loadingProd } = useProductsViewModel();
    const { users, loading: loadingUsers } = useUserViewModel();
    const { boletas, loading: loadingBol } = useBoletaViewModel();

    // Estado para el temporizador de HL3
    const [timeLeft, setTimeLeft] = useState("");

    // --- LÓGICA DE NEGOCIO (Cálculos) ---

    // 1. Inventario
    const totalStock = products.reduce((acc, p) => acc + (p.activo !== false ? p.stock : 0), 0);
    const valorInventario = products.reduce((acc, p) => acc + (p.activo !== false ? (p.stock * p.price) : 0), 0);
    const productosInactivos = products.filter(p => p.activo === false).length;
    const productosCriticos = products.filter(p => p.activo !== false && p.stock <= p.stockCritico).length;

    // 2. Mascotas y Usuarios
    // Aplanamos el array de mascotas de todos los usuarios
    const allMascotas = users.reduce((acc, user) => {
        if (user.mascotas && Array.isArray(user.mascotas)) {
            return [...acc, ...user.mascotas];
        }
        return acc;
    }, []);

    const totalMascotas = allMascotas.length;
    
    // Conteo por especie
    const especies = allMascotas.reduce((acc, m) => {
        const esp = (m.especie || "Desconocida").toLowerCase();
        acc[esp] = (acc[esp] || 0) + 1;
        return acc;
    }, {});

    // 3. Ventas
    const ventasTotales = boletas.reduce((acc, b) => acc + b.total, 0);
    const ticketPromedio = boletas.length > 0 ? ventasTotales / boletas.length : 0;
    const itemsVendidos = boletas.reduce((acc, b) => {
        // Asumiendo que b.items tiene la cantidad, si no existe, sumamos 1 por boleta
        const cantidadItems = b.items ? b.items.reduce((iAcc, item) => iAcc + item.cantidad, 0) : 0;
        return acc + cantidadItems;
    }, 0);


    // --- TEMPORIZADOR HALF-LIFE 3 ---
    useEffect(() => {
        // Fecha ficticia de lanzamiento: 3 de Marzo del 3333 (3/3/3333)
        const releaseDate = new Date("3333-03-03T00:00:00");

        const timer = setInterval(() => {
            const now = new Date();
            const difference = releaseDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeLeft("¡CONFIRMADO!");
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    if (loadingProd || loadingUsers || loadingBol) {
        return (
            <AdminTemplate>
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <LoadingSpinner text="Analizando Big Data de InVET..." />
                </div>
            </AdminTemplate>
        );
    }

    return (
        <AdminTemplate>
            <main className="flex-grow-1" id="main-content" role="main">
                <div className="container-fluid py-4">
                    
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1 className="h3 fw-bold text-dark">Reporte Ejecutivo InVET</h1>
                            <p className="text-muted">Resumen estratégico de clínica, tienda y pacientes.</p>
                        </div>
                        <div className="text-end">
                            <span className="badge bg-primary fs-6">
                                {new Date().toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                    </div>

                    {/* SECCIÓN 1: KPIs Principales */}
                    <section className="row g-3 mb-5">
                        <div className="col-md-3">
                            <div className="card shadow-sm border-0 border-bottom border-4 border-success h-100">
                                <div className="card-body">
                                    <h6 className="text-muted text-uppercase mb-2" style={{fontSize: '0.8rem'}}>Ingresos Totales</h6>
                                    <h3 className="fw-bold text-dark mb-0">${ventasTotales.toLocaleString()}</h3>
                                    <small className="text-success fw-bold">
                                        <i className="bi bi-arrow-up-short"></i> 100% Real
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card shadow-sm border-0 border-bottom border-4 border-info h-100">
                                <div className="card-body">
                                    <h6 className="text-muted text-uppercase mb-2" style={{fontSize: '0.8rem'}}>Pacientes Activos</h6>
                                    <h3 className="fw-bold text-dark mb-0">{totalMascotas}</h3>
                                    <small className="text-muted">Mascotas registradas</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card shadow-sm border-0 border-bottom border-4 border-warning h-100">
                                <div className="card-body">
                                    <h6 className="text-muted text-uppercase mb-2" style={{fontSize: '0.8rem'}}>Valor Inventario</h6>
                                    <h3 className="fw-bold text-dark mb-0">${valorInventario.toLocaleString()}</h3>
                                    <small className="text-muted">{totalStock} unidades en stock</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card shadow-sm border-0 border-bottom border-4 border-danger h-100">
                                <div className="card-body">
                                    <h6 className="text-muted text-uppercase mb-2" style={{fontSize: '0.8rem'}}>Alertas de Stock</h6>
                                    <h3 className="fw-bold text-dark mb-0">{productosCriticos}</h3>
                                    <small className="text-danger">Productos bajo el mínimo</small>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="row g-4 mb-5">
                        {/* SECCIÓN 2: Detalles de Inventario */}
                        <div className="col-lg-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0 fw-bold"><i className="bi bi-box-seam me-2 text-primary"></i>Desglose de Inventario</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>Total Productos Activos</span>
                                            <span className="badge bg-success rounded-pill">{products.length - productosInactivos}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>Productos Descontinuados (Inactivos)</span>
                                            <span className="badge bg-secondary rounded-pill">{productosInactivos}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>Ticket Promedio de Venta</span>
                                            <span className="fw-bold">${Math.round(ticketPromedio).toLocaleString()}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>Total Items Vendidos</span>
                                            <span className="fw-bold">{itemsVendidos} u.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN 3: Ecosistema de Mascotas */}
                        <div className="col-lg-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0 fw-bold"><i className="bi bi-heart-pulse me-2 text-danger"></i>Demografía de Pacientes</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row text-center mb-4">
                                        <div className="col-4">
                                            <h4 className="fw-bold text-primary">{especies['perro'] || 0}</h4>
                                            <span className="small text-muted"><i className="bi bi-emoji-sunglasses"></i> Perros</span>
                                        </div>
                                        <div className="col-4 border-start border-end">
                                            <h4 className="fw-bold text-warning">{especies['gato'] || 0}</h4>
                                            <span className="small text-muted"><i className="bi bi-emoji-smile"></i> Gatos</span>
                                        </div>
                                        <div className="col-4">
                                            <h4 className="fw-bold text-success">
                                                {totalMascotas - ((especies['perro']||0) + (especies['gato']||0))}
                                            </h4>
                                            <span className="small text-muted"><i className="bi bi-globe"></i> Otros (Exóticos)</span>
                                        </div>
                                    </div>
                                    <div className="alert alert-light border">
                                        <strong>Dato curioso:</strong> Hay un promedio de {users.length > 0 ? (totalMascotas / users.length).toFixed(1) : 0} mascotas por cliente registrado.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECCIÓN 4: Top Productos */}
                    <div className="card shadow-sm border-0 mb-5">
                         <div className="card-header bg-white py-3">
                            <h5 className="mb-0 fw-bold">🏆 Productos de Mayor Valor</h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Producto</th>
                                        <th>Categoría</th>
                                        <th className="text-end">Precio</th>
                                        <th className="text-center">Stock</th>
                                        <th className="text-center">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...products]
                                        .filter(p => p.activo !== false)
                                        .sort((a, b) => b.price - a.price)
                                        .slice(0, 5)
                                        .map(p => (
                                        <tr key={p.id}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-light rounded p-1 me-3">
                                                        <img src={p.image} alt="" style={{width: '40px', height: '40px', objectFit: 'contain'}} />
                                                    </div>
                                                    <span className="fw-medium">{p.title}</span>
                                                </div>
                                            </td>
                                            <td><span className="badge bg-light text-dark border">{p.categoria}</span></td>
                                            <td className="text-end fw-bold text-success">${p.price.toLocaleString()}</td>
                                            <td className="text-center">{p.stock}</td>
                                            <td className="text-center"><span className="badge bg-success">Activo</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* SECCIÓN 5: EL TEMPORIZADOR (Easter Egg) */}
                    <div className="row justify-content-center mt-5 pt-5 opacity-75">
                        <div className="col-md-8 text-center">
                            <div className="card bg-dark text-white shadow-lg border-0" style={{background: 'linear-gradient(45deg, #1a1a1a, #2c3e50)'}}>
                                <div className="card-body py-4">
                                    <h6 className="text-warning text-uppercase letter-spacing-2 mb-3">
                                        <i className="bi bi-radioactive me-2"></i>Predicción de Lanzamiento: Half-Life 3
                                    </h6>
                                    <h2 className="display-4 fw-bold font-monospace" style={{textShadow: '0 0 10px rgba(255, 193, 7, 0.5)'}}>
                                        {timeLeft}
                                    </h2>
                                    <p className="small text-white-50 mt-2 mb-0">
                                        Calculado por la IA de InVET basado en la alineación de los planetas y el stock de comida de gato.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </AdminTemplate>
    );
}

export default ProductoReporte;