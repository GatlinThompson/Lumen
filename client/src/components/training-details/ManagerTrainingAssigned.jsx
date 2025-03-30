import { useEffect, useState } from "react";
import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/manager-training-widgets.module.scss";
import { apiFetch } from "../../hooks/APIFetch";

export default function ManagerTrainingAssigned({ programID }) {
  const [assigned, setAssigned] = useState([]);

  useEffect(() => {
    const getAssignedCount = async () => {
      const { result, error } = await apiFetch(
        `/api/training-program/${programID}/assign-count`,
        "GET"
      );

      if (!error) {
        setAssigned(result.assigned);
      }
    };

    if (programID) {
      getAssignedCount();
    }
  }, [programID]);
  return (
    <>
      <CardContainer extraClasses={`${styles.insights}`}>
        <p>Total Employees Assigned: {assigned.total ? assigned.total : "0"}</p>
      </CardContainer>
      <CardContainer extraClasses={`${styles.enrollment}`}>
        <div className={styles.stage}>
          <p className={styles.number}>
            {assigned.enrolled ? assigned.enrolled : "0"}
          </p>
          <p className={styles.stage_text}>Enrolled</p>
        </div>
        <div className={styles.divider} />
        <div className={styles.stage}>
          <p className={styles.number}>
            {assigned.completed ? assigned.completed : "0"}
          </p>
          <p className={styles.stage_text}>Completed</p>
        </div>
        <div className={styles.divider} />
        <div className={styles.stage}>
          <p className={styles.number}>
            {assigned.overdue ? assigned.overdue : "0"}
          </p>
          <p className={styles.stage_text}>Overdue</p>
        </div>
      </CardContainer>
    </>
  );
}
