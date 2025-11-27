import React from "react";
import { Link } from "react-router-dom";
import MainTemplate from "../../templates/MainTemplate";
import useProductsViewModel from "../../viewmodels/useProductsViewModel";

const CategoriasPage = () => {
  const { products } = useProductsViewModel();

  // Agrupar productos por categoría
  const categorias = products.reduce((acc, product) => {
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
            <h2 className="text-center mb-5">Categorías</h2>

            {/* Vista general de categorías */}
            <div className="row justify-content-center mb-5">
                {Object.keys(categorias).map((cat) => (
                    <div key={cat} className="col-6 col-sm-4 col-md-3 mb-4">
                        <div
                            className="card shadow-sm text-center"
                            role="button"
                            tabIndex={0}
                            onClick={() => handleGoTo(cat)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") handleGoTo(cat);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="card-body">
                                <h5 className="card-title">{cat}</h5>
                                <p className="text-muted">{categorias[cat].length} productos</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Listado de productos por categoría */}
            {Object.entries(categorias).map(([categoria, items]) => (
                <section key={categoria} id={slugify(categoria)} className="mb-5">
                    <h4 className="mb-4">{categoria}</h4>
                    <div className="row g-4">
                        {items.map((p, i) => (
                            <div key={i} className="col-6 col-md-3">
                                <div className="card h-100 shadow-sm">
                                    <Link to={`/productos/${p.title.replace(/\s+/g, '-').toLowerCase()}`}>
                                    <img
                                        src={p.image}
                                        className="card-img-top"
                                        alt={p.title}
                                        style={{ objectFit: "cover", height: "300px" }}
                                    />
                                    </Link>
                                    <div className="card-body">
                                        <h6 className="card-title">{p.title}</h6>
                                        <p className="text-muted">${p.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    </MainTemplate>
);
};

export default CategoriasPage;
