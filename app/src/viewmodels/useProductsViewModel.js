import { useState, useEffect, useCallback } from 'react';

// URL de tu servidor en AWS
const API_BASE_URL = 'http://98.91.150.2:5000/api/productos';

const useProductsViewModel = () => {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. FETCH ALL (Ya tenía useCallback, está bien) ---
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Error al cargar productos');
      const data = await response.json();
      
      const mappedData = data.map(p => ({ ...p, id: p._id }));
      setProducts(mappedData);
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); 

  // --- 2. CREATE (Agregamos useCallback) ---
  const addProducto = useCallback(async (productoData) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al agregar');
        }

        await fetchProducts(); // Recargar lista
        return true;

    } catch (e) {
        alert(`Error: ${e.message}`);
        return false;
    }
  }, [fetchProducts]); // Dependencia: fetchProducts

  // --- 3. READ SINGLE (Sync) ---
  const getProductoById = useCallback((id) => {
    return products.find(p => p.id === id);
  }, [products]);
    
  // --- 4. READ SINGLE ASYNC (Agregamos useCallback) ---
  // AQUÍ ESTABA EL PROBLEMA DEL CICLO INFINITO
  const fetchProductoById = useCallback(async (id) => {
    const url = `${API_BASE_URL}/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Producto no encontrado');
        const data = await response.json();
        return { ...data, id: data._id };
    } catch (e) {
        console.error("Error fetchProductoById:", e);
        return null;
    }
  }, []); // Sin dependencias externas que cambien

  // --- 5. UPDATE (Agregamos useCallback) ---
  const updateProducto = useCallback(async (id, updatedData) => {
    const url = `${API_BASE_URL}/${id}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar');
        }

        await fetchProducts();
        return true;
        
    } catch (e) {
        alert(`Error: ${e.message}`);
        return false;
    }
  }, [fetchProducts]);

  // --- 6. DELETE (Agregamos useCallback) ---
  const deleteProducto = useCallback(async (id) => {
    const url = `${API_BASE_URL}/${id}`;
    try {
        const response = await fetch(url, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al eliminar');

        await fetchProducts();
        return true;
    } catch (e) {
        alert(`Error: ${e.message}`);
        return false;
    }
  }, [fetchProducts]);

  return { 
    products, 
    loading,
    error,
    fetchProducts,
    addProducto, 
    getProductoById, 
    fetchProductoById, 
    updateProducto, 
    deleteProducto 
  };
};

export default useProductsViewModel;