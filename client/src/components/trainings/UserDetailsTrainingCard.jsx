import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/user-details-training-card.module.scss";
import { Link } from "react-router-dom";

export default function UserDetailsTrainingCard({ program }) {
  const getDuration = (duration) => {
    let timeDegree;
    let finalTime;

    //setup of string formate for duration
    if (duration > 60) {
      timeDegree = "hours";
      finalTime = duration / 60;
    } else if (duration < 60) {
      timeDegree = "minutes";
      finalTime = duration;
    } else {
      timeDegree = "hour";
      finalTime = duration / 60;
    }

    //return string
    return `${finalTime} ${timeDegree}`;
  };

  //Date
  const date = new Date(program.deadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Hourly Time
  const time = new Date(program.deadline).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  //change background color
  const backgroundColor = program ? program.background_color : "#fff";

  //get duration formated
  const duration = program ? getDuration(program.duration) : null;
  return (
    <Link
      to={`/trainings/${program._id}`}
      className={styles.user_details_training_card}
    >
      <CardContainer extraClasses={`d-flex ${styles.training_card_content}`}>
        <div
          className={`${styles.background_color}`}
          style={{ backgroundColor: backgroundColor }}
        />
        <div>
          <p className={styles.title}>{program.title}</p>
          <p className={styles.text}>
            {date} at {time}
          </p>
          <p className={`mt-3 ${styles.text}`}>
            <i className="bi bi-clock me-1"></i>
            {duration}
          </p>
        </div>
      </CardContainer>
    </Link>
  );
}
