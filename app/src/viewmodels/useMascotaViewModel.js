// src/viewmodels/useMascotaViewModel.js
import { useState, useCallback } from "react";

// 👉 API REAL donde están los usuarios
const API_BASE_URL = "http://98.91.150.2:5000/api/usuarios";

const useMascotaViewModel = (rutCliente) => {
  const [mascotas, setMascotas] = useState([]);
  const [mascota, setMascota] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==============================
  // Obtener todas las mascotas
  // ==============================
  const fetchMascotas = useCallback(async () => {
    if (!rutCliente) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/${rutCliente}/mascotas`);

      if (!res.ok) {
        throw new Error(`Error al obtener mascotas (status ${res.status})`);
      }

      const data = await res.json();
      setMascotas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("[FE-MASCOTAS] Error en fetchMascotas:", err);
      setError(err.message);
      setMascotas([]);
    } finally {
      setLoading(false);
    }
  }, [rutCliente]);

  // ==============================
  // Obtener una mascota por ID
  // ==============================
  const fetchMascotaById = useCallback(
    async (idMascota) => {
      if (!rutCliente || !idMascota) return;

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${API_BASE_URL}/${rutCliente}/mascotas/${idMascota}`
        );

        if (!res.ok) {
          throw new Error(
            `Error al obtener mascota (status ${res.status})`
          );
        }

        const data = await res.json();
        setMascota(data);
        return data;
      } catch (err) {
        console.error("[FE-MASCOTAS] Error en fetchMascotaById:", err);
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [rutCliente]
  );

  // ==============================
  // Crear mascota
  // ==============================
  const createMascota = async (rut, nuevaMascota) => {
  const res = await fetch(`${API_BASE_URL}/${rut}/mascotas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaMascota),
  });
};


  // ==============================
  // Actualizar mascota
  // ==============================
  const updateMascota = async (idMascota, mascotaEditada) => {
    if (!rutCliente || !idMascota) return null;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${API_BASE_URL}/${rutCliente}/mascotas/${idMascota}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mascotaEditada),
        }
      );

      if (!res.ok) {
        throw new Error(`Error al actualizar mascota (status ${res.status})`);
      }

      const actualizada = await res.json();

      setMascotas((prev) =>
        prev.map((m) => (m._id === actualizada._id ? actualizada : m))
      );

      return actualizada;
    } catch (err) {
      console.error("[FE-MASCOTAS] Error en updateMascota:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Eliminar mascota
  // ==============================
  const deleteMascota = async (idMascota) => {
    if (!rutCliente || !idMascota) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${API_BASE_URL}/${rutCliente}/mascotas/${idMascota}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(`Error al eliminar mascota (status ${res.status})`);
      }

      await res.json();

      setMascotas((prev) => prev.filter((m) => m._id !== idMascota));
    } catch (err) {
      console.error("[FE-MASCOTAS] Error en deleteMascota:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    mascotas,
    mascota,
    loading,
    error,
    fetchMascotas,
    fetchMascotaById,
    createMascota,
    updateMascota,
    deleteMascota,
  };
};

export default useMascotaViewModel;
