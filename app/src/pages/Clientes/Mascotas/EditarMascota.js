import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import AdminTemplate from "../../../templates/AdminTemplate";
import useMascotaViewModel from "../../../viewmodels/useMascotaViewModel";
import Button from "../../../components/atoms/Button";

const EditarMascota = () => {
  const { id } = useParams(); // ID de la mascota
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 🟦 RUT dinámico desde la URL
  const rutCliente = searchParams.get("rut");

  const { fetchMascotaById, updateMascota } = useMascotaViewModel(rutCliente);

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
      if (!rutCliente) {
        alert("Error: Falta el RUT del cliente.");
        navigate("/admin/clientes/mascotas/listar");
        return;
      }

      const mascota = await fetchMascotaById(id);

      if (!mascota) {
        alert("Mascota no encontrada");
        navigate("/admin/clientes/mascotas/listar");
        return;
      }

      setFormData({
        nombre: mascota.nombre,
        especie: mascota.especie,
        raza: mascota.raza,
        edad: mascota.edad,
        peso: mascota.peso,
      });

      setIsLoading(false);
    };

    loadData();
  }, [id, rutCliente, fetchMascotaById, navigate]);

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
      alert("Mascota actualizada correctamente");
      navigate(`/admin/clientes/mascotas/listar?rut=${rutCliente}`);
    }
  };

  // ================================
  // 🔥 Vista cargando
  // ================================
  if (isLoading) {
    return (
      <AdminTemplate>
        <main className="flex-grow-1 p-5">Cargando datos...</main>
      </AdminTemplate>
    );
  }

  // ================================
  // 🔥 FORMULARIO DE EDICIÓN
  // ================================
  return (
    <AdminTemplate>
      <main className="flex-grow-1" id="main-content">

        <div className="container-fluid py-4">

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
              <li className="breadcrumb-item">
                <a href={`/admin/clientes/mascotas/listar?rut=${rutCliente}`}>Mascotas</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Editar Mascota
              </li>
            </ol>
          </nav>

          <div className="bg-white p-4 shadow-sm rounded">
            <h2 className="h4 mb-4">Editar Mascota</h2>

            <form onSubmit={handleSubmit}>

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

              <div className="d-flex gap-2 border-top pt-3">
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
