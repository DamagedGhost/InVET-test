import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminTemplate from "../../../templates/AdminTemplate";
import useMascotaViewModel from "../../../viewmodels/useMascotaViewModel";
import Button from "../../../components/atoms/Button";

const EditarMascota = () => {
    const { id } = useParams(); // ID de la mascota
    const navigate = useNavigate();

    const CLIENTE_ID = "000000000000000000000001"; // Cliente temporal
    const { fetchMascotaById, updateMascota } = useMascotaViewModel(CLIENTE_ID);

    const [formData, setFormData] = useState({
        nombre: "",
        especie: "",
        raza: "",
        edad: "",
        peso: "",
    });

    const [isLoading, setIsLoading] = useState(true);

    // ================================
    // 🔥 Cargar datos de la mascota
    // ================================
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const mascota = await fetchMascotaById(id);

            if (!mascota) {
                console.error("Mascota no encontrada");
                navigate("/admin/clientes/mascotas/listar");
                return;
            }

            setFormData(mascota);
            setIsLoading(false);
        };

        loadData();
    }, [id, fetchMascotaById, navigate]);

    // ================================
    // 🔥 Manejadores
    // ================================
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updated = await updateMascota(id, formData);

        if (updated) {
            console.log("Mascota actualizada correctamente");
            navigate("/admin/clientes/mascotas/listar");
        }
    };

    if (isLoading) {
        return (
            <AdminTemplate>
                <main className="flex-grow-1 p-5">Cargando datos...</main>
            </AdminTemplate>
        );
    }

    return (
        <AdminTemplate>
            <main className="flex-grow-1" id="main-content" role="main">

                <div className="container-fluid py-4">
                    
                    {/* Breadcrumb */}
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <a href="/Admin">Administración</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="/admin/clientes/mascotas/listar">Mascotas</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Editar Mascota (ID: {id})
                            </li>
                        </ol>
                    </nav>

                    <div className="bg-white p-4 shadow-sm rounded">
                        <h2 className="h4 mb-4">Editar Mascota</h2>

                        <form onSubmit={handleSubmit}>
                            
                            {/* Nombre */}
                            <div className="mb-3">
                                <label htmlFor="nombre">Nombre *</label>
                                <input
                                    id="nombre"
                                    type="text"
                                    className="form-control"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Especie */}
                            <div className="mb-3">
                                <label htmlFor="especie">Especie *</label>
                                <input
                                    id="especie"
                                    type="text"
                                    className="form-control"
                                    value={formData.especie}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Raza */}
                            <div className="mb-3">
                                <label htmlFor="raza">Raza *</label>
                                <input
                                    id="raza"
                                    type="text"
                                    className="form-control"
                                    value={formData.raza}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Edad */}
                            <div className="mb-3">
                                <label htmlFor="edad">Edad *</label>
                                <input
                                    id="edad"
                                    type="number"
                                    className="form-control"
                                    value={formData.edad}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Peso */}
                            <div className="mb-3">
                                <label htmlFor="peso">Peso (kg) *</label>
                                <input
                                    id="peso"
                                    type="number"
                                    className="form-control"
                                    value={formData.peso}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Botón */}
                            <div className="d-flex gap-2 mt-3 border-top pt-3">
                                <Button label="Guardar Cambios" type="submit" variant="primary" />
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        </AdminTemplate>
    );
};

export default EditarMascota;
