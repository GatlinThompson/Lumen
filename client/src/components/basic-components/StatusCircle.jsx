import styles from "../../styles/status-circle.module.scss";

export default function StatusCircle({ status = false }) {
  return (
    <div className={styles.status}>
      {status ? (
        <i className={`${styles.complete} bi bi-check-circle-fill`}></i>
      ) : (
        <i className={` ${styles.progress} bi bi-circle-half`}></i>
      )}
    </div>
  );
}
