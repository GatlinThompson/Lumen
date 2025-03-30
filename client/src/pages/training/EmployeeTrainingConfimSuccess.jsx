import { useContext, useEffect, useState } from "react";
import BackButton from "../../components/basic-components/BackButton";
import PageHeader from "../../components/basic-components/PageHeader";
import styles from "../../styles/success-page.module.scss";
import { AppContext } from "../../App";
import Button from "../../components/basic-components/Button";
import SessionTrainingCard from "../../components/trainings/SessionTrainingCard";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../hooks/APIFetch";
import SuccessHeader from "../../components/basic-components/SucessHeader";

export default function EmployeeTrainingConfirmSuccess() {
  const [loaded, setLoaded] = useState(false);
  const { newSession, user, setNewSession } = useContext(AppContext);
  const [session, setSession] = useState([]);
  const [program, setProgram] = useState([]);
  const { p_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "employee") {
      navigate("/dashboard");
    }
  }, []);

  const getProgram = async () => {
    const { result, error } = await apiFetch(
      `/api/training-programs/${p_id}`,
      "GET"
    );

    if (!error) {
      setProgram(result.program);
      setSession(newSession);
      setNewSession([]);

      setTimeout(() => {
        setLoaded(true);
      }, 100);
    }
  };

  useEffect(() => {
    if (p_id && newSession) {
      getProgram();
      return;
    }
  }, [p_id]);
  return (
    <>
      {program && (
        <div className={`${loaded ? "loaded loading" : "loading"} max-1080`}>
          <BackButton />
          <SuccessHeader />
          <p className={styles.info}>
            You have successfully enrolled in the {program.title}
            program. Here are the details for you upcoming session:
          </p>
          {session.trainer && (
            <div>
              <SessionTrainingCard program={program} session={session} />
            </div>
          )}
          <div className={styles.btn_controls}>
            <Button
              variant="yellow"
              type="button"
              extraClasses={`${styles.submit}`}
              onClick={() => navigate(`/trainings/${p_id}`)}
            >
              View Training Details
            </Button>

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
      )}
    </>
  );
}
