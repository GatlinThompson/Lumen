import { useNavigate, useOutletContext } from "react-router-dom";
import trainingStyles from "../../styles/trainings-page.module.scss";
import { useState, useEffect } from "react";
import MiniTrainingCard from "../../components/trainings/MiniTrainingCard";
import Button from "../../components/basic-components/Button";
import { Link } from "react-router-dom";
import StatusCircle from "../../components/basic-components/StatusCircle";

export default function UserTrainingsPage() {
  const context = useOutletContext();
  const navigate = useNavigate();
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    setTrainings(context.trainings);
  }, [context.trainings]);
  return (
    <>
      {/*Mobile Desktop*/}
      <div
        className={`${trainingStyles.training_container} ${trainingStyles.desktop}`}
      >
        {Array.isArray(trainings) && trainings.length > 0 ? (
          trainings.map((training) => {
            return (
              <MiniTrainingCard training={training} key={training._id}>
                <div className={trainingStyles.status}>
                  <StatusCircle training_status={training.status} />
                </div>
                <Button
                  variant="black"
                  onClick={() => navigate(`/trainings/${training._id}`)}
                >
                  Details
                </Button>
              </MiniTrainingCard>
            );
          })
        ) : (
          <p className={trainingStyles.no_trainings}>No Trainings Found</p>
        )}
      </div>

      {/*Mobile */}
      <div
        className={`${trainingStyles.training_container} ${trainingStyles.mobile}`}
      >
        {Array.isArray(trainings) && trainings.length > 0 ? (
          trainings.map((training) => {
            return (
              <Link to={`/trainings/${training._id}`} key={training._id}>
                <MiniTrainingCard training={training}>
                  <div className={trainingStyles.status}>
                    <StatusCircle training_status={training.status} />
                  </div>
                </MiniTrainingCard>
              </Link>
            );
          })
        ) : (
          <p className={trainingStyles.no_trainings}>No Trainings Found</p>
        )}
      </div>
    </>
  );
}
