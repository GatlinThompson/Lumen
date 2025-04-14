import { useEffect, useState } from "react";
import styles from "../../styles/user-detail-trainings-carousel.module.scss";
import UserDetailsTrainingCard from "./UserDetailsTrainingCard";

export default function UserDetailTrainingsCarousel({ programs }) {
  const [programCarousel, setProgramCarousel] = useState([]);

  useEffect(() => {
    setProgramCarousel[programs];
  }, []);

  return (
    <div className={`overflow-x-auto ${styles.scrollable_container}`}>
      <div
        className={`d-flex flex-row gap-3 mt-3 mb-5 ${styles.scrollable_content}`}
      >
        {programs.map((program, index) => {
          return (
            <div
              key={index}
              className="col-8 col-md-5 col-lg-5 col-xl-5 col-xxl-4"
            >
              <UserDetailsTrainingCard program={program.program} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
