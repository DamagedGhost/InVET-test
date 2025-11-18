import React, { useState } from 'react';
import MainTemplate from '../../src/templates/MainTemplate';
import Button from '../../src/components/atoms/Button';
import { useAuth } from '../../src/context/AuthContext'; // 1. Importar useAuth

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login } = useAuth(); // 2. Obtener la función de login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 3. Llamar a la función de login del contexto
    login(formData.email, formData.password);
  };

  return (
    <MainTemplate>
      <main className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Iniciar Sesión</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="admin@mail.com" // Pista para probar
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="123" // Pista para probar
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  <Button label="Ingresar" variant="primary" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </MainTemplate>
  );
};

export default LoginPage;