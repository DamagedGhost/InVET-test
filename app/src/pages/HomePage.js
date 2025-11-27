import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import ProductGrid from '../components/organisms/ProductGrid';
import Button from '../components/atoms/Button';
import useProductsViewModel from '../viewmodels/useProductsViewModel';
import RegLinks from '../components/molecules/RegLinks';
import LoadingSpinner from '../components/atoms/LoadingSpinner'; 
import '../App.css';

const HomePage = () => {
  const { products, loading } = useProductsViewModel();

  // 1. FILTRO: Solo mostrar activos y con stock > 0
  const productosDestacados = products
    .filter(p => p.activo !== false && p.stock > 0)
    .slice(0, 8); // Tomamos solo los primeros 8 VÁLIDOS

  return (
    <MainTemplate>
        <div style={{ position: 'relative', zIndex: 1 }}>
          
          <div className="container position-relative d-flex justify-content-end py-3">
            <RegLinks />
          </div>

          {/* 🔹 Hero Section */}
          <section className="container my-4">
            <div className="card border-0 shadow-lg overflow-hidden" style={{ borderRadius: '20px' }}>
                <div className="row g-0">
                    <div className="col-md-6 p-5 d-flex flex-column justify-content-center bg-white">
                        <span className="text-primary fw-bold text-uppercase mb-2 tracking-wide">
                            Bienvenido a InVET
                        </span>
                        <h1 className="display-4 fw-bold mb-3 text-dark">
                            Salud y felicidad <br/> para tu mascota
                        </h1>
                        <p className="lead text-muted mb-4">
                            Especialistas en medicina veterinaria, alimentos premium y los mejores accesorios. 
                            Porque ellos son familia.
                        </p>
                        <div>
                            <Button label="Ver Catálogo" href="/productos" variant="primary" size="lg" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img
                          src="https://img.freepik.com/foto-gratis/lindo-mascota-collage-aislado_23-2150007407.jpg"
                          className="img-fluid w-100 h-100"
                          alt="Mascotas InVET"
                          style={{ objectFit: 'cover', minHeight: '350px' }}
                        />
                    </div>
                </div>
            </div>
          </section>

          {/* 🔹 Grid de Productos Destacados */}
          {loading ? (
             <LoadingSpinner text="Cargando nuestros productos destacados..." />
          ) : (
             <div className="container my-5">
                <h3 className="mb-4 fw-bold text-center text-secondary">Productos Destacados</h3>
                {productosDestacados.length > 0 ? (
                    <ProductGrid products={productosDestacados} />
                ) : (
                    <p className="text-center text-muted">No hay productos destacados disponibles por el momento.</p>
                )}
             </div>
          )}
        </div>
    </MainTemplate>
  );
};

export default HomePage;