import React, { useState } from "react";
import styles from "../../styles/button-group.module.scss";

export default function ButtonGroup({ buttons }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="btn-group" role="group">
      {buttons.map((button, index) => (
        <a
          key={index}
          href={button.link}
          className={`btn ${index === activeIndex ? "active" : ""}`}
          onClick={() => setActiveIndex(index)}
        >
          {button.text}
        </a>
      ))}
    </div>
  );
}
