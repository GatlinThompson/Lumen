import styles from "../../styles/success-page.module.scss";

export default function SuccessHeader() {
  return (
    <div className={styles.success}>
      <h1>Success!</h1>
      <i className="bi bi-check-circle-fill"></i>
    </div>
  );
}
