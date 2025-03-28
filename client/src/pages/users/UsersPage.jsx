import { useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";
import { Outlet, useNavigate } from "react-router-dom";
import BackButton from "../../components/basic-components/BackButton";
import PageHeader from "../../components/basic-components/PageHeader";
import Input from "../../components/form-components/Input";

export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [usersRole, setUsersRole] = useState("Employees");
  const [specificUsers, setSpecificUsers] = useState([]);

  //get all users
  const getAllUsers = async () => {
    const { result, error } = await apiFetch("/api/users", "GET");

    if (!error) {
      console.log(result.users);

      setUsers(result.users);
      setTimeout(() => {
        setLoaded(true);
      }, 100);
    } else {
      navigate("/errorapi");
    }
  };

  const setSpecificUserData = (role) => {
    console.log("ASDAS");
    if (role === "Managers") {
      setSpecificUsers(users["managers"]);
    } else if (role === "Trainers") {
      setSpecificUsers(users["trainers"]);
    } else {
      setSpecificUsers(users["employees"]);
    }

    console.log(specificUsers);
  };

  //change when first rendered
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (users && usersRole) {
      setSpecificUserData(usersRole);
    }
  }, [users, usersRole]);

  useEffect(() => {
    console.log("Navigate");
    //if location is only /users
    if (location.pathname === "/users") {
      navigate("/users/employees");
    }

    //change page header based on url
    if (location.pathname === "/users/managers") {
      setUsersRole("Managers");
    } else if (location.pathname === "/users/trainers") {
      setUsersRole("Trainers");
    } else {
      setUsersRole("Employees");
    }

    ///console.log(users);
    //set role specific users
    //SetSpecificUserData(usersRole);
  }, [location.pathname, navigate]);
  return (
    <div className={`${loaded ? "loaded loading" : "loading"}`}>
      <BackButton />
      <PageHeader title={`All ${usersRole}`} />
      <div>
        <Input
          type="search"
          placeholder={`Search all ${usersRole.toLowerCase()}`}
          name={"search_input"}
          //onChange={handleSearch}
        />
      </div>
      <Outlet context={{ users: specificUsers }} />
    </div>
  );
}
