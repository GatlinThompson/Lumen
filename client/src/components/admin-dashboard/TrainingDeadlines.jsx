import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/training-widgets.module.scss";

export default function TrainingDeadlines() {
  return (
    <div className={styles.training_widgets}>
      <CardContainer extraClasses="d-flex flex-column gap-3 mt-4">
        <h2 className="fs-5 mx-3 mt-3 mb-0">Upcoming Training Deadlines</h2>

        <div className="mx-3 gap-3 mb-1">
          <p className={styles.hr}>May 21, 2025</p>
          <p className="fw-bold fs-5 mb-2">FERPA Annual</p>
          <div className="d-flex flex-row gap-2 justify-content-center">
            <i class="bi bi-clock"></i>
            <p>1.5 hrs</p>
            <i class="bi bi-mortarboard"></i>
            <p>21 enrolled</p>
            <i class="bi bi-patch-check"></i>
            <p>5 complete</p>
          </div>
        </div>
      </CardContainer>
    </div>
  );
}
