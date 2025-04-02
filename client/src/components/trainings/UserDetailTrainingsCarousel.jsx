import styles from "../../styles/user-detail-trainings-carousel.module.scss";
import UserDetailsTrainingCard from "./UserDetailsTrainingCard";

export default function UserDetailTrainingsCarousel(){
  return (
    <div className={`overflow-x-auto ${styles.scrollable_container}`}>
      <div
        className={`d-flex flex-row gap-3 mt-3 mb-5 ${styles.scrollable_content}`}
      >
        <div className="col-8 col-md-5 col-lg-5">
          <UserDetailsTrainingCard />
        </div>
        <div className="col-8 col-md-5 col-lg-5">
          <UserDetailsTrainingCard />
        </div>
        <div className="col-8 col-md-5 col-lg-5">
          <UserDetailsTrainingCard />
        </div>
        <div className="col-8 col-md-5 col-lg-5">
          <UserDetailsTrainingCard />
        </div>
      </div>
    </div>
  );
}