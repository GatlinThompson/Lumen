import { useState } from "react";
import styles from "../../../styles/calendar.module.scss";
export default function DaysofWeek() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <thead className={styles.week_days}>
      <tr>
        {days.map((day, index) => (
          <th key={index}>{day}</th>
        ))}
      </tr>
    </thead>
  );
}
