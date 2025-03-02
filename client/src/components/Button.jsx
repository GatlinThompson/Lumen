import React from "react";
import "../styles/buttons.scss";

const Button = ({
  type = "button",
  children,
  variant = "default",
  onClick,
  extraClasses = "",
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${extraClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
