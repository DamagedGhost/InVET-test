import AdminTemplate from "../../../templates/AdminTemplate";
import { useParams } from 'react-router-dom';
import useUserViewModel from "../../../viewmodels/useUserViewModel";
import useBoletaViewModel from "../../../viewmodels/useBoletaViewModel";

const HistorialCompra = () => {
    const { id } = useParams(); // ID del Usuario
    const { getUserById } = useUserViewModel();
    const { getBoletasByUserId } = useBoletaViewModel();

    const userId = parseInt(id, 10);
    const user = getUserById(userId);
    const historial = getBoletasByUserId(userId);

    if (!user) {
        return <AdminTemplate><p>Usuario no encontrado</p></AdminTemplate>
    }

    return (
        <AdminTemplate>
            <div className="flex-grow-1" id="main-content">
                <div className="container-fluid py-4">
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                        <li className="breadcrumb-item"><a href="/Admin/Usuarios">Usuarios</a></li>
                        <li className="breadcrumb-item"><a href={`/Admin/Usuarios/ListarUsuarios`}>Listado de Usuarios</a></li>
                        <li className="breadcrumb-item active">Historial de Compras</li>
                        </ol>
                    </nav>
                    <div className="bg-white p-4 shadow-sm rounded">
                        <h2 className="h5 mb-4">Historial de Compras de: {user.nombre} {user.apellidos}</h2>
                        <div>
                            <p><strong>RUT:</strong> {user.rut}</p>
                            <p><strong>Correo:</strong> {user.correo}</p>
                        </div>
                        <div>
                            <table id="dataTable" className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID Compra</th>
                                        <th>Fecha</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historial.length > 0 ? (
                                        historial.map((boleta) => (
                                            <tr key={boleta.id}>
                                                <td>{boleta.id}</td>
                                                <td>{boleta.fecha}</td>
                                                <td>${boleta.total.toLocaleString()}</td>
                                                <td>{boleta.estado}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">Este usuario no tiene compras.</td>
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
}

export default HistorialCompra;