import { NavLink } from "react-router-dom";
import styles from "../../styles/nav.module.scss";

export default function EmployeeNav() {
  return (
    <>
      <NavLink to="/dashboard">
        <i className="bi bi-speedometer2"></i>Dashboard
      </NavLink>
      <NavLink to="">
        <i className="bi bi-book"></i>Assigned Trainings
      </NavLink>
      <NavLink to="" className={`${styles.last_user_high}`}>
        <i className="bi bi-bell"></i>Notifications
      </NavLink>
    </>
  );
}
