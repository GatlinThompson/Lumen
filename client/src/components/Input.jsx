import React from "react";
import styles from "../styles/input.module.scss";

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
    <div className={`${styles.input_container}`}>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${styles.input_field}`}
      />
    </div>
  );
};

export default Input;
