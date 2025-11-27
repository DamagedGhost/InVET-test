import React from "react";
import { Link } from "react-router-dom";
import MainTemplate from "../../templates/MainTemplate";
import useProductsViewModel from "../../viewmodels/useProductsViewModel";
import LoadingSpinner from "../../components/atoms/LoadingSpinner"; // Importamos Spinner

const CategoriasPage = () => {
  const { products, loading } = useProductsViewModel();

  // 1. FILTRO: Solo productos activos y con stock (Igual que en ProductosPage)
  const productosVisibles = products.filter(p => p.activo !== false && p.stock > 0);

  // 2. Agrupar productos FILTRADOS por categoría
  const categorias = productosVisibles.reduce((acc, product) => {
    if (!acc[product.categoria]) acc[product.categoria] = [];
    acc[product.categoria].push(product);
    return acc;
  }, {});

  const slugify = (s) =>
    String(s)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const handleGoTo = (categoria) => {
    const id = slugify(categoria);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = id;
  };

  return (
    <MainTemplate>
      <div className="container my-5">
        <h2 className="text-center mb-5 fw-bold">Categorías</h2>

        {loading ? (
            <LoadingSpinner text="Cargando categorías..." />
        ) : (
            <>
                {/* A. Vista general de categorías (Botones superiores) */}
                {Object.keys(categorias).length > 0 ? (
                    <div className="row justify-content-center mb-5">
                        {Object.keys(categorias).map((cat) => (
                            <div key={cat} className="col-6 col-sm-4 col-md-3 mb-4">
                                <div
                                    className="card shadow-sm text-center border-0 h-100"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => handleGoTo(cat)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") handleGoTo(cat);
                                    }}
                                    style={{ cursor: "pointer", transition: "transform 0.2s" }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                >
                                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                        <i className="bi bi-tag-fill fs-3 text-primary mb-2"></i>
                                        <h5 className="card-title fw-bold text-dark">{cat}</h5>
                                        <p className="text-muted small mb-0">{categorias[cat].length} productos</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <p className="text-muted">No hay categorías disponibles con productos en stock.</p>
                    </div>
                )}

                {/* B. Listado de productos por categoría */}
                {Object.entries(categorias).map(([categoria, items]) => (
                    <section key={categoria} id={slugify(categoria)} className="mb-5 pt-4">
                        <div className="d-flex align-items-center mb-4 border-bottom pb-2">
                             <h3 className="text-primary fw-bold mb-0 me-3">{categoria}</h3>
                             <span className="badge bg-secondary rounded-pill">{items.length}</span>
                        </div>
                        
                        <div className="row g-4">
                            {items.map((p, i) => (
                                <div key={i} className="col-6 col-md-3">
                                    <div className="card h-100 shadow-sm border-0 product-card">
                                        <Link to={`/productos/${p.title.replace(/\s+/g, '-').toLowerCase()}`} className="text-decoration-none">
                                            <div className="p-3 text-center">
                                                <img
                                                    src={p.image}
                                                    className="card-img-top"
                                                    alt={p.title}
                                                    style={{ objectFit: "contain", height: "180px" }}
                                                />
                                            </div>
                                            <div className="card-body text-center">
                                                <h6 className="card-title text-dark fw-bold text-truncate" title={p.title}>
                                                    {p.title}
                                                </h6>
                                                <p className="text-primary fw-bold mb-0">
                                                    ${p.price.toLocaleString()}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </>
        )}
      </div>
    </MainTemplate>
  );
};

export default CategoriasPage;