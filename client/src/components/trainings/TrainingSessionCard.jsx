import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/training-details.module.scss";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import Button from "../basic-components/Button";
import { apiFetch } from "../../hooks/APIFetch";

export default function TrainingSessionCard({
  session,
  program,
  children,
  enrolled,
  updateBtns,
}) {
  const { user } = useContext(AppContext);

  const [btnText, setBtnText] = useState("Enroll in session");
  const [color, setColor] = useState("yellow");

  useEffect(() => {
    if (enrolled) {
      setColor("black");
      setBtnText("Enrolled");
    } else {
      setColor("yellow");
      setBtnText("Enroll in session");
    }
  }, [enrolled]);

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
    if (enrolled) {
      return;
    }
    const employeeEnrollement = {
      user: user.id,
      session: session.id,
    };

    const { result, error } = await apiFetch(
      `/api/training-programs/${program}/enroll`,
      "POST",
      employeeEnrollement
    );

    if (!error) {
      updateBtns();
    }
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
          <Button variant={color} onClick={enrollEmployee}>
            {btnText}
          </Button>
        </div>
      )}
    </CardContainer>
  );
}
