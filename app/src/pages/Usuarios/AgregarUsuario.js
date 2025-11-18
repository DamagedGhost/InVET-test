import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTemplate from '../../templates/AdminTemplate';
import useUserViewModel from '../../viewmodels/useUserViewModel';
import Button from '../../components/atoms/Button';

const AgregarUsuario = () => {
    const navigate = useNavigate();
    const { addUser } = useUserViewModel();
    const [formData, setFormData] = useState({
        rut: '',
        nombre: '',
        apellidos: '',
        correo: '',
        password: '',
        rol: 'client', // Valor por defecto
        region: '',
        comuna: '',
        direccion: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(formData);
        alert('Usuario agregado exitosamente');
        navigate('/Admin/Usuarios/ListarUsuarios');
    };

    return (
        <AdminTemplate>
            <section id="main-content" className="flex-grow-1">
                <div className="container-fluid py-4">
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                        <li className="breadcrumb-item"><a href="/Admin/Usuarios">Usuarios</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Nuevo Usuario</li>
                        </ol>
                    </nav>
                    <div className="bg-white p-4 shadow-sm rounded">
                        <h1 className="h4">Nuevo Usuario</h1>
                        <form id="registrationForm" onSubmit={handleSubmit}>
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
                            {/* Contraseña */}
                            <div className="mb-3">
                                <label htmlFor="password">Contraseña *</label>
                                <input type="password" id="password" value={formData.password} onChange={handleChange} required className="form-control" />
                            </div>
                            {/* Tipo de Usuario */}
                            <div className="mb-3">
                                <label htmlFor="rol">Tipo de Usuario: *</label>
                                <select id="rol" value={formData.rol} onChange={handleChange} className="form-select" required>
                                    <option value="client">Cliente</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>
                            {/* Región y Comuna (lado a lado) */}
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
                                <Button label={'Registrar usuario'} type="submit" variant="primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AdminTemplate>
    );
};

export default AgregarUsuario;