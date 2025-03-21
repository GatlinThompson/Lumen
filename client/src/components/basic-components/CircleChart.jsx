import styles from "../../styles/circle-chart.module.scss";

export default function CircleChart({
  percent = 25,
  border = true,
  size,
  color = "yellow",
}) {
  const backgroundStyle = {
    backgroundImage: `conic-gradient(transparent 0% ${
      100 - percent
    }%, var(--circle-color) ${100 - percent}% 100%)`,
  };
  return (
    <div
      className={`${styles.circle_chart} ${border ? styles.border : ""} ${
        size === "large" ? styles.large : ""
      } ${styles[color]}`}
      style={backgroundStyle}
    ></div>
  );
}
