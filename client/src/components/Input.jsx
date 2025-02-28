import React from "react";
import "../styles/input.css";

const Input = ({
  type = "text",
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <div className="input-container">
      {label && <label htmlFor={name}>{label}</label>}

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-field"
      />
    </div>
  );
};

export default Input;
