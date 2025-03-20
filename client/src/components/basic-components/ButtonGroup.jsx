import React, { useState } from "react";
import styles from "../../styles/button-group.module.scss";

export default function ButtonGroup({ buttons, initialActiveIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  return (
    <div className={styles.btn_group_container}>
      <div className={styles.btn_group} role="group">
        {buttons.map((button, index) => (
          <a
            key={index}
            href={button.link}
            className={`${styles.btn} ${
              index === activeIndex ? styles.active : ""
            } ${button.extraClasses || ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {button.text}
          </a>
        ))}
      </div>
    </div>
  );
}
