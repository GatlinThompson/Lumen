import BackButton from "../../components/basic-components/BackButton";
import PageHeader from "../../components/basic-components/PageHeader";
import InnerNavigation from "../../components/basic-components/InnerNavigation";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/user-trainings.module.scss";
import tablestyles from "../../styles/users-page.module.scss";
import { useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";
import Input from "../../components/form-components/Input";

export default function UserDetailsTraining() {
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [specificTrainings, setSpecificTrainings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getTrainings = async () => {
    const { result, error } = await apiFetch(
      `/api/user-details/${id}/trainings`,
      "GET"
    );

    if (!error) {
      console.log(result);
      setUserName(result.name);
      setUserRole(result.role);
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
      setTimeout(() => {
        setLoaded(true);
      }, 100);
    }
  }, [id]);

  //search trainings
  const handleSearch = (e) => {
    // //set value
    setSearchValue(e.target.value);
    // // if search bar has nothing in it.
    // if (e.target.value.trim() === "") {
    //   setSpecificUsers(ogrinalSpecificUsers);
    //   return;
    // }
    // const filterSearch = ogrinalSpecificUsers.filter((user, index) => {
    //   //check if first name or last name has value
    //   if (
    //     user.first_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
    //     user.last_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
    //     user.department.name
    //       .toLowerCase()
    //       .includes(e.target.value.toLowerCase())
    //   )
    //     return user;
    // });
    // setSpecificUsers(filterSearch);
  };
  return (
    <div className={`${loaded ? "loaded loading" : "loading"} max-1080`}>
      <BackButton />
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
      <Outlet context={{ trainings: specificTrainings }} />
    </div>
  );
}
