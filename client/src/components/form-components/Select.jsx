import React from "react";
import styles from "../../styles/input.module.scss";

const Select = ({
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
  children,
  extraClasses,
  disabled = false,
}) => {
  return (
    <div className={`${styles.input_container} ${extraClasses}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className={`${styles.input_field}  ${styles.selection}`}
      >
        <option value="" hidden>
          {placeholder}
        </option>
        {children}
      </select>
      {touched && error ? <p>{error}</p> : null}
    </div>
  );
};

export default Select;
