import { useEffect, useState } from "react";
import BackButton from "../../components/basic-components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../hooks/APIFetch";
import SuccessHeader from "../../components/basic-components/SuccessHeader";
import styles from "../../styles/success-page.module.scss";
import { useContext } from "react";
import { AppContext } from "../../App";
import SuccessTrainingCard from "../../components/trainings/SuccessTrainingCard";
import Button from "../../components/basic-components/Button";

export default function TrainingSuccess() {
  const { p_id, method } = useParams();
  const [sessions, setSessions] = useState([]);
  const [title, setTitle] = useState("");
  const [loaded, setLoaded] = useState(false);

  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
    }

    const getTrainingProgram = async () => {
      const { result, error } = await apiFetch(
        `/api/training-programs/${p_id}`,
        "GET"
      );

      if (!error) {
        setTitle(result.program.title);
        setSessions(result.program.training_sessions);
        setTimeout(() => {
          setLoaded(true);
        }, 100);
      } else {
        navigate("/errorapi");
      }
    };

    getTrainingProgram();
  }, []);

  const methodType = method === "new" ? "created" : "updated";

  return (
    <>
      <div className={`${loaded ? "loaded loading" : "loading"}`}>
        <BackButton to="/trainings" />

        <SuccessHeader />
        <div className={styles.info_container}></div>
        <p className={styles.info}>
          Your training was successfully {methodType} with the following
          sessions:
        </p>
        <div className={styles.sessions_container}>
          {sessions &&
            sessions.map((session, index) => {
              return (
                <SuccessTrainingCard
                  key={index}
                  session={session}
                  trainer={session.trainer}
                  title={title}
                />
              );
            })}
        </div>
        <div className={styles.btn_controls}>
          {method === "new" && (
            <Button
              variant="yellow"
              type="button"
              extraClasses={`${styles.submit}`}
              onClick={() => navigate("/training/new")}
            >
              Create another training
            </Button>
          )}

          <Button
            variant="gray"
            type="button"
            extraClasses={`${styles.cancel}`}
            onClick={() => navigate("/dashboard")}
          >
            Back to home
          </Button>
        </div>
      </div>
    </>
  );
}
