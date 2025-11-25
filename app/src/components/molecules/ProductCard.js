import ProductImage from '../atoms/ProductImage';

const ProductCard = ({ title, price, image }) => (
  <div className="col">
    <div className="card text-center">
      <ProductImage src={image} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">${price}</p>
      </div>
    </div>
  </div>
);
export default ProductCard;