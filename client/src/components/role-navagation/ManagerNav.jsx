import { NavLink } from "react-router-dom";
import styles from "../../styles/nav.module.scss";

export default function ManagerNav() {
  return (
    <>
      <NavLink to="/dashboard">
        <i className="bi bi-speedometer2"></i>Dashboard
      </NavLink>
      <NavLink to="">
        <i className="bi bi-book"></i>Assigned Trainings
      </NavLink>
      <NavLink to="">
        <i className="bi bi-file-plus"></i>Create Training
      </NavLink>
      <NavLink to="">
        <i className="bi bi-person"></i>Employees
      </NavLink>
      <NavLink to="" className={`${styles.last_user_med}`}>
        <i className="bi bi-bell"></i>Notifications
      </NavLink>
    </>
  );
}
