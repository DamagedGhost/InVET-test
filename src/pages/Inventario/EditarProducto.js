import AdminTemplate from "../../../templates/AdminTemplate";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useProductsViewModel from "../../../viewmodels/useProductsViewModel";

const EditarProducto = () => {
    const { id } = useParams(); // Obtiene el ID desde la URL
    const navigate = useNavigate();
    const { getProductoById, updateProducto } = useProductsViewModel();

    // Estado local del formulario
    const [formData, setFormData] = useState({
        codigo: '',
        title: '',
        descripcion: '',
        price: '',
        stock: '',
        stockCritico: '',
        categoria: '',
        image: '', // <-- CAMPO NUEVO AÑADIDO
    });

    // Cargar los datos del producto cuando el componente se monte
    useEffect(() => {
        // Convertimos el ID de string a número
        const productoId = parseInt(id, 10);
        const producto = getProductoById(productoId);
        
        if (producto) {
            setFormData(producto); // Carga los datos del producto en el formulario
        } else {
            alert("Producto no encontrado");
            navigate('/Admin/Inventario/ListadoProductos');
        }
    }, [id, getProductoById, navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convertimos los datos numéricos antes de guardar
        const dataToUpdate = {
            ...formData,
            price: parseInt(formData.price, 10),
            stock: parseInt(formData.stock, 10),
            stockCritico: parseInt(formData.stockCritico, 10),
        };
        
        updateProducto(formData.id, dataToUpdate);
        
        alert('¡Producto actualizado con éxito!');
        navigate('/Admin/Inventario/ListadoProductos');
    };

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
                        
                        {/* --- CAMPO DE IMAGEN AÑADIDO --- */}
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
                        {/* --- FIN DE CAMPO AÑADIDO --- */}

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
                                <option value="Guitarras">Guitarras</option>
                                <option value="Teclados">Teclados</option>
                                <option value="Baterías">Baterías</option>
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