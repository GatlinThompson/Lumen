import styles from "../../../styles/calendar.module.scss";

export default function EventIcon({ color = "rgb(194, 194, 194)" }) {
  const backgroundStyle = {
    backgroundColor: color,
  };
  return (
    <div className={styles.event_icon}>
      <div style={backgroundStyle}></div>
    </div>
  );
}
