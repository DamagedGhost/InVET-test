import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTemplate from "../../../templates/AdminTemplate";
import useMascotaViewModel from "../../../viewmodels/useMascotaViewModel";
import Button from "../../../components/atoms/Button";

const NuevaMascota = () => {
  const navigate = useNavigate();
  const { createMascota } = useMascotaViewModel();

  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    peso: "",
  });

  // --- FORMATEAR RUT (solo puntos + guion, sin validar DV) ---
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
      const limpio = value.replace(/[^\dkK]/g, "");
      return setFormData((prev) => ({ ...prev, rut: formatRut(limpio) }));
    }

    if (["nombre", "especie", "raza"].includes(id)) {
      if (/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/.test(value)) return;
    }

    if (["edad", "peso"].includes(id)) {
      if (value < 0) return;
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createMascota(
      formData.rut, // rut formateado
      {
        nombre: formData.nombre.trim(),
        especie: formData.especie.trim(),
        raza: formData.raza.trim(),
        edad: Number(formData.edad),
        peso: Number(formData.peso),
      }
    );

    navigate("/admin/clientes/mascotas/listar");
  };

  return (
    <AdminTemplate>
      <main className="flex-grow-1" id="main-content">
        <div className="container-fluid py-4">

          <div className="bg-white p-4 shadow-sm rounded">
            <h1 className="h4">Registrar Mascota</h1>

            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label htmlFor="rut">RUT del Cliente *</label>
                <input
                  type="text"
                  id="rut"
                  maxLength={12}
                  placeholder="12.345.678-9"
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
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="especie">Especie *</label>
                <input
                  type="text"
                  id="especie"
                  className="form-control"
                  required
                  value={formData.especie}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="raza">Raza *</label>
                <input
                  type="text"
                  id="raza"
                  className="form-control"
                  required
                  value={formData.raza}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="edad">Edad *</label>
                <input
                  type="number"
                  id="edad"
                  min="0"
                  className="form-control"
                  required
                  value={formData.edad}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="peso">Peso (kg) *</label>
                <input
                  type="number"
                  id="peso"
                  min="0"
                  className="form-control"
                  required
                  value={formData.peso}
                  onChange={handleChange}
                />
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
