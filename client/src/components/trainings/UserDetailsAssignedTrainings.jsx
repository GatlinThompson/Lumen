import UserDetailTrainingsCarousel from "../../components/trainings/UserDetailTrainingsCarousel.jsx";
import styles from "../../styles/user-details-assigned-trainings.module.scss"
import Button from "../../components/basic-components/Button";
import { apiFetch } from "../../hooks/APIFetch.jsx";
import {  useContext, useEffect, useState } from "react";
import { AppContext } from "../../App.jsx";
import { useNavigate } from "react-router-dom";


export default function UserDetailsAssignedTrainings() {
  const {user} = useContext(AppContext)
  const [programs, setPrograms] = useState([])
  const navigate = useNavigate();


  const getManagerTrainings = async () => {

    const {result, error} = await apiFetch("/api/dashboard/manager-trainings", "GET")

    if(!error) {
   console.log(result.programs)
      setPrograms(result.programs)
    }else {
      navigate("/errorapi")
    }
  }

  const getTrainerTrainings = async () => {
    const {result, error} = await apiFetch("/api/dashboard/trainer-trainings", "GET")

    if(!error) {
   
      setPrograms(result.programs)
    }else {
      navigate("/errorapi")
    }
  }

  const getEmployeeTrainings = async () => {
    const { result,error} = await apiFetch("/api/dashboard/employee-trainings", "GET");

    if(!error) {
      console.log(result.programs)
      setPrograms(result.programs)
    }else {
      navigate("/errorapi")
    }
  }

  useEffect(()=> { 
    if(user && user.role === "manager") {
      getManagerTrainings();
    }

    if(user && user.role === "trainer") {
      getTrainerTrainings();
    }

    if(user && user.role === "employee") {
      getEmployeeTrainings();
    }
    }, [user])
    return (
      <div className={`col-12 col-xxl-10 ${styles.assigned_trainings_container}`}>
        <div className={`${styles.title_container}`}>
          <h3>Assigned Trainings</h3>
        </div>
        <div className={`${styles.carousel_button_container}`}>
          <div className={`${styles.carousel_container}`}>
            {programs.length > 0 &&
            <UserDetailTrainingsCarousel programs={programs}/> }
          </div>
          <div className={`${styles.button_container}`}>
            <Button
              variant="black"
              onClick={() => {
                navigate("/trainings");
              }}
            >
              View All Trainings
            </Button>
          </div>
        </div>
      </div>
    );
}