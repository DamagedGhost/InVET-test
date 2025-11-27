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

  // =============================
  // 🔹 FORMATEAR RUT CHILENO
  // =============================
  const formatRut = (rut) => {
    rut = rut.replace(/[^\dkK]/g, "").toUpperCase(); // limpiar todo menos numeros y K

    if (rut.length <= 1) return rut;

    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1);

    // poner puntos cada 3
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${cuerpo}-${dv}`;
  };

  // =============================
  // 🔹 VALIDAR RUT REAL (Dígito verificador)
  // =============================
  const validarRut = (rut) => {
    rut = rut.replace(/\./g, "").replace("-", "").toUpperCase();

    if (rut.length < 2) return false;

    const cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1);

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += multiplo * parseInt(cuerpo[i]);
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

    return dv === dvEsperado;
  };

  // =============================
  // 🔹 Manejar cambios en inputs
  // =============================
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "rut") {
      const limpio = value.replace(/[^\dkK]/g, "").toUpperCase();
      return setFormData((prev) => ({ ...prev, rut: formatRut(limpio) }));
    }

    // Validación de texto (sin números)
    if (["nombre", "especie", "raza"].includes(id)) {
      if (/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/.test(value)) return;
    }

    // Edad y peso — solo números positivos
    if (["edad", "peso"].includes(id)) {
      if (value < 0) return;
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // =============================
  // 🔹 Enviar formulario
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar RUT completo
    if (!validarRut(formData.rut)) {
      alert("El RUT ingresado no es válido.");
      return;
    }

    await createMascota(
      formData.rut.replace(/\./g, "").replace("-", ""), // rut limpio para backend
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
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
              <li className="breadcrumb-item"><a href="/admin/clientes/mascotas">Mascotas</a></li>
              <li className="breadcrumb-item active">Nueva Mascota</li>
            </ol>
          </nav>

          <div className="bg-white p-4 shadow-sm rounded">
            <h1 className="h4">Registrar Mascota</h1>

            <form onSubmit={handleSubmit}>
              {/* RUT */}
              <div className="mb-3">
                <label htmlFor="rut">RUT del Cliente *</label>
                <input
                  type="text"
                  id="rut"
                  required
                  maxLength={12}
                  placeholder="11.111.111-1"
                  className="form-control"
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
                  required
                  className="form-control"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              {/* Especie */}
              <div className="mb-3">
                <label htmlFor="especie">Especie *</label>
                <input
                  type="text"
                  id="especie"
                  required
                  className="form-control"
                  value={formData.especie}
                  onChange={handleChange}
                />
              </div>

              {/* Raza */}
              <div className="mb-3">
                <label htmlFor="raza">Raza *</label>
                <input
                  type="text"
                  id="raza"
                  required
                  className="form-control"
                  value={formData.raza}
                  onChange={handleChange}
                />
              </div>

              {/* Edad */}
              <div className="mb-3">
                <label htmlFor="edad">Edad *</label>
                <input
                  type="number"
                  id="edad"
                  required
                  min="0"
                  className="form-control"
                  value={formData.edad}
                  onChange={handleChange}
                />
              </div>

              {/* Peso */}
              <div className="mb-3">
                <label htmlFor="peso">Peso (kg) *</label>
                <input
                  type="number"
                  id="peso"
                  required
                  min="0"
                  className="form-control"
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
