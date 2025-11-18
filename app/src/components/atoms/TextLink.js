import React from "react";
import { Link } from "react-router-dom";

const TextLink = ({ to, label, color = "primary", underline = false }) => (
  <Link
    to={to}
    className={`text-${color} ${underline ? "text-decoration-underline" : "text-decoration-none"} me-2`}
  >
    {label}
  </Link>
);

export default TextLink;
