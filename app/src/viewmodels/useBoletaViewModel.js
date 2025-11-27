import { useState, useEffect } from 'react';
import axios from 'axios';

// CORRECCIÓN: Usamos la misma IP que el resto del sistema (Auth y Productos)
const API_URL = 'http://98.91.150.2:5000/api/boletas';

const useBoletaViewModel = () => {
  const [boletas, setBoletas] = useState([]);
  const [loading, setLoading] = useState(false); // Estado de carga para lecturas
  const [error, setError] = useState(null);

  // --- CARGAR BOLETAS (READ) ---
  const cargarBoletas = async () => {
      setLoading(true);
      try {
          const res = await axios.get(API_URL);
          const boletasAdaptadas = res.data.map(b => ({
              id: b._id,
              fecha: new Date(b.fecha).toLocaleDateString('es-CL', { 
                  year: 'numeric', month: '2-digit', day: '2-digit', 
                  hour: '2-digit', minute: '2-digit'
              }),
              total: b.total,
              estado: b.estado,
              userId: b.usuario?._id || 'N/A',
              cliente: b.usuario ? `${b.usuario.nombre} ${b.usuario.apellidos}` : 'Usuario Eliminado'
          }));
          setBoletas(boletasAdaptadas);
      } catch (error) {
          console.error("Error cargando boletas", error);
          setError(error);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    cargarBoletas();
  }, []);

  // --- CREAR BOLETA (CREATE) ---
  const addBoleta = async (compraData) => {
      try {
          // Validamos que no haya precios negativos antes de enviar
          const hayNegativos = compraData.items.some(item => item.precio < 0);
          if (hayNegativos) {
              throw new Error("Error de integridad: El carrito contiene productos con precio negativo.");
          }

          await axios.post(API_URL, compraData);
          await cargarBoletas(); 
          return true;
      } catch (error) {
          // Extraemos el mensaje de error del backend si existe
          const mensaje = error.response?.data?.message || error.message || "Error desconocido";
          console.error("Error al crear la boleta:", mensaje);
          throw new Error(mensaje); 
      }
  };

  const getBoletasByUserId = (userId) => {
    return boletas.filter(b => b.userId === userId);
  };

  return { 
      boletas, 
      loading, // Exportamos estado de carga
      error,
      getBoletasByUserId,
      addBoleta 
  };
};

export default useBoletaViewModel;