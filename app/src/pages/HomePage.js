import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import ProductGrid from '../components/organisms/ProductGrid';
import Button from '../components/atoms/Button';
import useProductsViewModel from '../viewmodels/useProductsViewModel';
import RegLinks from '../components/molecules/RegLinks';
import '../App.css';

const HomePage = () => {
  const { products } = useProductsViewModel();

  return (
    <MainTemplate>
      {/* 🔹 Sección de enlaces de usuario */}
      <section className="d-flex mb-5 position-relative">
        <div className="container position-relative">
          <RegLinks />
        </div>
      </section>
      {/* 🔹 Sección principal */}
      <section className="container my-5 card p-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold text-danger">¡OFERTA DIECIOCHERA!</h1>
            <p className="lead">
              Celebra las Fiestas Patrias con el mejor ritmo.  
              Durante septiembre, disfruta <strong className="fw-bold">descuentos exclusivos en guitarras, teclados y baterías</strong>.  
              ¡Equípate con instrumentos de calidad a precios patrios!
            </p>
            <Button label="Ver productos" href="#productos" />
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://i.gyazo.com/12b9396a1b9f8aa4a1d5a8011415d502.png"
              className="img-fluid rounded"
              alt="banner"
              style={{ width: '700px', height: '400px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <ProductGrid products={products} />
    </MainTemplate>
  );
};

export default HomePage;
