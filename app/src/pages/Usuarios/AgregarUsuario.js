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

    // ===========================
    // 🔹 FORMATEAR RUT (solo formato)
    // ===========================
    const formatRut = (rut) => {
        rut = rut.replace(/[^\dkK]/g, "").toUpperCase();
        if (rut.length <= 1) return rut;

        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1);

        cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return `${cuerpo}-${dv}`;
    };

    // ===========================
    // 🔹 Manejador de inputs
    // ===========================
    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === "rut") {
            const limpio = value.replace(/[^\dkK]/g, "").toUpperCase();
            return setFormData((prev) => ({
                ...prev,
                rut: formatRut(limpio)
            }));
        }

        // Nombres sin números
        if (["nombre", "apellidos", "region", "comuna"].includes(id)) {
            if (/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/.test(value)) return;
        }

        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    // ===========================
    // 🔹 Registrar usuario
    // ===========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        await addUser({
            ...formData,
            rut: formData.rut // rut formateado
        });

        alert("Usuario agregado exitosamente");
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
                            <li className="breadcrumb-item active">Nuevo Usuario</li>
                        </ol>
                    </nav>

                    <div className="bg-white p-4 shadow-sm rounded">
                        <h1 className="h4">Nuevo Usuario</h1>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="rut">RUT *</label>
                                <input
                                    type="text"
                                    id="rut"
                                    maxLength={12}
                                    placeholder="11.111.111-1"
                                    className="form-control"
                                    value={formData.rut}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="nombre">Nombre *</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    className="form-control"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="apellidos">Apellidos *</label>
                                <input
                                    type="text"
                                    id="apellidos"
                                    className="form-control"
                                    value={formData.apellidos}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="correo">Correo *</label>
                                <input
                                    type="email"
                                    id="correo"
                                    className="form-control"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password">Contraseña *</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="rol">Tipo de Usuario *</label>
                                <select
                                    id="rol"
                                    className="form-select"
                                    value={formData.rol}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="client">Cliente</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="region">Región</label>
                                    <input
                                        type="text"
                                        id="region"
                                        className="form-control"
                                        value={formData.region}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="comuna">Comuna</label>
                                    <input
                                        type="text"
                                        id="comuna"
                                        className="form-control"
                                        value={formData.comuna}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="direccion">Dirección *</label>
                                <input
                                    type="text"
                                    id="direccion"
                                    className="form-control"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <Button label="Registrar usuario" type="submit" variant="primary" />
                        </form>

                    </div>
                </div>
            </section>
        </AdminTemplate>
    );
};

export default AgregarUsuario;
