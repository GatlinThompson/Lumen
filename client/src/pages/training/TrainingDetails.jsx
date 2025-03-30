import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/basic-components/BackButton";
import styles from "../../styles/training-details.module.scss";
import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";
import { AppContext } from "../../App";
import Button from "../../components/basic-components/Button";
import TrainingSessionCard from "../../components/trainings/TrainingSessionCard";
import ManagerTrainingDetails from "../../components/training-details/ManagerTrainingDetails";

export default function TrainingDetails() {
  const { p_id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState();
  const { user } = useContext(AppContext);
  const [loaded, setLoaded] = useState(false);
  const [enrolledSession, setEnrolledSession] = useState([]);

  //dynamic employee enrollment button colors
  const getEmployeeEnrollment = async () => {
    const { result, error } = await apiFetch(
      `/api/training-programs/${program._id}/enroll/${user.id}`,
      "GET"
    );

    //if no error set enrolled session
    if (!error) {
      setEnrolledSession(result.enrolledSession.enrolled_training_session);
    }
  };

  const getProgram = async () => {
    const { result, error } = await apiFetch(
      `/api/training-programs/${p_id}`,
      "GET"
    );

    if (!error) {
      setProgram(result.program);
      setTimeout(() => {
        setLoaded(true);
      }, 100);
    } else {
      navigate("/errorapi");
    }
  };

  useEffect(() => {
    if (p_id) {
      getProgram();
    } else {
      navigate("/dashboard");
    }
  }, [p_id]);

  useEffect(() => {
    if (program && user && user.role === "employee") {
      getEmployeeEnrollment();
    }
  }, [program, user]);

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

  const duration = program ? getDuration(program.duration) : null;

  const deadline = program
    ? new Date(program.deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const manager = program
    ? `${program.assigned_manager.first_name} ${program.assigned_manager.last_name}`
    : null;

  //change background color
  const backgroundColor = program ? program.background_color : "#fff";

  //archive program
  const archiveProgram = async () => {
    const { result, error } = await apiFetch(
      `/api/training-program/${p_id}/delete`,
      "DELETE"
    );

    if (!error) {
      navigate("/trainings");
    }
  };

  return (
    <>
      {program && (
        <div className={`${loaded ? "loaded loading" : "loading"}`}>
          <BackButton />
          <div
            className={`${styles.program_container} ${
              program ? "loaded loading" : "loading"
            }`}
          >
            <div
              className={styles.background}
              style={{ backgroundColor: backgroundColor }}
            />
            <div className={styles.program_info}>
              <h1>{program ? program.title : "Program"}</h1>
              <div className={styles.details}>
                <div className={styles.duration}>
                  <i className="bi bi-clock-fill"></i>
                  <p>{program ? duration : "1.5 hours"}</p>
                </div>
                <div className={styles.date}>
                  <i className="bi bi-calendar"></i>
                  <p>Due {program ? deadline : "January 1, 2025"}</p>
                </div>
              </div>
              <p>Overseen by {program ? manager : "Hank Hill"}</p>
            </div>
          </div>
          <p className={styles.description}>
            {program ? program.description : null}
          </p>
          {user && user.role === "admin" && (
            <div className={styles.admin_btns}>
              <Button
                variant="yellow"
                onClick={() => navigate(`/training/${p_id}/edit`)}
              >
                Edit training
              </Button>
            </div>
          )}
          {/*Sessions */}

          <>
            <h2 className={styles.session_header}>Sessions</h2>
            <div className={styles.session_container}>
              {program &&
                program.training_sessions.map((session, index) => {
                  //employee enrollement mapping
                  if (
                    enrolledSession &&
                    enrolledSession !== session.id &&
                    user &&
                    user.role === "employee"
                  ) {
                    return;
                  }

                  //trainer session mapping
                  if (
                    user &&
                    user.role === "trainer" &&
                    session.trainer._id !== user.id
                  ) {
                    return;
                  }

                  return (
                    <TrainingSessionCard
                      key={index}
                      enrolled={enrolledSession === session.id}
                      session={session}
                      program={program._id}
                      updateBtns={getEmployeeEnrollment}
                    ></TrainingSessionCard>
                  );
                })}
            </div>
          </>

          {/*Role Specific Components*/}
          {user && user.role === "admin" && (
            <div className={styles.cancel_btn}>
              <Button variant="red" onClick={archiveProgram}>
                <i className="bi bi-trash" />
                &nbsp;Archive Program
              </Button>
            </div>
          )}
          {user && user.role === "manager" && (
            <ManagerTrainingDetails programID={program._id} />
          )}
        </div>
      )}
    </>
  );
}
