import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/basic-components/BackButton";
import SuccessHeader from "../../components/basic-components/SucessHeader";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/success-page.module.scss";
import { apiFetch } from "../../hooks/APIFetch";
import Button from "../../components/basic-components/Button";
import { AppContext } from "../../App";
import EmployeeCard from "../../components/basic-components/EmployeeCard";

export default function ManagerEmployeeAssignSuccess() {
  const { p_id } = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [program, setProgram] = useState([]);
  const [assignEmployees, setAssignEmployees] = useState([]);
  const { newAssignedEmployees, setNewAssignedEmployees } =
    useContext(AppContext);

  useEffect(() => {
    //back to dashboard if empty
    if (newAssignedEmployees.length < 1) {
      navigate("/dashboard");
      return;
    }

    const getProgram = async () => {
      const { result, error } = await apiFetch(
        `/api/training-programs/${p_id}`,
        "GET"
      );

      if (!error) {
        //set program and employees up
        setProgram(result.program);
        setAssignEmployees(newAssignedEmployees);

        //reset assign employees
        setNewAssignedEmployees([]);

        setTimeout(() => {
          setLoaded(true);
        }, 100);
      } else {
        navigate("/errorapi");
      }
    };

    //check if p_id exists
    if (p_id) {
      getProgram();
    } else {
      navigate("/dashboard");
    }
  }, [p_id]);

  return (
    <>
      {program && (
        <div className={`${loaded ? "loaded loading" : "loading"} max-1080`}>
          <BackButton to={`/trainings/${p_id}`} />
          <SuccessHeader />
          <div className={styles.info_container}></div>
          <p className={styles.info}>
            You successfully assigned these employees to the {program.title}:
          </p>
          <div className={styles.sessions_container}>
            {assignEmployees &&
              assignEmployees.map((employee, index) => {
                return <EmployeeCard key={index} employee={employee} />;
              })}
          </div>

          <div className={styles.btn_controls}>
            <Button
              variant="yellow"
              type="button"
              extraClasses={`${styles.submit}`}
              onClick={() => navigate(`/trainings/${p_id}/assign/`)}
            >
              Assign more employees
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
