// src/viewmodels/useMascotaViewModel.js
import { useState, useCallback } from "react";

// 👉 Usa la misma IP que ya usas en AuthContext
const API_BASE_URL = "http://98.91.150.2:5000/api/clientes";

const useMascotaViewModel = (clienteId) => {
  const [mascotas, setMascotas] = useState([]);
  const [mascota, setMascota] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==============================
  // Obtener todas las mascotas
  // ==============================
  const fetchMascotas = useCallback(async () => {
    if (!clienteId) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/${clienteId}/mascotas`);

      if (!res.ok) {
        throw new Error(`Error al obtener mascotas (status ${res.status})`);
      }

      const data = await res.json();

      // Asegurarse de que siempre sea un arreglo
      setMascotas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("[FE-MASCOTAS] Error en fetchMascotas:", err);
      setError(err.message);
      setMascotas([]); // Evitamos undefined
    } finally {
      setLoading(false);
    }
  }, [clienteId]);

  // ==============================
  // Obtener una mascota por ID
  // ==============================
  const fetchMascotaById = useCallback(
    async (idMascota) => {
      if (!clienteId || !idMascota) return;

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${API_BASE_URL}/${clienteId}/mascotas/${idMascota}`
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
    [clienteId]
  );

  // ==============================
  // Crear mascota
  // ==============================
  const createMascota = async (nuevaMascota) => {
    if (!clienteId) return null;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/${clienteId}/mascotas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaMascota),
      });

      if (!res.ok) {
        throw new Error(`Error al crear mascota (status ${res.status})`);
      }

      const creada = await res.json();
      // Actualizamos la lista en memoria
      setMascotas((prev) => [...prev, creada]);
      return creada;
    } catch (err) {
      console.error("[FE-MASCOTAS] Error en createMascota:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Actualizar mascota
  // ==============================
  const updateMascota = async (idMascota, mascotaEditada) => {
    if (!clienteId || !idMascota) return null;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${API_BASE_URL}/${clienteId}/mascotas/${idMascota}`,
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
    if (!clienteId || !idMascota) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${API_BASE_URL}/${clienteId}/mascotas/${idMascota}`,
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
