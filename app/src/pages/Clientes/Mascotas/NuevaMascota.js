import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTemplate from "../../../templates/AdminTemplate";
import useMascotaViewModel from "../../../viewmodels/useMascotaViewModel";
import Button from "../../../components/atoms/Button";
// Importamos confeti si quieres usar librería, pero usaremos el CSS de arriba

const NuevaMascota = () => {
  const navigate = useNavigate();
  const { createMascota } = useMascotaViewModel();

  // Estado para mostrar el Popup
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    peso: "",
  });

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

    // 1. Crear la mascota
    const success = await createMascota(
      formData.rut, // Enviamos con formato como corregimos antes
      {
        nombre: formData.nombre.trim(),
        especie: formData.especie.trim(),
        raza: formData.raza.trim(),
        edad: Number(formData.edad),
        peso: Number(formData.peso),
      }
    );

    // 2. Si es exitoso, ¡FIESTA! 🎉
    if (success) {
      setShowSuccess(true);
      // Opcional: Redirigir automáticamente después de 3 segundos
      // setTimeout(handleClosePopup, 3000); 
    }
  };

  const handleClosePopup = () => {
    setShowSuccess(false);
    navigate("/admin/clientes/mascotas/listar");
  };

  return (
    <AdminTemplate>
      <main className="flex-grow-1" id="main-content">
        <div className="container-fluid py-4">
          <div className="bg-white p-4 shadow-sm rounded">
            <h1 className="h4">Registrar Mascota</h1>

            <form onSubmit={handleSubmit}>
              {/* ... Inputs existentes (RUT, Nombre, Especie, etc.) ... */}
              <div className="mb-3">
                <label htmlFor="rut">RUT del Cliente *</label>
                <input type="text" id="rut" maxLength={12} placeholder="12.345.678-9" className="form-control" value={formData.rut} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="nombre">Nombre Mascota *</label>
                <input type="text" id="nombre" className="form-control" required value={formData.nombre} onChange={handleChange} />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="especie">Especie *</label>
                    <input type="text" id="especie" className="form-control" required value={formData.especie} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="raza">Raza *</label>
                    <input type="text" id="raza" className="form-control" required value={formData.raza} onChange={handleChange} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="edad">Edad *</label>
                    <input type="number" id="edad" min="0" className="form-control" required value={formData.edad} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="peso">Peso (kg) *</label>
                    <input type="number" id="peso" min="0" className="form-control" required value={formData.peso} onChange={handleChange} />
                </div>
              </div>

              <Button label="Registrar Mascota" type="submit" variant="primary" />
            </form>
          </div>
        </div>

        {/* --- POPUP DE FIESTA WIII --- */}
        {showSuccess && (
          <div className="modal-overlay-backdrop">
            <div className="success-popup-card">
              {/* Confeti cayendo */}
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>

              <span className="party-icon">🐶🎉🐱</span>
              
              <h2 className="text-primary fw-bold mb-3">¡Registro Exitoso!</h2>
              
              <p className="lead text-muted">
                ¡Wiii! La familia InVET crece.
              </p>
              
              <div className="alert alert-success mt-3 py-2">
                <strong>{formData.nombre}</strong> ha sido unid@ con su dueño <br/>
                <small className="text-muted">RUT: {formData.rut}</small>
              </div>

              <button 
                className="btn btn-primary btn-lg mt-3 w-100 rounded-pill shadow"
                onClick={handleClosePopup}
              >
                ¡Excelente! Continuar
              </button>
            </div>
          </div>
        )}

      </main>
    </AdminTemplate>
  );
};

export default NuevaMascota;