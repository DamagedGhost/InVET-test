import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = storedCart.reduce((acc, item) => acc + item.cantidad, 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('focus', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('focus', updateCartCount);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">On The Go Music</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav me-auto">
          <li><Link className="nav-link active" to="/">Inicio</Link></li>
          <li><Link className="nav-link" to="/categoria">Categoria</Link></li>
        <li><Link className="nav-link" to="/productos">Productos</Link></li>
          <li><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
          <li><Link className="nav-link" to="/blogs">Blogs</Link></li>
          <li><Link className="nav-link" to="/contacto">Contacto</Link></li>
        </ul>
        <ul className="navbar-nav ms-auto">
          <li>
            <Link className="nav-link" to="/carrito">
              <i className="bi bi-cart"></i> Carrito ({cartCount})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
