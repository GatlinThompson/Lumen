import { useContext, useEffect, useState } from "react";
import BackButton from "../../components/basic-components/BackButton";
import PageHeader from "../../components/basic-components/PageHeader";
import styles from "../../styles/success-page.module.scss";
import { AppContext } from "../../App";
import Button from "../../components/basic-components/Button";
import SessionTrainingCard from "../../components/trainings/SessionTrainingCard";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../hooks/APIFetch";

export default function EmployeeTrainingConfirm() {
  const [loaded, setLoaded] = useState(false);
  const { newSession, user } = useContext(AppContext);
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

      setTimeout(() => {
        setLoaded(true);
      }, 100);
    }
  };

  //enroll employee
  const enrollEmployee = async () => {
    if (!session.trainer) {
      navigate("/dashboard");
      return;
    }
    const employeeEnrollement = {
      user: user.id,
      session: session.id,
    };

    const { result, error } = await apiFetch(
      `/api/training-programs/${program._id}/enroll`,
      "POST",
      employeeEnrollement
    );

    if (!error) {
      navigate(`/trainings/${p_id}/confirmation/success`);
    }
  };

  useEffect(() => {
    if (p_id && newSession) {
      getProgram();
      return;
    }
  }, [p_id]);

  return (
    <div className={`${loaded ? "loaded loading" : "loading"} max-1080`}>
      <BackButton />
      <PageHeader title={"Enrollment confirmation"} />
      <p className={styles.info}>You are enrolling in:</p>
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
          onClick={enrollEmployee}
        >
          Enroll in Session
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
  );
}
