import CardContainer from "../basic-components/CardContainer";
import Button from "../basic-components/Button";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/training-programs.module.scss";
import { useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";

export default function TrainingPrograms() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const getPrograms = async () => {
      const { result, error } = await apiFetch(
        "/api/dashboard/programs",
        "GET"
      );

      if (!error) {
        setPrograms(result.programs);
      } else {
        navigate("/errorapi");
      }
    };

    getPrograms();
  }, []);
  return (
    <div className={styles.training_programs}>
      <CardContainer extraClasses="mb-4">
        <p className="fw-bold fs-5 p-3 m-0">Training Programs</p>
        <div className="row text-center justify-content-center">
          <div className="col-3">
            <p className="fw-bold mb-0 fs-4">
              {programs.active ? programs.active : "0"}
            </p>
            <p>Active</p>
          </div>
          <div className="col-3">
            <p className="fw-bold mb-0  fs-4">
              {programs.archived ? programs.archived : "0"}
            </p>
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
