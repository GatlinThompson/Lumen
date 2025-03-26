import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/training-details.module.scss";
import { useContext } from "react";
import { AppContext } from "../../App";
import Button from "../basic-components/Button";
import { apiFetch } from "../../hooks/APIFetch";

export default function TrainingSessionCard({ session, children }) {
  const { user } = useContext(AppContext);
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

  const trainer = `${session.trainer.first_name} ${session.trainer.last_name}`;

  const enrollEmployee = async () => {
    const employeeEnrollement = {
      user_id: user.id,
      session_id: session.id,
    };

    console.log(employeeEnrollement);

    //const { result, error } = await apiFetch("", "POST", );
  };
  return (
    <CardContainer>
      <div>
        <i className="bi bi-calendar"></i>
        <div>
          <p>
            {date} at {time}
          </p>
          <p>with {trainer}</p>
        </div>
      </div>

      {user && user.role === "employee" && (
        <div className={styles.employee_enrollment}>
          {/*Add Employee Enrollment Function Here */}
          <Button variant="yellow" onClick={enrollEmployee}>
            Enroll in session
          </Button>
        </div>
      )}
    </CardContainer>
  );
}
