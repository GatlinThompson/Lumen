import { useContext, useEffect, useState } from "react";
import BackButton from "../components/basic-components/BackButton";
import PageHeader from "../components/basic-components/PageHeader";
import { apiFetch } from "../hooks/APIFetch";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../App";
import MiniTrainingCard from "../components/trainings/MiniTrainingCard";
import styles from "../styles/trainings-page.module.scss";
import Input from "../components/form-components/Input";
import Button from "../components/basic-components/Button";

export default function TrainingPage() {
  const navigate = useNavigate();
  const [trainings, setTrainings] = useState([]);
  const [orginalTrainings, setOrginalTrainings] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(AppContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    //get trainings for admin
    const getAdminTrainings = async () => {
      const { result, error } = await apiFetch(
        "/api/training-programs/admin",
        "GET"
      );
      if (!error) {
        setOrginalTrainings(result.programs);
        setTrainings(result.programs);
        setTimeout(() => {
          setLoaded(true);
        }, 100);
      } else {
        navigate("/errorapi");
      }
      return;
    };

    //get trainings for manager
    const getManagerTrainings = async () => {
      const { result, error } = await apiFetch(
        "/api/training-programs/manager",
        "GET"
      );
      if (!error) {
        setOrginalTrainings(result.programs);
        setTrainings(result.programs);
        setTimeout(() => {
          setLoaded(true);
        }, 100);
      } else {
        navigate("/errorapi");
      }
      return;
    };

    //get trainings for trainer
    const getTrainerTrainings = async () => {
      const { result, error } = await apiFetch(
        "/api/training-programs/trainer",
        "GET"
      );
      if (!error) {
        setOrginalTrainings(result.programs);
        setTrainings(result.programs);
        setTimeout(() => {
          setLoaded(true);
        }, 100);
      } else {
        navigate("/errorapi");
      }
      return;
    };

    //check if user is admin role
    if (user && user.role === "admin") {
      getAdminTrainings();
    }

    //check if user is manager role
    if (user && user.role === "manager") {
      getManagerTrainings();
    }

    //check if user is trainer role
    if (user && user.role === "trainer") {
      getTrainerTrainings();
    }
  }, [user]);

  //search trainings
  const handleSearch = (e) => {
    // if search bar has nothing in it.
    if (e.target.value.trim() === "") {
      setTrainings(orginalTrainings);
      return;
    }
    const filterSearch = orginalTrainings.filter((training, index) => {
      //check if training title has value
      if (training.title.toLowerCase().includes(e.target.value.toLowerCase()))
        return training;
    });

    setTrainings(filterSearch);
  };
  return (
    <>
      <div className="max-1080">
        <div className={`${loaded ? "loaded loading" : "loading"}`}>
          <BackButton />

          {user && user.role === "admin" && (
            <div className={styles.admin_top_controls}>
              <PageHeader title={"Training Management"} />
              <Button
                variant="yellow"
                onClick={() => navigate("/training/new")}
              >
                Create a new training
              </Button>
            </div>
          )}
          <div className={styles.title_container}>
            <PageHeader title={"All Trainings"} />
            <div className={styles.search_container}>
              <Input
                type="search"
                placeholder={"Search all trainings"}
                name={"search_input"}
                onChange={handleSearch}
              />
            </div>
          </div>
          {/*Mobile Desktop*/}
          <div className={`${styles.training_container} ${styles.desktop}`}>
            {trainings.length > 0 ? (
              trainings.map((training) => {
                return (
                  <MiniTrainingCard training={training} key={training._id}>
                    <Button
                      variant="black"
                      onClick={() => navigate(`/trainings/${training._id}`)}
                    >
                      Details
                    </Button>
                  </MiniTrainingCard>
                );
              })
            ) : (
              <p className={styles.no_trainings}>No Trainings Found</p>
            )}
          </div>

          {/*Mobile */}
          <div className={`${styles.training_container} ${styles.mobile}`}>
            {trainings.length > 0 ? (
              trainings.map((training) => {
                return (
                  <Link to={`/trainings/${training._id}`} key={training._id}>
                    <MiniTrainingCard training={training}></MiniTrainingCard>
                  </Link>
                );
              })
            ) : (
              <p className={styles.no_trainings}>No Trainings Found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
