import React from "react";
import "../styles/buttons.scss";

const Button = ({
  children,
  variant = "default",
  onClick,
  extraClasses = "",
}) => {
  return (
    <button className={`btn btn-${variant} ${extraClasses}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
