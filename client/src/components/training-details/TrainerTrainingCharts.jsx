import styles from "../../styles/training-details.module.scss";
import CircleContainer from "../basic-components/CircleContainer";

export default function TrainerTrainingCharts({ count }) {
  return (
    <div className={styles.manager_training_circles}>
      <CircleContainer
        title={"Enrolled"}
        color={"blue"}
        percent={Math.ceil((count.enrolled / count.assigned) * 100)}
      />
      <CircleContainer
        title={"Not Enrolled"}
        color={"yellow"}
        percent={Math.ceil(
          ((count.assigned - (count.completed + count.enrolled)) /
            count.assigned) *
            100
        )}
      />
      <CircleContainer
        title={"Completed"}
        color={"green"}
        percent={Math.ceil((count.completed / count.assigned) * 100)}
      />
    </div>
  );
}
