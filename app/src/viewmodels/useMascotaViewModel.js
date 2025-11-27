import { useState, useCallback } from "react";

const API_BASE_URL = "http://98.91.150.2:5000/api/clientes";

const useMascotaViewModel = (rutCliente) => {
  const [mascotas, setMascotas] = useState([]);
  const [mascota, setMascota] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper para preparar el RUT para la URL (Codificar, NO limpiar)
  const formatRutForUrl = (rut) => {
      // Si rutCliente es "12.345.678-9", encodeURIComponent lo deja seguro para viajar en URL
      // pero mantiene los caracteres necesarios para que el backend lo encuentre.
      return encodeURIComponent(rut);
  };

  const fetchMascotas = useCallback(async () => {
    if (!rutCliente) return;
    try {
      setLoading(true);
      const rutUrl = formatRutForUrl(rutCliente); // Usamos el RUT completo
      const res = await fetch(`${API_BASE_URL}/${rutUrl}/mascotas`);

      if (!res.ok) {
        if(res.status === 404) {
            setMascotas([]); // Si no existe el usuario, lista vacía o manejar error
            return; 
        }
        throw new Error(`Error status ${res.status}`);
      }
      const data = await res.json();
      setMascotas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [rutCliente]);

  const fetchMascotaById = useCallback(async (idMascota) => {
      if (!rutCliente || !idMascota) return;
      try {
        setLoading(true);
        const rutUrl = formatRutForUrl(rutCliente);
        const res = await fetch(`${API_BASE_URL}/${rutUrl}/mascotas/${idMascota}`);
        if (!res.ok) throw new Error("Error fetching mascota");
        const data = await res.json();
        setMascota(data);
        return data;
      } catch (err) {
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    }, [rutCliente]);

  const createMascota = async (rut, nuevaMascota) => {
    try {
        // AQUÍ EL CAMBIO CLAVE: No hacemos replace, usamos el RUT tal cual viene del formulario (con formato)
        const rutUrl = formatRutForUrl(rut); 
        
        console.log("Enviando petición a:", `${API_BASE_URL}/${rutUrl}/mascotas`);

        const res = await fetch(`${API_BASE_URL}/${rutUrl}/mascotas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaMascota),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Error al crear mascota");
        }
        return true;
    } catch (err) {
        console.error(err);
        alert(err.message);
        return false;
    }
  };

  const updateMascota = async (idMascota, mascotaEditada) => {
    if (!rutCliente) return null;
    try {
        const rutUrl = formatRutForUrl(rutCliente);
        const res = await fetch(`${API_BASE_URL}/${rutUrl}/mascotas/${idMascota}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mascotaEditada),
        });
        if (!res.ok) throw new Error("Error update");
        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
  };

  const deleteMascota = async (idMascota) => {
    if (!rutCliente) return;
    try {
        const rutUrl = formatRutForUrl(rutCliente);
        const res = await fetch(`${API_BASE_URL}/${rutUrl}/mascotas/${idMascota}`, {
            method: "DELETE",
        });
        if (res.ok) {
            setMascotas((prev) => prev.filter((m) => m._id !== idMascota));
        }
    } catch (err) {
        console.error(err);
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