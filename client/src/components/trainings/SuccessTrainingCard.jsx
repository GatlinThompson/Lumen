import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/success-page.module.scss";

export default function SuccessTrainingCard({ session, trainer, title }) {
  //Date
  const date = new Date(session.start_time).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Hourly Time
  const time = new Date(session.start_time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <CardContainer extraClasses={`${styles.success_card}`}>
      <p className={styles.title}>{title}</p>
      <p className={styles.time}>
        {" "}
        on {date} at {time}
      </p>
      <p className={styles.trainer}>
        with {trainer.first_name} {trainer.last_name}
      </p>
    </CardContainer>
  );
}
