// src/pages/admin/Usuarios/ListarUsuarios.js
import AdminTemplate from "../../../templates/AdminTemplate";
import { useNavigate } from 'react-router-dom'; // Para navegar a editar/historial
import useUserViewModel from "../../../viewmodels/useUserViewModel"; // 1. Importar el hook

const ListarUsuarios = () => {
    
    // 2. Obtener los datos y funciones
    const { users, deleteUser } = useUserViewModel(); 
    const navigate = useNavigate();

    const handleEditar = (id) => {
        // Redirige a la página de edición (deberás implementar esta ruta)
        navigate(`/Admin/Usuarios/EditarUsuario/${id}`); 
    };

    const handleEliminar = (id) => {
        if (window.confirm("¿Eliminar este usuario?")) {
            deleteUser(id);
        }
    };

    
    const handleVerHistorial = (id) => {
        // Redirige al historial de compra (deberás implementar esta ruta)
        navigate(`/Admin/Usuarios/HistorialCompra/${id}`); // <--- Faltaba el ${id}
    };


    return (
        <AdminTemplate>
            <div className="flex-grow-1" id="main-content">
                <div className="container-fluid py-4">
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                        <li className="breadcrumb-item"><a href="/Admin/Usuarios">Usuarios</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Listado de Usuarios</li>
                        </ol>
                    </nav>
                    <div className="bg-white p-4 shadow-sm rounded">
                        <h2 className="h5 mb-4">Menu Listado de Usuarios</h2>
                        <div>
                            <table id="dataTable" className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>RUT</th>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>Correo</th>
                                        <th>Rol</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* 3. Mapear los usuarios a las filas */}
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.rut}</td>
                                            <td>{user.nombre}</td>
                                            <td>{user.apellidos}</td>
                                            <td>{user.correo}</td>
                                            <td>{user.rol}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => handleEditar(user.id)}
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-danger mx-1"
                                                    onClick={() => handleEliminar(user.id)}
                                                >
                                                    Eliminar
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-info"
                                                    onClick={() => handleVerHistorial(user.id)}
                                                >
                                                    Historial
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="text-center">No hay usuarios para mostrar</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminTemplate>
    )
};

export default ListarUsuarios;