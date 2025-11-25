import React from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

function FormGrupo({ label, type, placeholder, value, onChange, name, required, error, as = 'input' }) {
  return (
    <div className="mb-3">
      <Label htmlFor={name} text={label} />
      {as === 'textarea' ? (
        <textarea
          id={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          rows="4"
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          id={name}
        />
      )}
      {error && <span className="text-danger small">{error}</span>}
    </div>
  );
}

export default FormGrupo;