import React from "react";
import styles from "../../styles/input.module.scss";

const TextArea = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  required,
  error,
  touched,
}) => {
  return (
    <div className={`${styles.input_container}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        defaultValue={value}
        onChangeCapture={onChange}
        onBlur={onBlur}
        required={required}
        className={`${styles.input_field}`}
      />
      {touched && error ? <p>{error}</p> : null}
    </div>
  );
};

export default TextArea;
