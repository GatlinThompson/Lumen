import React, { useEffect, useState } from "react";
import EmployeeCard from "../basic-components/EmployeeCard";
import styles from "../../styles/employees-list.module.scss";
import { apiFetch } from "../../hooks/APIFetch";

export default function EmployeesList({ role }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { result, error } = await apiFetch(
        `/api/users?role=${role}`,
        "GET"
      );
      if (!error) {
        setUsers(result.users);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [role]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.usersList}>
      {users.map((user) => (
        <EmployeeCard key={user._id} user={user} />
      ))}
    </div>
  );
}
