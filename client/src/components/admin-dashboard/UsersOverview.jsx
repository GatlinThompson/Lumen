import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/users-overview.module.scss";
import { useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";
import { useNavigate } from "react-router-dom";

export default function UsersOverview() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { result, error } = await apiFetch("/api/dashboard/users", "GET");

      if (!error) {
        setUsers(result.users);
      } else {
        navigate("/error/api");
      }
    };

    getUsers();
  }, []);
  return (
    <CardContainer extraClasses={styles.users_overview_container}>
      <h2 className="fs-4 pb-3 m-0">Users</h2>

      <div className={styles.users_data}>
        <div>
          <div className="fw-bold fs-3">
            {users.managers ? users.managers : "0"}
          </div>
          <div>Managers</div>
        </div>

        <div>
          <div className="fw-bold fs-3">
            {users.trainers ? users.trainers : "0"}
          </div>
          <div>Trainers</div>
        </div>

        <div>
          <div className="fw-bold fs-3">
            {users.employees ? users.employees : "0"}
          </div>
          <div>Employees</div>
        </div>
      </div>
    </CardContainer>
  );
}
