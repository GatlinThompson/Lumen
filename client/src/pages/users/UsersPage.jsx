import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import BackButton from "../../components/basic-components/BackButton";
import PageHeader from "../../components/basic-components/PageHeader";
import Input from "../../components/form-components/Input";
import InnerNavigation from "../../components/basic-components/InnerNavigation";
import styles from "../../styles/users-page.module.scss";
import { AppContext } from "../../App";

export default function UsersPage() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [usersRole, setUsersRole] = useState("Employees");
  const [specificUsers, setSpecificUsers] = useState([]);
  const [ogrinalSpecificUsers, setOgrinalSpecificUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  //get all users
  const getAllUsers = async () => {
    const { result, error } = await apiFetch("/api/users", "GET");

    if (!error) {
      setUsers(result.users);
      setTimeout(() => {
        setLoaded(true);
      }, 100);
    } else {
      navigate("/errorapi");
    }
  };

  //get all users
  const getManagerUsers = async () => {
    const { result, error } = await apiFetch("/api/users/manager", "GET");

    if (!error) {
      console.log(result);
      setUsers(result.employees);
      setTimeout(() => {
        setLoaded(true);
      }, 100);
    } else {
      navigate("/errorapi");
    }
  };

  const setSpecificUserData = (role) => {
    if (user && user.role === "manager") {
      setSpecificUsers(users);
      setOgrinalSpecificUsers(users);
      return;
    }

    if (role === "Managers") {
      setSpecificUsers(users["managers"]);
      setOgrinalSpecificUsers(users["managers"]);
      users["managers"];
    } else if (role === "Trainers") {
      setSpecificUsers(users["trainers"]);
      setOgrinalSpecificUsers(users["trainers"]);
    } else {
      setSpecificUsers(users["employees"]);
      setOgrinalSpecificUsers(users["employees"]);
    }
  };

  //change when first rendered
  useEffect(() => {
    if (user && user.role === "admin") {
      getAllUsers();
    }
    if (user && user.role == "manager") {
      getManagerUsers();
    }
  }, [user]);

  useEffect(() => {
    if (users && usersRole) {
      setSpecificUserData(usersRole);
    }
  }, [users, usersRole]);

  useEffect(() => {
    //if location is only /users
    if (location.pathname === "/users") {
      navigate("/users/employees");
    }

    //if user is admin
    if (user && user.role === "admin") {
      //change page header based on url
      if (location.pathname === "/users/managers") {
        setUsersRole("Managers");
      } else if (location.pathname === "/users/trainers") {
        setUsersRole("Trainers");
      } else {
        setUsersRole("Employees");
      }
    }

    setSearchValue("");
  }, [location.pathname, navigate]);

  //search employees
  const handleSearch = (e) => {
    //set value
    setSearchValue(e.target.value);

    // if search bar has nothing in it.
    if (e.target.value.trim() === "") {
      setSpecificUsers(ogrinalSpecificUsers);
      return;
    }
    const filterSearch = ogrinalSpecificUsers.filter((user, index) => {
      //check if first name or last name has value
      if (
        user.first_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.last_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.department.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
        return user;
    });
    setSpecificUsers(filterSearch);
  };
  return (
    <div className={`${loaded ? "loaded loading" : "loading"}`}>
      <BackButton />
      <PageHeader title={`All ${usersRole}`} />
      <div className={styles.search_nav}>
        {user && user.role === "admin" && (
          <InnerNavigation>
            <NavLink to="employees">Employees</NavLink>
            <NavLink to="trainers">Trainers</NavLink>
            <NavLink to="managers">Managers</NavLink>
          </InnerNavigation>
        )}
        <Input
          type="search"
          placeholder={`Search all ${usersRole.toLowerCase()}`}
          name={"search_input"}
          onChange={handleSearch}
          value={searchValue}
        />
      </div>
      <Outlet context={{ users: specificUsers }} />
    </div>
  );
}
