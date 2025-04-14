import styles from "../../../styles/calendar.module.scss";

export default function MonthHeader(props) {
  const goToNextMonth = () => {
    props.nextMonth();
  };

  const goToPreviousMonth = () => {
    props.prevMonth();
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.button}>
          <button onClick={goToPreviousMonth}>&lt;</button>
        </div>
        <div className={styles.name}>
          <h2>{props.month}</h2>
        </div>
        <div className={styles.button}>
          <button onClick={goToNextMonth}>&gt;</button>
        </div>
      </div>
    </>
  );
}
