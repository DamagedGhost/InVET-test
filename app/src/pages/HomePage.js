import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import ProductGrid from '../components/organisms/ProductGrid';
import Button from '../components/atoms/Button';
import useProductsViewModel from '../viewmodels/useProductsViewModel';
import RegLinks from '../components/molecules/RegLinks';
import Iridescence from '../components/Style/Iridescence';
import '../App.css';

const HomePage = () => {
  const { products } = useProductsViewModel();

  return (
    <MainTemplate>
        {/* Contenido principal con z-index encima del fondo */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* 🔹 Sección de enlaces de usuario - Contenedor dedicado con padding */}
          <div className="container position-relative d-flex justify-content-end py-3">
            <RegLinks />
          </div>

          {/* 🔹 Sección principal (Banner) */}
          <section className="container my-3 card p-4 shadow-sm border-0 bg-white">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1 className="fw-bold text-primary">¡Cuida a quien más amas!</h1>
                <p className="lead">
                  En <strong>InVET</strong> encontrarás todo lo necesario para el bienestar de tu mascota.
                  Aprovecha nuestras ofertas en <strong className="fw-bold">alimentos premium, accesorios y farmacia veterinaria</strong>.
                </p>
                <Button label="Ver catálogo" href="/productos" variant="primary" />
              </div>
              <div className="col-md-6 text-center">
                {/* Imagen de banner veterinaria */}
                <img
                  src="https://img.freepik.com/foto-gratis/lindo-mascota-collage-aislado_23-2150007407.jpg"
                  className="img-fluid rounded"
                  alt="Mascotas InVET"
                  style={{ maxHeight: '350px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </section>
          <ProductGrid products={products} />
        </div>
    </MainTemplate>
  );
};

export default HomePage;