import React from "react";
import TextLink from "../atoms/TextLink";
import { useAuth } from "../../context/AuthContext"; // 1. Importar useAuth
import Button from "../atoms/Button"; // Para el botón de logout

const RegLinks = () => {
  const { user, logout } = useAuth(); // 2. Obtener usuario y logout

  return (
    <div className="position-absolute top-0 end-0 m-3 d-flex align-items-center">
      {/* 3. Lógica condicional */}
      {user ? (
        // Si el usuario ESTÁ logueado
        <>
          <span className="text-muted me-2">
            Bienvenido, <strong>{user.nombre}</strong>
          </span>
          <Button
            label="Cerrar Sesión"
            variant="outline-secondary"
            onClick={logout}
          />
        </>
      ) : (
        // Si el usuario NO está logueado
        <>
          <TextLink to="login" label="Iniciar sesión" color="primary" />
          <span className="text-secondary"> | </span>
          <TextLink to="registro" label="Registrar usuario" color="secondary" />
        </>
      )}
    </div>
  );
};

export default RegLinks;