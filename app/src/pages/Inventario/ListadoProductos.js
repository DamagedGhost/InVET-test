import AdminTemplate from "../../templates/AdminTemplate";
import { useNavigate } from 'react-router-dom';
import useProductsViewModel from "../../viewmodels/useProductsViewModel"; // 1. Importar el hook

const ListadoProductos = () => {
    
    // 2. Obtener los productos y la función de eliminar
    const { products, deleteProducto } = useProductsViewModel();
    const navigate = useNavigate();

    const handleEliminar = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            deleteProducto(id);
        }
    };

    const handleEditar = (id) => {
        // Navegamos a la página de edición (la creamos en el paso 4)
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
                    <p className="text-muted mb-0">Visualiza, crea y administra los productos del inventario.</p>
                </div>
                <div className="d-flex gap-2">
                    <a className="btn btn-outline-primary" href="/Admin/Inventario/NuevoProducto">Crear producto</a>
                    <a className="btn btn-primary" href="/Admin/Inventario/ListadoProductos">Mostrar productos</a>
                </div>
                </header>
                    <div className="table-responsive">
                        <table id="dataTable" className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Stock Critico</th>
                                <th>Categoria</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                                {/* 3. Mapear los productos para llenar la tabla */}
                                {products.length > 0 ? (
                                    products.map((producto) => (
                                        <tr key={producto.id}>
                                            <td>{producto.codigo}</td>
                                            {/* 'title' es el nombre en tu hook */}
                                            <td>{producto.title}</td> 
                                            <td>${producto.price.toLocaleString()}</td>
                                            <td>{producto.stock}</td>
                                            <td>{producto.stockCritico}</td>
                                            <td>{producto.categoria}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => handleEditar(producto.id)}
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-danger ms-2"
                                                    onClick={() => handleEliminar(producto.id)}
                                                >
                                                    Eliminar
                                                </button>
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