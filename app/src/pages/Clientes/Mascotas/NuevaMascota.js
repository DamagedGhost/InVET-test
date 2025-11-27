import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTemplate from "../../../templates/AdminTemplate";
import useMascotaViewModel from "../../../viewmodels/useMascotaViewModel";
import Button from "../../../components/atoms/Button";

const NuevaMascota = () => {
    const navigate = useNavigate();
    const CLIENTE_ID = "000000000000000000000001";
    const { createMascota } = useMascotaViewModel(CLIENTE_ID);

    const [formData, setFormData] = useState({
        nombre: "",
        especie: "",
        raza: "",
        edad: "",
        peso: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createMascota(formData);
        navigate("/admin/clientes/mascotas/listar");
    };

    return (
        <AdminTemplate>
            <main className="flex-grow-1" id="main-content">

                <div className="container-fluid py-4">

                    {/* Breadcrumb */}
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                            <li className="breadcrumb-item"><a href="/admin/clientes/mascotas">Mascotas</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Nueva Mascota</li>
                        </ol>
                    </nav>

                    <div className="bg-white p-4 shadow-sm rounded">
                        <h1 className="h4">Registrar Mascota</h1>

                        <form onSubmit={handleSubmit}>
                            
                            <div className="mb-3">
                                <label htmlFor="nombre">Nombre *</label>
                                <input type="text" id="nombre" required className="form-control"
                                    value={formData.nombre} onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="especie">Especie *</label>
                                <input type="text" id="especie" required className="form-control"
                                    value={formData.especie} onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="raza">Raza *</label>
                                <input type="text" id="raza" required className="form-control"
                                    value={formData.raza} onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="edad">Edad *</label>
                                <input type="number" id="edad" required className="form-control"
                                    value={formData.edad} onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="peso">Peso (kg) *</label>
                                <input type="number" id="peso" required className="form-control"
                                    value={formData.peso} onChange={handleChange} />
                            </div>

                            <Button label="Registrar Mascota" type="submit" variant="primary" />
                        </form>
                    </div>
                </div>
            </main>
        </AdminTemplate>
    );
};

export default NuevaMascota;
