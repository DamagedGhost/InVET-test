import AdminTemplate from "../../templates/AdminTemplate";
import { useNavigate } from 'react-router-dom';
import useProductsViewModel from "../../viewmodels/useProductsViewModel";

const ListadoProductos = () => {
    
    const { products, deleteProducto } = useProductsViewModel();
    const navigate = useNavigate();

    const handleEliminar = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar (desactivar) este producto?")) {
            deleteProducto(id);
        }
    };

    const handleEditar = (id) => {
        navigate(`/Admin/Inventario/EditarProducto/${id}`);
    };

    return (
        <AdminTemplate>
            <main className="flex-grow-1" id="main-content" role="main">
            <div className="container-fluid py-4">
                <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                    <li className="breadcrumb-item"><a href="/Admin/Inventario">Inventario</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Listado Productos</li>
                </ol>
                </nav>

                <header className="d-flex align-items-start justify-content-between mb-4">
                    <div>
                        <h1 className="h4 mb-1">Gestión de Inventario</h1>
                        <p className="text-muted mb-0">Visualiza, crea y administra los productos.</p>
                    </div>
                    <div className="d-flex gap-2">
                        <a className="btn btn-primary" href="/Admin/Inventario/NuevoProducto">Crear producto</a>
                    </div>
                </header>
                    <div className="table-responsive">
                        <table id="dataTable" className="table table-striped table-bordered align-middle">
                            <thead className="table-light">
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Estado</th> {/* NUEVA COLUMNA */}
                                <th>Categoría</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((producto) => (
                                        <tr key={producto.id} className={producto.activo === false ? 'table-secondary text-muted' : ''}>
                                            <td>{producto.codigo}</td>
                                            <td>
                                                {producto.title}
                                                {producto.activo === false && <span className="badge bg-secondary ms-2">Eliminado</span>}
                                            </td> 
                                            <td>${producto.price.toLocaleString()}</td>
                                            
                                            {/* Stock en rojo si es 0 */}
                                            <td className={producto.stock === 0 ? "text-danger fw-bold" : ""}>
                                                {producto.stock}
                                            </td>
                                            
                                            {/* Lógica de Estado */}
                                            <td>
                                                {producto.activo === false ? (
                                                    <span className="badge bg-danger">Inactivo</span>
                                                ) : (
                                                    <span className="badge bg-success">Activo</span>
                                                )}
                                            </td>
                                            
                                            <td>{producto.categoria}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => handleEditar(producto.id)}
                                                    disabled={producto.activo === false} // Opcional: Bloquear edición si está eliminado
                                                >
                                                    Editar
                                                </button>
                                                {producto.activo !== false && (
                                                    <button 
                                                        className="btn btn-sm btn-danger ms-2"
                                                        onClick={() => handleEliminar(producto.id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No hay productos para mostrar</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </AdminTemplate>
    );
};

export default ListadoProductos;