import styles from "../../styles/training-widgets.module.scss";

export default function DeadlineDate() {
  return (
    <div className={styles.training_widgets}>
      <div className="mx-3 gap-3 mb-1">
        <p className={styles.hr}>May 21, 2025</p>
        <p className="fw-bold fs-5 mb-2">FERPA Annual</p>
        <div className="d-flex flex-row gap-2 justify-content-start">
          <div className="d-flex flex-fill">
            <i class="bi bi-clock me-1"></i>
            <p>1.5 hrs</p>
          </div>
          <div className="d-flex flex-fill">
            <i class="bi bi-mortarboard me-1"></i>
            <p>21 enrolled</p>
          </div>
          <div className="d-flex flex-fill">
            <i class="bi bi-patch-check me-1"></i>
            <p>5 complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}
