import AdminTemplate from "../../templates/AdminTemplate";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useProductsViewModel from "../../viewmodels/useProductsViewModel";

const EditarProducto = () => {
    const { id } = useParams(); // Obtiene el ID (que ahora es el _id de MongoDB)
    const navigate = useNavigate();
    // 1. Reemplazamos getProductoById con fetchProductoById
    const { fetchProductoById, updateProducto } = useProductsViewModel();

    // Estado local del formulario
    const [formData, setFormData] = useState({
        id: id, // Mantenemos el ID de la URL
        codigo: '',
        title: '',
        descripcion: '',
        price: 0,
        stock: 0,
        stockCritico: 0,
        categoria: '',
        image: '', 
    });
    const [isLoading, setIsLoading] = useState(true);

    // Cargar los datos del producto cuando el componente se monte
    useEffect(() => {
        const loadProductData = async () => {
            setIsLoading(true);
            // 2. Usamos la nueva función asíncrona para obtener los datos
            const producto = await fetchProductoById(id);
            
            if (producto) {
                // Mantenemos los valores como números/strings según vienen de la API
                setFormData({
                    ...producto,
                    // Aseguramos que los valores sean utilizables
                    price: producto.price || 0,
                    stock: producto.stock || 0,
                    stockCritico: producto.stockCritico || 0,
                }); 
            } else {
                // window.alert("Producto no encontrado o error de conexión."); // Evitar alert
                console.error("Producto no encontrado o error de conexión.");
                navigate('/Admin/Inventario/ListadoProductos');
            }
            setIsLoading(false);
        };

        loadProductData();
        // Las dependencias solo incluyen el ID y la función de fetch
    }, [id, fetchProductoById, navigate]);


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        // Convertir valores numéricos a número ANTES de guardarlos en el estado
        const parsedValue = (type === 'number' || name === 'price' || name === 'stock' || name === 'stockCritico') 
                            ? Number(value) : value;

        setFormData(prevData => ({
            ...prevData,
            [name]: parsedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 3. Await la actualización
        const success = await updateProducto(formData.id, formData);
        
        if (success) {
            // window.alert('¡Producto actualizado con éxito!'); // Evitar alert
            console.log('¡Producto actualizado con éxito!');
            navigate('/Admin/Inventario/ListadoProductos');
        }
        // Si no es exitoso, el hook ya mostró un alert de error.
    };

    if (isLoading) {
        return <AdminTemplate>Cargando producto...</AdminTemplate>;
    }


    return (
        <AdminTemplate>
            <section className="flex-grow-1" id="main-content" role="main">
                <div className="container-fluid py-4">
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                            <li className="breadcrumb-item"><a href="/Admin/Inventario">Inventario</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Editar Producto</li>
                        </ol>
                    </nav>
                    <div className="bg-white p-4 shadow-sm rounded">
                    <h1>Editar Producto (ID: {formData.id})</h1>
                    
                    <form id="editForm" onSubmit={handleSubmit}>
                        
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="codigo">Código Producto *</label>
                                <input 
                                    type="text" id="codigo" name="codigo"
                                    value={formData.codigo} onChange={handleChange}
                                    required className="form-control" 
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="title">Nombre Producto *</label>
                                <input 
                                    type="text" id="title" name="title"
                                    value={formData.title} onChange={handleChange}
                                    required className="form-control" 
                                />
                            </div>
                        </div>
                        
                        {/* --- CAMPO DE IMAGEN --- */}
                        <div className="mb-3">
                            <label htmlFor="image">URL de la Imagen</label>
                            <input 
                                type="text" 
                                id="image" 
                                name="image"
                                value={formData.image} 
                                onChange={handleChange}
                                className="form-control" 
                                placeholder="https://ejemplo.com/imagen.png"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="descripcion">Descripción</label>
                            <textarea 
                                id="descripcion" name="descripcion"
                                value={formData.descripcion} onChange={handleChange}
                                className="form-control" rows="3"
                            />
                        </div>
                        
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="price">Precio *</label>
                                <input 
                                    type="number" id="price" name="price"
                                    // Aseguramos que el valor es numérico para el input
                                    value={formData.price} onChange={handleChange}
                                    required className="form-control" 
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="stock">Stock *</label>
                                <input 
                                    type="number" id="stock" name="stock"
                                    value={formData.stock} onChange={handleChange}
                                    required className="form-control" 
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="stockCritico">Stock Crítico</label>
                                <input 
                                    type="number" id="stockCritico" name="stockCritico"
                                    value={formData.stockCritico} onChange={handleChange}
                                    className="form-control" 
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="categoria" className="form-label">Categoría *</label>
                            <select 
                                id="categoria" name="categoria"
                                value={formData.categoria} onChange={handleChange}
                                className="form-select" required
                            >
                                <option value="">Seleccione categoría</option>
                                <option value="Alimentos">Alimentos</option>
                                <option value="Accesorios">Accesorios</option>
                                <option value="Medicamentos">Medicamentos</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>
                        
                        <div>
                            <button type="submit" id="submitBtn" className="btn btn-primary mt-3">
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </section>
        </AdminTemplate>
    );
}

export default EditarProducto;