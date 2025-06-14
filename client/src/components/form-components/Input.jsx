import React from "react";
import styles from "../../styles/input.module.scss";

const Input = ({
  type = "text",
  label,
  name,
  value,
  onChange,
  onBlur,
  onClick,
  placeholder,
  required,
  error,
  touched,
  extraClasses = null,
  pattern,
  disabled,
}) => {
  return (
    <div className={`${styles.input_container} ${extraClasses}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        pattern={pattern}
        placeholder={placeholder}
        required={required}
        className={``}
        onClick={onClick}
        disabled={disabled}
      />
      {touched && error ? <p>{error}</p> : null}
    </div>
  );
};

export default Input;
