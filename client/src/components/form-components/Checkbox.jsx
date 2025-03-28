import React from "react";
import styles from "../../styles/checkbox.module.scss";

const Checkbox = ({ label, checked, onChange, name, value }) => {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.checkmark}></span>
      {label}
    </label>
  );
};

export default Checkbox;
