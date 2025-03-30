import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/session-card.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SessionTrainingCard({ session, program }) {
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

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

  //change background color
  const backgroundColor = program ? program.background_color : "#fff";

  //get duration formated
  const duration = program ? getDuration(program.duration) : null;

  const trainer = `${session.trainer?.first_name || "Unknown"} ${
    session.trainer?.last_name || "Trainer"
  }`;

  return (
    <CardContainer extraClasses={`${styles.session_container}`}>
      <div
        className={styles.background_color}
        style={{ backgroundColor: backgroundColor }}
      />
      <div className={styles.info}>
        <p className={styles.title}>{program.title}</p>
        <p className={styles.trainer}>with {trainer}</p>
        <div className={styles.date}>
          <i className="bi bi-calendar"></i>
          <p>
            {date} at {time}
          </p>
        </div>
        <div className={styles.duration}>
          <i className="bi bi-clock"></i>
          <p>{duration}</p>
        </div>
      </div>
    </CardContainer>
  );
}
