import CardContainer from "../basic-components/CardContainer";
import Button from "../basic-components/Button";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/training-programs.module.scss";

export default function TrainingPrograms() {
  const navigate = useNavigate();
  return (
    <div className={styles.training_programs}>
      <CardContainer extraClasses="mb-4">
        <p className="fw-bold fs-5 p-3 m-0">Training Programs</p>
        <div className="row text-center justify-content-center">
          <div className="col-3">
            <p className="fw-bold mb-0 fs-4">10</p>
            <p>Active</p>
          </div>
          <div className="col-3">
            <p className="fw-bold mb-0  fs-4">30</p>
            <p>Archived</p>
          </div>
        </div>
        <div className="mx-4 mb-3">
          <Button
            variant="yellow"
            type="button"
            extraClasses="w-100"
            onClick={() => navigate("/training/new")}
          >
            Create training program
          </Button>
          <Button
            variant="dark"
            type="button"
            extraClasses="w-100"
            onClick={() => navigate("/trainings")}
          >
            Manage trainings
          </Button>
        </div>
      </CardContainer>
    </div>
  );
}
