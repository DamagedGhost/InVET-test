// src/pages/Clientes/Mascotas/ListadoMascotas.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminTemplate from "../../../templates/AdminTemplate";
import useMascotaViewModel from "../../../viewmodels/useMascotaViewModel";

const ListadoMascotas = () => {
  const navigate = useNavigate();

  const CLIENTE_ID = "000000000000000000000001";

  const { mascotas, loading, fetchMascotas, deleteMascota } =
    useMascotaViewModel(CLIENTE_ID);

  useEffect(() => {
    fetchMascotas();
  }, [fetchMascotas]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta mascota?")) return;
    await deleteMascota(id);
  };

  return (
    <AdminTemplate>
      <main className="flex-grow-1" id="main-content" role="main">
        <div className="container-fluid py-4">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/Admin">Administración</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/admin/clientes/mascotas">Mascotas</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Listado
              </li>
            </ol>
          </nav>

          <h1 className="h4 mb-4">Listado de Mascotas</h1>

          {loading && <p>Cargando mascotas...</p>}

          <table className="table table-bordered table-striped">
            <thead>
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
              {!loading && mascotas.length === 0 && (
                <tr>
                  <td colSpan="6">No hay mascotas registradas.</td>
                </tr>
              )}

              {mascotas.map((m) => (
                <tr key={m._id}>
                  <td>{m.nombre}</td>
                  <td>{m.especie}</td>
                  <td>{m.raza}</td>
                  <td>{m.edad}</td>
                  <td>{m.peso} kg</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        navigate(`/admin/clientes/mascotas/editar/${m._id}`)
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(m._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </AdminTemplate>
  );
};

export default ListadoMascotas;
