import CardContainer from "../basic-components/CardContainer";
import CircleChart from "../basic-components/CircleChart";
import styles from "../../styles/training-widgets.module.scss";
import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";
import { AppContext } from "../../App";

export default function TrainingInsights() {
const {user} = useContext(AppContext)

const [completed, setCompleted] = useState(0);
const [overdue, setOverdue] = useState(0)

const percent=Math.floor((completed / (completed + overdue)) * 100)


const getEmployeeRate = async () => {
  const {result, error} = await apiFetch("/api/dashboard/employee-insight", "GET");

  if (!error) {
    console.log(result)
    setCompleted(result.complete)
    setOverdue(result.overdue)
  }
}

const getTrainerRate = async () => {
  const {result, error} = await apiFetch("/api/dashboard/trainer-insight", "GET");

  if (!error) {
    console.log(result)
    setCompleted(result.complete)
    setOverdue(result.overdue)
  }
}

const getManagerRate = async () => {
  const {result, error} = await apiFetch("/api/dashboard/manager-insight", "GET");

  if (!error) {
    console.log(result)
    setCompleted(result.complete)
    setOverdue(result.overdue)
  }
}

useEffect(()=> {
  if(user && user.role === "employee") {
    getEmployeeRate();
  }
  if(user && user.role === "trainer") {
    getTrainerRate();
  }
  if(user && user.role === "manager") {
    getManagerRate();
  }

}, [user])

  return (
    <div className={styles.training_widgets}>
      <CardContainer extraClasses="d-flex flex-column gap-3">
        <h2 className="fs-5 mx-3 mt-3 mb-0">Training Insights</h2>

        <div className="d-flex flex-row mx-3 gap-3">
          <CardContainer extraClasses="col">
            <div className="text-end text-success fs-5 mx-2 mt-1">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <p className="fs-1 fw-bold pe-3">{completed}</p>
              <p>
                On time <br /> Trainings
              </p>
            </div>
          </CardContainer>
          <CardContainer extraClasses="col">
            <div className="text-end text-danger fs-5 mx-2 mt-1">
              <i className="bi bi-x-circle-fill"></i>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <p className="fs-1 pe-3 fw-bold">{overdue}</p>
              <p>
                Overdue <br /> Trainings
              </p>
            </div>
          </CardContainer>
        </div>

        <CardContainer extraClasses="d-flex align-items-center mx-3 mb-4 p-3">
          <CircleChart percent={percent} color="blue" size="large"></CircleChart>
          <div className="col ms-3">
            <p className="fs-1 fw-bold m-0">{percent ? percent : 0}%</p>
            <p className="text-nowrap">Completion Rate</p>
          </div>
        </CardContainer>
      </CardContainer>
    </div>
  );
}
