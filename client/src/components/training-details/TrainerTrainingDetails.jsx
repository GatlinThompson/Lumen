import { useContext, useEffect, useState } from "react";
import styles from "../../styles/training-details.module.scss";
import { AppContext } from "../../App";
import TrainerTrainingEnrolled from "./TrainerTrainingEnrolled";
import TrainerAssigned from "./TrainerAssigned";
import { useNavigate } from "react-router-dom";
import Button from "../basic-components/Button";

export default function TrainerTrainingDetails({ programID, sessions }) {
  const [trainerSessions, setTrainerSessions] = useState(null);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && sessions) {
      const filterSessions = sessions.filter(
        (session) => session.trainer._id === user.id
      );
      setTrainerSessions(filterSessions);
    }
  }, [sessions, user]);
  return (
    <>
      {/*Training Insights */}
      <h2 className={`${styles.insights_header} ${styles.trainer}`}>
        Training Insights
      </h2>
      <section className={`${styles.widget_container} max-1024`}>
        <div className={styles.enrolled_container}>
          <TrainerAssigned program={programID} sessions={trainerSessions}>
            <div className={`${styles.manager_btns}`}>
              <Button
                variant="yellow"
                onClick={() => navigate(`/trainings/${programID}/complete`)}
              >
                Mark Employees Complete
              </Button>
            </div>
          </TrainerAssigned>
        </div>
        <div className={styles.widget_charts}>
          <TrainerTrainingEnrolled
            program={programID}
            sessions={trainerSessions}
          />
        </div>
      </section>
    </>
  );
}
