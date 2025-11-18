import React from 'react';

function Input({ type, placeholder, value, onChange, name, required, id }) {
  return (
    <input
      type={type}
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      id={id} 
    />
  );
}

export default Input;