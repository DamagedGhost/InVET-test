import React from 'react';
import { Link } from 'react-router-dom';
import MainTemplate from '../../templates/MainTemplate';
import useProductsViewModel from '../../viewmodels/useProductsViewModel';
import Button from '../../components/atoms/Button';

const ProductosPage = () => {
  const { products } = useProductsViewModel();

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = storedCart.find((item) => item.title === product.title);
    let updatedCart;

    if (existingProduct) {
      updatedCart = storedCart.map((item) =>
        item.title === product.title
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      updatedCart = [...storedCart, { ...product, cantidad: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log('✅ Carrito actualizado:', updatedCart);
    alert(product.title + ' agregado al carrito');
  };

  return (
    <MainTemplate>
      <main id="productos" className="container my-5">
        <h2 className="text-center mb-4">Nuestros Productos</h2>
        <div className="row row-cols-1 row-cols-md-4 g-3">
          {products.map((product, index) => (
            <div className="col" key={index}>
              <div className="card h-100 text-center shadow-sm">
                <Link to={`/productos/${product.title.replace(/\s+/g, '-').toLowerCase()}`}>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    style={{ cursor: 'pointer', height: '200px', objectFit: 'contain' }}
                  />
                </Link>
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text fw-bold text-danger">
                    ${product.price.toLocaleString()}
                  </p>
                  <Button
                    label="Agregar al carrito"
                    variant="outline-primary"
                    onClick={() => handleAddToCart(product)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </MainTemplate>
  );
};

export default ProductosPage;
