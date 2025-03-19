import { useNavigate } from "react-router-dom";
import styles from "../../styles/training-details.module.scss";
import Button from "../basic-components/Button";
import { useEffect } from "react";

export default function ManagerTrainingDetails({ programID }) {
  const navigate = useNavigate();

  return (
    <>
      <div className={`${styles.manager_btns} ${styles.mobile}`}>
        <Button
          variant="yellow"
          onClick={() => navigate(`/trainings/${programID}/assign`)}
        >
          Managed Assigned Employees
        </Button>
        <Button variant="black">View All Assigned Employees </Button>
      </div>
      {/*Training Insights */}
      <h2 className={styles.insights_header}>Training Insights</h2>
      <div className={styles.training_insights_container}></div>
    </>
  );
}
