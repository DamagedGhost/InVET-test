import React, { useState, useEffect } from 'react'; 
import MainTemplate from '../../templates/MainTemplate';
import Button from '../../components/atoms/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import useBoletaViewModel from '../../viewmodels/useBoletaViewModel'; 

const CompraPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const { addBoleta } = useBoletaViewModel(); 

  // Estado para bloquear el botón mientras se procesa
  const [isProcessing, setIsProcessing] = useState(false);

  // --- CARRITO ---
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem('cart');
    setCart(data ? JSON.parse(data) : []);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  // --- FORMULARIO ---
  const [form, setForm] = useState({
    nombre: '', apellido: '', correo: '', calle: '',
    departamento: '', region: 'Región Metropolitana de Santiago', comuna: 'Cerrillos', indicaciones: '',
  });

  useEffect(() => {
    if (user) {
      setForm(prevForm => ({
        ...prevForm,
        nombre: user.nombre || '',
        apellido: user.apellidos || '',
        correo: user.correo || '',
        calle: user.direccion || '',
        comuna: user.comuna || 'Cerrillos',
        region: user.region || 'Región Metropolitana de Santiago'
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // --- MANEJO DEL SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Evitar doble envío
    if (isProcessing) return;

    const userId = user ? (user.id || user._id) : null;

    if (!userId) {
        alert("Debes iniciar sesión para completar la compra.");
        navigate('/login');
        return;
    }

    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    // Validación Precio Negativo (VET-3) en Frontend
    if (total < 0) {
        alert("Error: El total de la compra no puede ser negativo. Revisa tu carrito.");
        return;
    }

    // Activamos estado de carga
    setIsProcessing(true);

    const nuevaBoleta = {
        total: total,
        usuario: userId, 
        estado: 'Emitida',
        items: cart.map(prod => ({
            productoId: prod.id, 
            titulo: prod.title,
            precio: prod.price,
            cantidad: prod.cantidad
        }))
    };

    try {
        await addBoleta(nuevaBoleta);
        localStorage.removeItem('cart'); 
        navigate('/pago-correcto');
    } catch (error) {
        console.error(error);
        alert("Hubo un error al procesar tu compra: " + error.message);
        navigate('/pago-error');
    } finally {
        // Desactivamos carga pase lo que pase
        setIsProcessing(false);
    }
  };

  return (
    <MainTemplate>
      <main className="container my-5">
        <h2 className="text-center mb-4 fw-bold">Carrito de compra</h2>

        {/* Feedback visual si está procesando */}
        {isProcessing && (
            <div className="alert alert-info text-center">
                <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                Procesando tu compra, por favor espera...
            </div>
        )}

        <div className="card shadow-sm p-4 mb-4">
          <h5 className="fw-semibold mb-3">Tus Productos</h5>
          {cart.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.title}>
                        <td>{item.title}</td>
                        <td className={item.price < 0 ? "text-danger fw-bold" : ""}>
                            ${item.price.toLocaleString()}
                        </td>
                        <td>{item.cantidad}</td>
                        <td>${(item.price * item.cantidad).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-end mt-3">
                <h5>
                  <span className={`fw-bold ${total < 0 ? 'text-danger' : 'text-success'}`}>
                    Total a pagar: ${total.toLocaleString()}
                  </span>
                </h5>
              </div>
            </>
          ) : (
            <p className="text-center text-muted">No hay productos en tu carrito.</p>
          )}
        </div>

        <div className="card shadow-sm p-4 mb-4">
          <h5 className="fw-semibold mb-3">Información del cliente</h5>
          {/* Deshabilitamos el formulario mientras procesa */}
          <fieldset disabled={isProcessing}>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Nombre*</label>
                <input type="text" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellidos*</label>
                <input type="text" name="apellido" className="form-control" value={form.apellido} onChange={handleChange} required />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Correo*</label>
              <input type="email" name="correo" className="form-control" value={form.correo} onChange={handleChange} required />
            </div>

            <h5 className="fw-semibold mb-3 mt-4">Dirección de entrega</h5>
            <div className="row mb-3">
              <div className="col-md-8">
                <label className="form-label">Calle*</label>
                <input type="text" name="calle" className="form-control" value={form.calle} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Departamento</label>
                <input type="text" name="departamento" className="form-control" value={form.departamento} onChange={handleChange} />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Región*</label>
                <input type="text" name="region" className="form-control" value={form.region} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Comuna*</label>
                <input type="text" name="comuna" className="form-control" value={form.comuna} onChange={handleChange} required />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Indicaciones (opcional)</label>
              <textarea name="indicaciones" className="form-control" rows="2" value={form.indicaciones} onChange={handleChange}></textarea>
            </div>

            <div className="d-grid">
              {/* Botón dinámico */}
              <button 
                type="submit" 
                className="btn btn-success btn-lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Procesando...
                    </>
                ) : (
                    `Pagar ahora $${total.toLocaleString()}`
                )}
              </button>
            </div>
          </form>
          </fieldset>
        </div>
      </main>
    </MainTemplate>
  );
};

export default CompraPage;