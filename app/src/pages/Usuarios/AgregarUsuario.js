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
        rol: 'client',
        region: '',
        comuna: '',
        direccion: ''
    });

    // =============================
    // 🔹 SOLO FORMATEAR RUT (sin validar)
    // =============================
    const formatRut = (rut) => {
        rut = rut.replace(/[^\dkK]/g, "").toUpperCase();
        if (rut.length <= 1) return rut;
        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1);
        cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return `${cuerpo}-${dv}`;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === "rut") {
            const limpio = value.replace(/[^\dkK]/g, "").toUpperCase();
            return setFormData((prev) => ({ ...prev, rut: formatRut(limpio) }));
        }

        if (["nombre", "apellidos", "region", "comuna"].includes(id)) {
            if (/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/.test(value)) return;
        }

        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addUser({
            ...formData,
            rut: formData.rut.replace(/\./g, "").replace("-", "")
        });

        alert('Usuario agregado exitosamente');
        navigate('/Admin/Usuarios/ListarUsuarios');
    };

    return (
        <AdminTemplate>
            <section id="main-content" className="flex-grow-1">
                <div className="container-fluid py-4">
                    {/* BREADCRUMB */}
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                            <li className="breadcrumb-item"><a href="/Admin/Usuarios">Usuarios</a></li>
                            <li className="breadcrumb-item active">Nuevo Usuario</li>
                        </ol>
                    </nav>

                    <div className="bg-white p-4 shadow-sm rounded">
                        <h1 className="h4">Nuevo Usuario</h1>

                        <form onSubmit={handleSubmit}>

                            {/* RUT */}
                            <div className="mb-3">
                                <label htmlFor="rut">RUT *</label>
                                <input
                                    type="text"
                                    id="rut"
                                    maxLength={12}
                                    className="form-control"
                                    placeholder="11.111.111-1"
                                    required
                                    value={formData.rut}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Nombre */}
                            <div className="mb-3">
                                <label htmlFor="nombre">Nombre *</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    className="form-control"
                                    required
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Apellidos */}
                            <div className="mb-3">
                                <label htmlFor="apellidos">Apellidos *</label>
                                <input
                                    type="text"
                                    id="apellidos"
                                    className="form-control"
                                    required
                                    value={formData.apellidos}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Correo */}
                            <div className="mb-3">
                                <label htmlFor="correo">Correo *</label>
                                <input
                                    type="email"
                                    id="correo"
                                    className="form-control"
                                    required
                                    value={formData.correo}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label htmlFor="password">Contraseña *</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Rol */}
                            <div className="mb-3">
                                <label htmlFor="rol">Tipo de Usuario *</label>
                                <select
                                    id="rol"
                                    className="form-select"
                                    value={formData.rol}
                                    onChange={handleChange}
                                >
                                    <option value="client">Cliente</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>

                            {/* Región + Comuna */}
                            <div className="mb-3 row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="region">Región *</label>
                                    <input
                                        type="text"
                                        id="region"
                                        className="form-control"
                                        value={formData.region}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="comuna">Comuna *</label>
                                    <input
                                        type="text"
                                        id="comuna"
                                        className="form-control"
                                        value={formData.comuna}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Dirección */}
                            <div className="mb-3">
                                <label htmlFor="direccion">Dirección *</label>
                                <input
                                    type="text"
                                    id="direccion"
                                    className="form-control"
                                    required
                                    value={formData.direccion}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="d-flex gap-2 mt-3 p-3 border-top">
                                <Button label="Registrar usuario" type="submit" variant="primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AdminTemplate>
    );
};

export default AgregarUsuario;
