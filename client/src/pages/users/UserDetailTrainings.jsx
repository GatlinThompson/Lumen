import BackButton from "../../components/basic-components/BackButton";
import PageHeader from "../../components/basic-components/PageHeader";
import InnerNavigation from "../../components/basic-components/InnerNavigation";
import {
  NavLink,
  Outlet,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import styles from "../../styles/user-trainings.module.scss";
import tablestyles from "../../styles/users-page.module.scss";
import { useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";
import Input from "../../components/form-components/Input";
import trainingStyles from "../../styles/trainings-page.module.scss";
import MiniTrainingCard from "../../components/trainings/MiniTrainingCard";
import Button from "../../components/basic-components/Button";
import { useLocation } from "react-router-dom";

export default function UserDetailsTraining() {
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [orginalTrainings, setOrginalTrainings] = useState([]);
  const [specificTraining, setSpecificTraining] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const getTrainings = async () => {
    const { result, error } = await apiFetch(
      `/api/user-details/${id}/trainings`,
      "GET"
    );

    if (!error) {
      setOrginalTrainings(result.programs);
      setTrainings(result.programs);
      setUserName(result.name);
      setUserRole(result.role);
      setTimeout(() => {
        setLoaded(true);
      }, 100);
      if (
        location.pathname === `/user/${id}/trainings` &&
        result.role === "employee"
      ) {
        navigate(`/user/${id}/trainings/enrolled`);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getTrainings();
    }
  }, [id]);

  useEffect(() => {
    if (userRole === "employee") {
      if (location.pathname === `/user/${id}/trainings/enrolled`) {
        setSpecificTraining(orginalTrainings["enrolled"]);
        setTrainings(orginalTrainings["enrolled"]);
      }

      if (location.pathname === `/user/${id}/trainings/not-enrolled`) {
        setSpecificTraining(orginalTrainings["not_enrolled"]);
        setTrainings(orginalTrainings["not_enrolled"]);
      }

      if (location.pathname === `/user/${id}/trainings/complete`) {
        setSpecificTraining(orginalTrainings["completed"]);
        setTrainings(orginalTrainings["completed"]);
      }

      if (location.pathname === `/user/${id}/trainings/overdue`) {
        setSpecificTraining(orginalTrainings["overdue"]);
        setTrainings(orginalTrainings["overdue"]);
      }

      setSearchValue("");
    }
  }, [location.pathname, navigate, orginalTrainings]);

  //search trainings
  const handleSearch = (e) => {
    // if search bar has nothing in it.
    setSearchValue(e.target.value);
    if (e.target.value.trim() === "") {
      if (userRole !== "employee") {
        setTrainings(orginalTrainings);
        return;
      } else {
        setTrainings(specificTraining);
      }
    }
    let filterSearch;
    if (userRole !== "employee") {
      filterSearch = orginalTrainings.filter((training, index) => {
        //check if training title has value
        if (training.title.toLowerCase().includes(e.target.value.toLowerCase()))
          return training;
      });
    } else {
      filterSearch = specificTraining.filter((training, index) => {
        //check if training title has value
        if (training.title.toLowerCase().includes(e.target.value.toLowerCase()))
          return training;
      });
    }

    setTrainings(filterSearch);
  };

  return (
    <div className={`${loaded ? "loaded loading" : "loading"} max-1080`}>
      <BackButton to={`/user/${id}`} />
      <PageHeader
        title={`${userName.first_name || ""} ${
          userName.last_name || ""
        }'s Trainings`}
      />
      <div className={tablestyles.search_nav}>
        {userRole === "employee" && (
          <InnerNavigation extraClasses={styles.nav}>
            <NavLink to="enrolled">Enrolled</NavLink>
            <NavLink to="not-enrolled">Not&nbsp;Enrolled</NavLink>
            <NavLink to="complete">Complete</NavLink>
            <NavLink to="overdue">Overdue</NavLink>
          </InnerNavigation>
        )}
        <Input
          type="search"
          placeholder={`Search all trainings`}
          name={"search_input"}
          onChange={handleSearch}
          value={searchValue}
        />
      </div>
      {userRole === "employee" ? (
        <Outlet context={{ trainings: trainings }} />
      ) : (
        <>
          {/*Mobile Desktop*/}
          <div
            className={`${trainingStyles.training_container} ${trainingStyles.desktop}`}
          >
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
              <p className={trainingStyles.no_trainings}>No Trainings Found</p>
            )}
          </div>

          {/*Mobile */}
          <div
            className={`${trainingStyles.training_container} ${trainingStyles.mobile}`}
          >
            {trainings.length > 0 ? (
              trainings.map((training) => {
                return (
                  <Link to={`/trainings/${training._id}`} key={training._id}>
                    <MiniTrainingCard training={training}></MiniTrainingCard>
                  </Link>
                );
              })
            ) : (
              <p className={trainingStyles.no_trainings}>No Trainings Found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
