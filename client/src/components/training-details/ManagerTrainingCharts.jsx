import { useEffect, useState } from "react";
import CircleContainer from "../basic-components/CircleContainer";
import styles from "../../styles/training-details.module.scss";
import { apiFetch } from "../../hooks/APIFetch";
export default function ManagerTrainingCharts({ programID }) {
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
    <div className={styles.manager_training_circles}>
      <CircleContainer
        title={"Completed Trainings"}
        color={"green"}
        percent={Math.ceil((assigned.completed / assigned.total) * 100)}
      />
      <CircleContainer
        title={"Enrolled Trainings"}
        color={"blue"}
        percent={Math.ceil((assigned.enrolled / assigned.total) * 100)}
      />
      <CircleContainer
        title={"Not Enrolled Trainings"}
        color={"yellow"}
        percent={Math.ceil((assigned.not_enrolled / assigned.total) * 100)}
      />
      <CircleContainer
        title={"Overdue Trainings"}
        color={"red"}
        percent={Math.ceil((assigned.overdue / assigned.total) * 100)}
      />
    </div>
  );
}
