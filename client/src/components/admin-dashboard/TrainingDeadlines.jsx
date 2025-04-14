import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/training-widgets.module.scss";
import DeadlineDate from "./DeadlineDate";
import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";
import { AppContext } from "../../App";

export default function TrainingDeadlines() {
  const [deadlines, setDeadline] = useState([]);
  const { user } = useContext(AppContext);
  const getDeadlines = async () => {
    const { result, error } = await apiFetch("/api/dashboard/deadlines", "GET");

    if (!error) {
      setDeadline(result.deadlines);
    }
  };

  const getManagerDeadlines = async () => {
    const { result, error } = await apiFetch(
      "/api/dashboard/manager-deadlines",
      "GET"
    );

    if (!error) {
      setDeadline(result.deadlines);
    }
  };

  useEffect(() => {
    if (user && user.role == "admin") {
      getDeadlines();
    }
    if (user && user.role == "manager") {
      getManagerDeadlines();
    }
  }, [user]);
  return (
    <div className={styles.training_widgets}>
      <CardContainer extraClasses="d-flex flex-column gap-3">
        <h2 className="fs-4 mx-3 mt-3 mb-0">Upcoming Training Deadlines</h2>
        {deadlines &&
          deadlines.map((deadline, index) => {
            return <DeadlineDate key={index} deadline={deadline} />;
          })}
      </CardContainer>
    </div>
  );
}
