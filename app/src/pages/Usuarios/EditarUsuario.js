import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminTemplate from "../../templates/AdminTemplate";
import useUserViewModel from '../../viewmodels/useUserViewModel';
import Button from '../../components/atoms/Button';

const EditarUsuario = () => {
    const { id } = useParams(); // <-- Obtener el ID (que es el _id de MongoDB)
    const navigate = useNavigate();
    // 1. Reemplazamos getUserById con fetchUserById
    const { fetchUserById, updateUser } = useUserViewModel();
    
    const [formData, setFormData] = useState({
        id: id, // Mantenemos el ID de la URL
        rut: '', nombre: '', apellidos: '', correo: '',
        rol: '', region: '', comuna: '', direccion: ''
        // Nota: la contraseña no se carga por seguridad
    });
    const [isLoading, setIsLoading] = useState(true);

    // Cargar datos del usuario al montar
    useEffect(() => {
        const loadUserData = async () => {
            setIsLoading(true);
            // 2. Usamos la nueva función asíncrona para obtener los datos
            const user = await fetchUserById(id);

            if (user) {
                // El usuario ya viene mapeado con id: _id de Mongo
                setFormData(user);
            } else {
                // window.alert("Usuario no encontrado o error de conexión."); // Evitar alert
                console.error("Usuario no encontrado o error de conexión.");
                navigate('/Admin/Usuarios/ListarUsuarios');
            }
            setIsLoading(false);
        };
        
        loadUserData();
    }, [id, fetchUserById, navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 3. Await la actualización
        const updatedUser = await updateUser(formData.id, formData);

        if (updatedUser) {
            // window.alert('Usuario actualizado exitosamente'); // Evitar alert
            console.log('Usuario actualizado exitosamente');
            navigate('/Admin/Usuarios/ListarUsuarios');
        }
        // Si no es exitoso, el hook ya mostró un alert de error.
    };
    
    if (isLoading) {
        return <AdminTemplate>Cargando usuario...</AdminTemplate>;
    }


  return (
    <AdminTemplate>
        <section id="main-content" className="flex-grow-1">
            <div className="container fluid py-4">
                <nav aria-label="breadcrumb" className="mb-3">
                    <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                    <li className="breadcrumb-item"><a href="/Admin/Usuarios">Usuarios</a></li>
                    <li className="breadcrumb-item"><a href="/Admin/Usuarios/ListarUsuarios">Listado de Usuarios</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Editar usuario (ID: {formData.id})</li>
                    </ol>
                </nav>
                <div className="bg-white p-4 shadow-sm rounded">
                    <h2 className="h4 mb-4">Editar usuario (ID: {formData.id})</h2>
                    <form id="editForm" onSubmit={handleSubmit}>
                        {/* RUT */}
                        <div className="mb-3">
                        <label htmlFor="rut">RUT *</label>
                        <input type="text" id="rut" value={formData.rut} onChange={handleChange} required className="form-control" />
                        </div>
                        {/* Nombre */}
                        <div className="mb-3">
                        <label htmlFor="nombre">Nombre *</label>
                        <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} required className="form-control" />
                        </div>
                        {/* Apellidos */}
                        <div className="mb-3">
                        <label htmlFor="apellidos">Apellidos *</label>
                        <input type="text" id="apellidos" value={formData.apellidos} onChange={handleChange} required className="form-control" />
                        </div>
                        {/* Correo */}
                        <div className="mb-3">
                        <label htmlFor="correo">Correo *</label>
                        <input type="email" id="correo" value={formData.correo} onChange={handleChange} required className="form-control" />
                        </div>
                        {/* Tipo de Usuario */}
                        <div className="mb-3">
                        <label htmlFor="rol">Tipo de Usuario: *</label>
                        <select id="rol" value={formData.rol} onChange={handleChange} className="form-select" required>
                            <option value="client">Cliente</option>
                            <option value="admin">Administrador</option>
                        </select>
                        </div>
                        {/* Región y Comuna */}
                        <div className="mb-3 row g-3">
                        <div className="col-md-6">
                            <label htmlFor="region" className="form-label">Región</label>
                            <input type="text" id="region" value={formData.region} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="comuna" className="form-label">Comuna</label>
                            <input type="text" id="comuna" value={formData.comuna} onChange={handleChange} className="form-control" />
                        </div>
                        </div>
                        {/* Dirección */}
                        <div className="mb-3">
                        <label htmlFor="direccion">Dirección: *</label>
                        <input type="text" id="direccion" value={formData.direccion} onChange={handleChange} required className="form-control" />
                        </div>
                        {/* Botón */}
                        <div className="d-flex gap-2 mt-3 p-3 border-top">
                        <Button type="submit" label="Modificar Usuario" variant="primary" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </AdminTemplate>
  );
};
export default EditarUsuario;