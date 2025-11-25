import React, { useState, useEffect } from 'react';
import MainTemplate from '../../templates/MainTemplate';
import Button from '../../components/atoms/Button';
import { useNavigate } from 'react-router-dom';

const CarritoPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage al entrar
  useEffect(() => {
    const cargarCarrito = () => {
      try {
        const data = localStorage.getItem('cart');
        if (data) {
          const parsed = JSON.parse(data);
          console.log('Carrito cargado:', parsed);
          setCart(parsed);
        } else {
          console.log('No hay carrito guardado');
          setCart([]);
        }
      } catch (error) {
        console.error('Error leyendo carrito:', error);
        setCart([]);
      }
    };

    cargarCarrito();
    window.addEventListener('focus', cargarCarrito);

    return () => window.removeEventListener('focus', cargarCarrito);
  }, []);

  // Escuchar cambios del carrito entre pestañas o componentes
  useEffect(() => {
    const syncCarrito = (event) => {
      if (event.key === 'cart') {
        const updated = JSON.parse(event.newValue) || [];
        console.log('Carrito sincronizado:', updated);
        setCart(updated);
      }
    };

    window.addEventListener('storage', syncCarrito);
    return () => window.removeEventListener('storage', syncCarrito);
  }, []);

  // Calcular total
  const total = cart.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  // Eliminar producto
  const handleEliminar = (title) => {
    const updated = cart.filter((item) => item.title !== title);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  // Vaciar carrito
  const handleVaciar = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Navegar a compra
  const handleComprar = () => {
    navigate('/compra');
  };

  // Ir a seguir comprando
  const handleSeguirComprando = () => {
    navigate('/productos');
  };

  return (
    <MainTemplate>
      <main className="container my-5">
        <div className="row">
          {/* Columna izquierda */}
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h4 className="mb-3 text-center">Resumen de compra</h4>
              {cart.length === 0 ? (
                <p className="text-center text-muted">Tu carrito esta vacio.</p>
              ) : (
                <>
                  <ul className="list-group mb-3">
                    {cart.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span>{item.title}</span>
                        <span>${(item.price * item.cantidad).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                  <h5 className="text-success text-center">
                    Total: ${total.toLocaleString()}
                  </h5>
                  <div className="d-grid mt-3 gap-2">
                    <Button label="Comprar" variant="primary" onClick={handleComprar} fullWidth />
                    <Button label="Vaciar carrito" variant="outline-danger" onClick={handleVaciar} />
                    <Button label="Seguir comprando" variant="outline-secondary" onClick={handleSeguirComprando} />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Columna derecha */}
          <div className="col-md-8">
            <h3 className="mb-4 text-center">Productos en tu carrito</h3>
            {cart.length === 0 ? (
              <p className="text-center text-muted">No hay productos agregados.</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="card mb-3 shadow-sm">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-3 text-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid rounded"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">Precio: ${item.price.toLocaleString()}</p>
                        <p className="card-text">Cantidad: {item.cantidad}</p>
                      </div>
                    </div>
                    <div className="col-md-3 text-center">
                      <Button
                        label="Eliminar"
                        variant="outline-danger"
                        onClick={() => handleEliminar(item.title)}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </MainTemplate>
  );
};

export default CarritoPage;
