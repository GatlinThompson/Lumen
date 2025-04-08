import styles from "../../styles/status-circle.module.scss";

export default function StatusCircle({ status = false, training_status = "" }) {
  return (
    <div className={styles.status}>
      {status == true && !training_status && (
        <i className={`${styles.complete} bi bi-check-circle-fill`}></i>
      )}{" "}
      {status == false && !training_status && (
        <i className={` ${styles.progress} bi bi-circle-half`}></i>
      )}
      {status == false && training_status == "enrolled" && (
        <i className={` ${styles.progress} bi bi-circle-half`}></i>
      )}
      {status == false && training_status == "complete" && (
        <i className={`${styles.complete} bi bi-check-circle-fill`}></i>
      )}
      {status == false && training_status == "not-enrolled" && (
        <i className={`${styles.assigned} bi bi-circle`}></i>
      )}
    </div>
  );
}
