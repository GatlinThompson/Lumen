import UserDetailTrainingsCarousel from "../../components/trainings/UserDetailTrainingsCarousel.jsx";
import styles from "../../styles/user-details-assigned-trainings.module.scss"
import Button from "../../components/basic-components/Button";

export default function UserDetailsAssignedTrainings() {
    return (
      <div className={`${styles.assigned_trainings_container}`}>
        <div className={`${styles.title_container}`}>
          <h3>Assigned Trainings</h3>
        </div>
        <div className={`${styles.carousel_button_container}`}>
          <div className={`${styles.carousel_container}`}>
            <UserDetailTrainingsCarousel />
          </div>
          <div className={`${styles.button_container}`}>
            <Button
              variant="black"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              View All Trainings
            </Button>
          </div>
        </div>
      </div>
    );
}