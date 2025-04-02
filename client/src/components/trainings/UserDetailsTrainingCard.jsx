import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/user-details-training-card.module.scss";

export default function UserDetailsTrainingCard() {
  return (
    <a href="" className={styles.user_details_training_card}>
      <CardContainer
        extraClasses={`d-flex ${styles.training_card_content}`}
      >
        <div className={`${styles.background_color}`} />
        <div>
          <p className={styles.title}>Testing a New System</p>
          <p className={styles.text}>April 4, 2025 at 7:36 PM</p>
          <p className={`mt-3 ${styles.text}`}>
            <i className="bi bi-clock me-1"></i> 3.5 Hours
          </p>
        </div>
      </CardContainer>
    </a>
  );
}