import { useNavigate } from "react-router-dom";
import styles from "../../styles/training-details.module.scss";
import Button from "../basic-components/Button";
import { useEffect, useState } from "react";
import CircleContainer from "../basic-components/CircleContainer";
import ManagerTrainingAssigned from "./ManagerTrainingAssigned";
import ManagerTrainingCharts from "./ManagerTrainingCharts";
import ManagerEmployees from "./ManagerEmployees";

export default function ManagerTrainingDetails({ programID, deadline }) {
  const navigate = useNavigate();

  const [pastDeadline, setPastDeadline] = useState(false);

  useEffect(() => {
    const today = new Date();
    const programDeadline = new Date(deadline);

    console.log(today.getTime() > programDeadline.getTime());
    setPastDeadline(today.getTime() > programDeadline.getTime());
  }, []);
  return (
    <div className={`max-1024`}>
      <div className={`${styles.manager_btns} ${styles.mobile}`}>
        {!pastDeadline && (
          <Button
            variant="yellow"
            onClick={() => navigate(`/trainings/${programID}/assign`)}
          >
            Managed Assigned Employees
          </Button>
        )}

        <Button
          variant="black"
          onClick={() => navigate(`/trainings/${programID}/assigned`)}
        >
          View All Assigned Employees{" "}
        </Button>
      </div>
      {/*Training Insights */}
      <h2 className={styles.insights_header}>Training Insights</h2>
      <section className={styles.widget_container}>
        <div className={styles.assign_employees}>
          <ManagerEmployees programID={programID}>
            <div className={`${styles.manager_btns}`}>
              {!pastDeadline && (
                <Button
                  variant="yellow"
                  onClick={() => navigate(`/trainings/${programID}/assign`)}
                >
                  Managed Assigned Employees
                </Button>
              )}
              <Button
                variant="black"
                onClick={() => navigate(`/trainings/${programID}/assigned`)}
              >
                View All Assigned Employees{" "}
              </Button>
            </div>
          </ManagerEmployees>
        </div>
        <div className={styles.widget_charts}>
          <ManagerTrainingAssigned programID={programID} />
          <ManagerTrainingCharts programID={programID} />
        </div>
      </section>
    </div>
  );
}
