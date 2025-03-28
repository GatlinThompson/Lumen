import { useNavigate, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import EmployeeCard from "../../components/basic-components/EmployeeCard";

import styles from "../../styles/employees-list.module.scss";
import Button from "../../components/basic-components/Button";

export default function UsersTable() {
  const context = useOutletContext();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(context.users);
  }, [context.users]);

  return (
    <div className={`${styles.users_list_column}`}>
      <div className={styles.desktop_list}>
        {users &&
          users.map((user, index) => {
            return (
              <EmployeeCard key={index} employee={user}>
                <Button
                  variant="black"
                  extraClasses={`${styles.list_button}`}
                  onClick={() => {
                    navigate(`/user/${user._id}`);
                  }}
                >
                  Details
                </Button>
              </EmployeeCard>
            );
          })}
      </div>
      <div className={styles.mobile_list}>
        {users &&
          users.map((user, index) => {
            return (
              <Link to={`/user/${user._id}`} key={index}>
                <EmployeeCard employee={user}></EmployeeCard>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
