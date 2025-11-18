import { useState, useEffect, useCallback } from 'react';

//TODO: ESTA ES UNA URL DE PRUEBA, SE CONECTA A UN SERVIDOR EXTERNO, CON EL PROPÓSITO DE PROBAR LA APLICACIÓN EN UN ENTORNO REAL, DEBE SER LA URL DE NUESTRO BACKEND
const API_BASE_URL = 'http://98.91.150.2:5000/api/productos';

// Hook principal que manejará el CRUD con la API
const useProductsViewModel = () => {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener todos los productos
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log(`[FE-PROD] ➡️ Llamada GET: ${API_BASE_URL}`);
    try {
      const response = await fetch(API_BASE_URL);
      console.log(`[FE-PROD] ⬅️ Respuesta GET. Status: ${response.status}`);
      
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de productos.');
      }
      const data = await response.json();
      
      const mappedData = data.map(p => ({
          ...p,
          id: p._id // Usamos _id de MongoDB como ID en el frontend
      }));
      setProducts(mappedData);
      console.log(`[FE-PROD] ✅ ${mappedData.length} productos cargados.`);
    } catch (e) {
      setError(e.message);
      console.error("[FE-PROD] ❌ Error al cargar productos:", e.message);
    } finally {
      setLoading(false);
    }
  }, []); // Dependencias vacías: solo se define una vez

  // Se llama a fetchProducts la primera vez que se monta el componente
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); 

  // --- FUNCIÓN CREATE ---
  const addProducto = async (productoData) => {
    console.log('[FE-PROD] ➡️ Llamada POST para crear:', productoData.title);
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoData),
        });

        console.log(`[FE-PROD] ⬅️ Respuesta POST. Status: ${response.status}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al agregar producto.');
        }

        console.log('[FE-PROD] ✅ Producto creado exitosamente. Recargando lista...');
        await fetchProducts();
        return true;

    } catch (e) {
        alert(`Error al guardar producto: ${e.message}`);
        console.error("[FE-PROD] ❌ Error en POST:", e.message);
        return false;
    }
  };

  // --- FUNCIÓN READ (Single) ---
  const getProductoById = (id) => {
    return products.find(p => p.id === id);
  };
    
  // Esta es la versión que hace fetch directo para edición
  const fetchProductoById = async (id) => {
    const url = `${API_BASE_URL}/${id}`;
    console.log(`[FE-PROD] ➡️ Llamada GET single: ${url}`);
    try {
        const response = await fetch(url);
        console.log(`[FE-PROD] ⬅️ Respuesta GET single. Status: ${response.status}`);
        
        if (!response.ok) {
            throw new Error('Producto no encontrado en la base de datos.');
        }
        const data = await response.json();
        console.log('[FE-PROD] ✅ Producto individual obtenido.');
        return { ...data, id: data._id };
    } catch (e) {
        console.error("[FE-PROD] ❌ Error al obtener producto por ID:", e.message);
        return null;
    }
  };


  // --- FUNCIÓN UPDATE ---
  const updateProducto = async (id, updatedData) => {
    const url = `${API_BASE_URL}/${id}`;
    console.log(`[FE-PROD] ➡️ Llamada PUT para ID: ${id}`);
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        
        console.log(`[FE-PROD] ⬅️ Respuesta PUT. Status: ${response.status}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar producto.');
        }

        console.log('[FE-PROD] ✅ Producto actualizado exitosamente. Recargando lista...');
        await fetchProducts();
        return true;
        
    } catch (e) {
        alert(`Error al actualizar producto: ${e.message}`);
        console.error("[FE-PROD] ❌ Error en PUT:", e.message);
        return false;
    }
  };

  // --- FUNCIÓN DELETE ---
  const deleteProducto = async (id) => {
    const url = `${API_BASE_URL}/${id}`;
    console.log(`[FE-PROD] ➡️ Llamada DELETE para ID: ${id}`);
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        
        console.log(`[FE-PROD] ⬅️ Respuesta DELETE. Status: ${response.status}`);
        
        if (!response.ok) {
            throw new Error('Error al eliminar producto.');
        }

        console.log('[FE-PROD] ✅ Producto eliminado exitosamente. Recargando lista...');
        await fetchProducts();
        return true;
        
    } catch (e) {
        alert(`Error al eliminar producto: ${e.message}`);
        console.error("[FE-PROD] ❌ Error en DELETE:", e.message);
        return false;
    }
  };

  // Exponemos los productos (READ all) y las funciones CRUD
  return { 
    products, 
    loading,
    error,
    fetchProducts,
    addProducto, 
    getProductoById, 
    fetchProductoById, // Nueva función para obtener al editar
    updateProducto, 
    deleteProducto 
  };
};

export default useProductsViewModel;