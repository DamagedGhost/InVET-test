import AdminTemplate from "../../../templates/AdminTemplate";
import useProductsViewModel from "../../../viewmodels/useProductsViewModel"; // Importar

const ProductoReporte = () => {
    const { products } = useProductsViewModel(); // Obtener productos

    // Calcular datos
    const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
    const valorInventario = products.reduce((acc, p) => acc + (p.stock * p.price), 0);
    const top5Caros = [...products].sort((a, b) => b.price - a.price).slice(0, 5);

    return (
        <AdminTemplate>
            <main className="flex-grow-1" id="main-content" role="main">
                <div className="container-fluid py-4">
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                            <li className="breadcrumb-item"><a href="/Admin/Inventario">Inventario</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Reporte</li>
                        </ol>
                    </nav>

                    <div className="bg-white p-4 shadow-sm rounded">
                        <h2 className="h5 mb-4">Reporte de Inventario</h2>
                        
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="card shadow-sm">
                                    <div className="card-header">
                                        <h2 className="h5 mb-0">Resumen de Inventario</h2>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between">
                                                <strong>Total de Productos (SKU):</strong> {products.length}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <strong>Unidades Totales (Stock):</strong> {totalStock}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <strong>Valor Total Inventario:</strong> ${valorInventario.toLocaleString()}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card shadow-sm">
                                    <div className="card-header">
                                        <h2 className="h5 mb-0">Top 5 Productos Más Caros</h2>
                                    </div>
                                    <table className="table mb-0">
                                        <thead>
                                            <tr><th>Nombre</th><th>Precio</th></tr>
                                        </thead>
                                        <tbody>
                                            {top5Caros.map(p => (
                                                <tr key={p.id}>
                                                    <td>{p.title}</td>
                                                    <td>${p.price.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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