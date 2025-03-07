import React from "react";
import styles from "../styles/input.module.scss";

const Input = ({
  type = "text",
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  required,
  error,
  touched,
}) => {
  console.log(touched);
  return (
    <div className={`${styles.input_container}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className={`${styles.input_field}`}
      />
      {touched && error ? <p>{error}</p> : null}
    </div>
  );
};

export default Input;
