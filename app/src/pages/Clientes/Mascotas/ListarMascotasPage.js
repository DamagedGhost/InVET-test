import React, { useState } from "react";
import AdminTemplate from "../../../templates/AdminTemplate";
import useMascotaViewModel from "../../../viewmodels/useMascotaViewModel";
import Button from "../../../components/atoms/Button";

const ListarMascotasPage = () => {
  const [rut, setRut] = useState("");

  // El ViewModel recibe el RUT dinámico
  const {
    mascotas,
    fetchMascotas,
    deleteMascota,
    loading,
  } = useMascotaViewModel(rut);

  const handleBuscar = () => {
    if (!rut.trim()) {
      alert("Debe ingresar un RUT válido.");
      return;
    }
    fetchMascotas();
  };

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
              <li className="breadcrumb-item active" aria-current="page">
                Mascotas
              </li>
            </ol>
          </nav>

          <h1 className="h4 mb-3">Listado de Mascotas</h1>

          {/* BUSCADOR */}
          <div className="d-flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Ingrese RUT del cliente"
              className="form-control"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
            />

            <Button label="Buscar" onClick={handleBuscar} />
          </div>

          {/* TABLA */}
          <div className="table-responsive">
            <table className="table table-bordered align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th>Nombre</th>
                  <th>Especie</th>
                  <th>Raza</th>
                  <th>Edad</th>
                  <th>Peso</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {/* LOADING */}
                {loading && (
                  <tr>
                    <td colSpan="6">Cargando mascotas...</td>
                  </tr>
                )}

                {/* VACÍO */}
                {!loading && mascotas.length === 0 && (
                  <tr>
                    <td colSpan="6">No hay mascotas para este cliente.</td>
                  </tr>
                )}

                {/* MASCOTAS */}
                {!loading &&
                  mascotas.length > 0 &&
                  mascotas.map((m) => (
                    <tr key={m._id}>
                      <td>{m.nombre}</td>
                      <td>{m.especie}</td>
                      <td>{m.raza}</td>
                      <td>{m.edad}</td>
                      <td>{m.peso}</td>
                      <td className="d-flex justify-content-center gap-2">

                        {/* EDITAR */}
                        <Button
                          label="Editar"
                          variant="secondary"
                          href={`/admin/clientes/mascotas/editar/${m._id}?rut=${rut}`}
                        />

                        {/* ELIMINAR */}
                        <Button
                          label="Eliminar"
                          variant="danger"
                          onClick={() => {
                            if (window.confirm("¿Seguro que desea eliminar?")) {
                              deleteMascota(m._id);
                            }
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </AdminTemplate>
  );
};

export default ListarMascotasPage;
