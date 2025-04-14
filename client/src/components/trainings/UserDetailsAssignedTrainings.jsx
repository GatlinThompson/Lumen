import UserDetailTrainingsCarousel from "../../components/trainings/UserDetailTrainingsCarousel.jsx";
import styles from "../../styles/user-details-assigned-trainings.module.scss";
import Button from "../basic-components/Button.jsx";
import { apiFetch } from "../../hooks/APIFetch.jsx";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserDetailsAssignedTrainings({ userID = null }) {
  const { user } = useContext(AppContext);
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getManagerTrainings = async () => {
    const { result, error } = await apiFetch(
      "/api/dashboard/manager-trainings",
      "GET"
    );

    if (!error) {
      setPrograms(result.programs);
    } else {
      navigate("/errorapi");
    }
  };

  const getTrainerTrainings = async () => {
    const { result, error } = await apiFetch(
      "/api/dashboard/trainer-trainings",
      "GET"
    );

    if (!error) {
      setPrograms(result.programs);
    } else {
      navigate("/errorapi");
    }
  };

  const getEmployeeTrainings = async () => {
    const { result, error } = await apiFetch(
      "/api/dashboard/employee-trainings",
      "GET"
    );

    if (!error) {
      setPrograms(result.programs);
    } else {
      navigate("/errorapi");
    }
  };

  const getUserTrainings = async () => {
    const { result, error } = await apiFetch(
      `/api/user/${userID}/trainings`,
      "GET"
    );

    if (!error) {
      setPrograms(result.programs);
    } else {
      navigate("/errorapi");
    }
  };

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      if (user && user.role === "manager") {
        getManagerTrainings();
      }

      if (user && user.role === "trainer") {
        getTrainerTrainings();
      }

      if (user && user.role === "employee") {
        getEmployeeTrainings();
      }
    }

    if (location.pathname == `/user/${userID}` && userID) {
      getUserTrainings();
    }
  }, [user, location]);
  return (
    <div className={`col-12 col-xxl-10 ${styles.assigned_trainings_container}`}>
      <div className={`${styles.title_container}`}>
        <h3>Assigned Trainings</h3>
      </div>
      <div className={`${styles.carousel_button_container}`}>
        <div className={`${styles.carousel_container}`}>
          {programs.length > 0 ? (
            <UserDetailTrainingsCarousel programs={programs} />
          ) : (
            <p className={styles.no_trainings}>No Assigned Trainings</p>
          )}
        </div>
        <div className={`${styles.button_container}`}>
          <Button
            variant="black"
            onClick={() => {
              if (location.pathname == `/user/${userID}` && userID) {
                navigate(`/user/${userID}/trainings`);
                return;
              } else {
                navigate("/trainings");
              }
            }}
          >
            View All Trainings
          </Button>
        </div>
      </div>
    </div>
  );
}
