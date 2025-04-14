import { useEffect, useState } from "react";
import styles from "../../../styles/calendar.module.scss";
import DaysofWeek from "./DaysofWeek";
import MonthContent from "./MonthContent";

export default function MonthBody(props) {
  const [days, setDays] = useState(props.days);

  // change when days changes from prev, next or when app is started
  useEffect(() => {
    setDays(props.days);
  }, [props.days]);

  return (
    <table className={styles.body}>
      <DaysofWeek />
      <MonthContent
        days={days}
        currentDate={props.currentDate}
        today={props.today}
      />
    </table>
  );
}
