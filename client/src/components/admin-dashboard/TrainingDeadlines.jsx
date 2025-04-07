import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/training-widgets.module.scss";
import DeadlineDate from "./DeadlineDate";

export default function TrainingDeadlines() {
  return (
    <div className={styles.training_widgets}>
      <CardContainer extraClasses="d-flex flex-column gap-3">
        <h2 className="fs-5 mx-3 mt-3 mb-0">Upcoming Training Deadlines</h2>

        <DeadlineDate />
      </CardContainer>
    </div>
  );
}
