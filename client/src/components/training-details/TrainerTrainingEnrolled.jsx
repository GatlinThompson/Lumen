import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/trainer-training-widgets.module.scss";
import { apiFetch } from "../../hooks/APIFetch";
import { useEffect, useState } from "react";
import TrainerTrainingCharts from "./TrainerTrainingCharts";

export default function TrainerTrainingEnrolled({ program, sessions }) {
  const [count, setCount] = useState([]);

  const getWidgetInfo = async () => {
    const sessionData = { sessions: sessions };
    console.log(sessionData);
    const { result, error } = await apiFetch(
      `/api/training-programs/${program}/enrollment-count`,
      "POST",
      sessionData
    );

    if (!error) {
      console.log(result);
      setCount(result.count);
    }
  };

  useEffect(() => {
    if (sessions && program) getWidgetInfo();
  }, [program, sessions]);
  return (
    <>
      <CardContainer extraClasses={`${styles.container}`}>
        <div className={styles.enrolled}>
          <p className={styles.num}>{count.enrolled ? count.enrolled : "0"}</p>
          <p className={styles.status}>Enrolled</p>
        </div>
        <div className={styles.divider} />
        <div className={styles.enrolled}>
          <p className={styles.num}>
            {count.completed ? count.completed : "0"}
          </p>
          <p className={styles.status}>Completed</p>
        </div>
        <div className={styles.divider} />
        <div className={styles.enrolled}>
          <p className={styles.num}>{count.assigned ? count.assigned : "0"}</p>
          <p className={styles.status}>Assigned</p>
        </div>
      </CardContainer>
      <TrainerTrainingCharts count={count} />
    </>
  );
}
