import AdminTemplate from "../../../templates/AdminTemplate";
import useProductsViewModel from "../../../viewmodels/useProductsViewModel"; // 1. Importar hook

const ProductosCriticos = () => {
    const { products } = useProductsViewModel(); // 2. Obtener productos

    // 3. Filtrar productos críticos
    const criticos = products.filter(p => p.stock <= p.stockCritico);

    return (
        <AdminTemplate>
            <main className="flex-grow-1" id="main-content" role="main">
                <div className="container-fluid py-4">
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                        <li className="breadcrumb-item"><a href="/Admin/Inventario">Inventario</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Productos Críticos</li>
                        </ol>
                    </nav>
                
                <div className="bg-white p-4 shadow-sm rounded">
                    
                    {/* --- LÍNEA CORREGIDA --- */}
                    {/* Cambiamos (Stock <= Stock Crítico) por (Stock &lt;= Stock Crítico) */}
                    <h2 className="h5 mb-4">Productos Críticos (Stock &lt;= Stock Crítico)</h2>
                    
                    <div className="table-responsive">
                        <table id="dataTable" className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Stock Actual</th>
                                <th>Stock Crítico</th>
                                <th>Categoria</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* 4. Mapear la lista filtrada */}
                                {criticos.length > 0 ? (
                                    criticos.map((p) => (
                                        <tr key={p.id}>
                                            <td>{p.codigo}</td>
                                            <td>{p.title}</td>
                                            <td>{p.stock}</td>
                                            <td>{p.stockCritico}</td>
                                            <td>{p.categoria}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No hay productos con stock crítico.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
        </AdminTemplate>
    );
};

export default ProductosCriticos;