import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/training-widgets.module.scss";
import DeadlineDate from "./DeadlineDate";
import { useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";

export default function TrainingDeadlines() {
  const [deadlines, setDeadline] = useState([]);
  const getDeadlines = async () => {
    const { result, error } = await apiFetch("/api/dashboard/deadlines", "GET");

    if (!error) {
      console.log(result.deadlines);
      setDeadline(result.deadlines);
    }
  };

  useEffect(() => {
    getDeadlines();
  }, []);
  return (
    <div className={styles.training_widgets}>
      <CardContainer extraClasses="d-flex flex-column gap-3">
        <h2 className="fs-5 mx-3 mt-3 mb-0">Upcoming Training Deadlines</h2>
        {deadlines &&
          deadlines.map((deadline, index) => {
            return <DeadlineDate key={index} deadline={deadline} />;
          })}
      </CardContainer>
    </div>
  );
}
