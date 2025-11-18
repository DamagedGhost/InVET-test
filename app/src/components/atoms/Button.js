import React from "react";
import { Link } from 'react-router-dom'; // 1. Importar Link

const Button = ({ label, text, href, onClick, variant = "primary", type = "button", fullWidth = false }) => {
  const content = label || text;
  const classNames = `btn btn-${variant} ${fullWidth ? "w-100" : ""}`;

  // 2. Si el 'href' es una ruta INTERNA (empieza con '/'), usamos <Link>
  if (href && href.startsWith('/')) {
    return (
      <Link to={href} className={classNames}>
        {content}
      </Link>
    );
  }

  // 3. Si el 'href' es una ruta EXTERNA (ej: http://), usamos <a>
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classNames}>
        {content}
      </a>
    );
  }
  
  // 4. Si no hay 'href', usamos <button> (para formularios)
  return (
    <button type={type} onClick={onClick} className={classNames}>
      {content}
    </button>
  );
};

export default Button;
