import CardContainer from "../basic-components/CardContainer";
import CircleChart from "../basic-components/CircleChart";
import styles from "../../styles/training-programs.module.scss";

export default function TrainingInsights() {
  return (
    <div className={styles.training_programs}>
      <CardContainer extraClasses="d-flex flex-column gap-3">
        <p className="fw-bold fs-5 mx-3 mt-3 mb-0">Training Insights</p>

        <div className="d-flex flex-row mx-3 gap-3">
          <CardContainer extraClasses="col">
            <div className="text-end text-success fs-5 mx-2 mt-1">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <div className="d-flex flex-row">
              <p className="fs-1 fw-bold mx-3">12</p>
              <p>On time Trainings</p>
            </div>
          </CardContainer>
          <CardContainer extraClasses="col">
            <div className="text-end text-error-red fs-5 mx-2 mt-1">
              <i className="bi bi-x-circle-fill"></i>
            </div>
            <div className="d-flex flex-row">
              <p className="fs-1 fw-bold mx-3">5</p>
              <p>Overdue Trainings</p>
            </div>
          </CardContainer>
        </div>

        <CardContainer extraClasses="row mx-3 mb-4 p-3">
          <CircleChart percent="75" color="blue" size="large"></CircleChart>
          <div className="col">
            <p className="fs-1 fw-bold m-0">75%</p>
            <p className="text-nowrap">Completion rate</p>
          </div>
        </CardContainer>
      </CardContainer>
    </div>
  );
}
