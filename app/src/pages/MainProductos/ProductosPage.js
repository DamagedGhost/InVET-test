import React from 'react';
import { Link } from 'react-router-dom';
import MainTemplate from '../../templates/MainTemplate';
import useProductsViewModel from '../../viewmodels/useProductsViewModel';
import Button from '../../components/atoms/Button';
import LoadingSpinner from '../../components/atoms/LoadingSpinner'; 

const ProductosPage = () => {
  const { products, loading } = useProductsViewModel();

  // FILTRO PÚBLICO:
  // 1. activo !== false (Muestra los true y los undefined/viejos)
  // 2. stock > 0 (Oculta sin stock)
  const productosVisibles = products.filter(p => p.activo !== false && p.stock > 0);

  const handleAddToCart = (product) => {
     // ... (tu lógica de carrito igual que antes) ...
     const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
     const existingProduct = storedCart.find((item) => item.title === product.title);
     let updatedCart;
     if (existingProduct) {
       updatedCart = storedCart.map((item) =>
         item.title === product.title ? { ...item, cantidad: item.cantidad + 1 } : item
       );
     } else {
       updatedCart = [...storedCart, { ...product, cantidad: 1 }];
     }
     localStorage.setItem('cart', JSON.stringify(updatedCart));
     alert(product.title + ' agregado al carrito');
  };

  return (
    <MainTemplate>
      <main id="productos" className="container my-5">
        <div className="text-center mb-5">
            <h2 className="fw-bold display-6">Catálogo Completo</h2>
            <p className="text-muted">Explora nuestra selección de productos de alta calidad</p>
        </div>

        {loading ? (
            <LoadingSpinner text="Obteniendo productos del inventario..." />
        ) : (
            <div className="row row-cols-1 row-cols-md-4 g-4">
            {productosVisibles.length > 0 ? (
                productosVisibles.map((product, index) => (
                    <div className="col" key={index}>
                    <div className="card h-100 text-center shadow-sm product-card border-0">
                        <Link to={`/productos/${product.title.replace(/\s+/g, '-').toLowerCase()}`} className="overflow-hidden">
                        <img
                            src={product.image}
                            className="card-img-top p-3"
                            alt={product.title}
                            style={{ cursor: 'pointer', height: '220px', objectFit: 'contain', transition: 'transform 0.3s' }}
                        />
                        </Link>
                        <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 className="card-title fs-6 fw-bold text-dark">{product.title}</h5>
                            <p className="text-muted small">{product.categoria}</p>
                        </div>
                        <div className="mt-3">
                            <h4 className="text-primary fw-bold mb-3">
                                ${product.price.toLocaleString()}
                            </h4>
                            <Button
                                label="Agregar al carrito"
                                variant="outline-primary"
                                fullWidth={true}
                                onClick={() => handleAddToCart(product)}
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                ))
            ) : (
                <div className="col-12 text-center">
                    <p className="text-muted">No hay productos disponibles en este momento.</p>
                </div>
            )}
            </div>
        )}
      </main>
    </MainTemplate>
  );
};

export default ProductosPage;