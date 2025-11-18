import AdminTemplate from "../../templates/AdminTemplate";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useProductsViewModel from "../../viewmodels/useProductsViewModel"; // 1. Importar el hook

const NuevoProducto = () => {
    const navigate = useNavigate();
    const { addProducto } = useProductsViewModel(); // 2. Traer la función 'addProducto'

    const [formData, setFormData] = useState({
        codigo: '',
        title: '', // Cambiado de 'nombre' a 'title' para coincidir con tu hook
        descripcion: '',
        price: '', // 'price' en lugar de 'precio'
        stock: '',
        stockCritico: '',
        categoria: '',
        image: '', // <-- CAMPO NUEVO AÑADIDO
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 3. Llamar a la función del hook con los datos del formulario
        addProducto(formData); 
        
        alert('¡Producto agregado con éxito!');
        // 4. Redirigir al listado para ver el nuevo producto
        navigate('/Admin/Inventario/ListadoProductos'); 
    };

    return (
      <AdminTemplate>
        <main className="flex-grow-1" id="main-content" role="main">
          <div className="container-fluid py-4">
            <nav aria-label="breadcrumb" className="mb-3">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="/Admin">Administración</a></li>
                <li className="breadcrumb-item"><a href="/Admin/Inventario/ListadoProductos">Inventario</a></li>
                <li className="breadcrumb-item active" aria-current="page">Nuevo Producto</li>
              </ol>
            </nav>

            <header className="d-flex align-items-start justify-content-between mb-4">
              <div>
                <h1 className="h4 mb-1">Gestión de Inventario</h1>
                <p className="text-muted mb-0">Visualiza, crea y administra los productos del inventario.</p>
              </div>
              <div className="d-flex gap-2">
                <a className="btn btn-primary" href="/Admin/Inventario/NuevoProducto">Crear producto</a>
                <a className="btn btn-outline-primary" href="/Admin/Inventario/ListadoProductos">Mostrar productos</a>
              </div>
            </header>

            <section>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h2 className="h5 mb-4">Nuevo Producto</h2>

                  <form id="registrationForm" onSubmit={handleSubmit}>
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

                    {/* Imagen */}
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
                        Agregar Producto
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </main>
      </AdminTemplate>
    );
}

export default NuevoProducto;