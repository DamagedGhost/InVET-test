import { useState, useEffect } from 'react';
import axios from 'axios';

// ⚠️ CAMBIA ESTO POR LA IP DE TU INSTANCIA BACKEND
const API_URL = 'http://34.193.81.109:3000/boletas';

const useBoletaViewModel = () => {
  const [boletas, setBoletas] = useState([]);

  // --- CARGAR BOLETAS (READ) ---
  const cargarBoletas = async () => {
      try {
          const res = await axios.get(API_URL);
          
          // Adaptamos la respuesta
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
      }
  };

  useEffect(() => {
    cargarBoletas();
  }, []);

  // --- NUEVA FUNCIÓN: CREAR BOLETA (CREATE) ---
  const addBoleta = async (compraData) => {
      try {
          await axios.post(API_URL, compraData);
          await cargarBoletas(); // Recargamos la lista localmente por si acaso
          return true;
      } catch (error) {
          console.error("Error al crear la boleta:", error);
          throw error;
      }
  };

  // Filtrar boletas localmente
  const getBoletasByUserId = (userId) => {
    return boletas.filter(b => b.userId === userId);
  };

  return { 
      boletas, 
      getBoletasByUserId,
      addBoleta // <--- Exportamos la nueva función
  };
};

export default useBoletaViewModel;