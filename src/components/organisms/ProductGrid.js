import ProductCard from '../molecules/ProductCard';

const ProductGrid = ({ products }) => (
  <section id="productos" className="container my-5">
    <h2 className="text-center mb-4">Nuestros Productos</h2>
    <div className="row row-cols-1 row-cols-md-4 g-3">
      {products.map((p, i) => (
        <ProductCard key={i} {...p} />
      ))}
    </div>
  </section>
);
export default ProductGrid;
