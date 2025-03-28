import { NavLink } from "react-router-dom";
import styles from "../../styles/nav.module.scss";

export default function ManagerNav(props) {
  return (
    <>
      <NavLink to="/dashboard" onClick={props.handleLinkClick}>
        <i className="bi bi-speedometer2"></i>Dashboard
      </NavLink>
      <NavLink to="/trainings" onClick={props.handleLinkClick}>
        <i className="bi bi-book"></i>Assigned Trainings
      </NavLink>
      <NavLink to="/users/employees" onClick={props.handleLinkClick}>
        <i className="bi bi-person"></i>Employees
      </NavLink>
      <NavLink
        to=""
        className={`${styles.last_user_med}`}
        onClick={props.handleLinkClick}
      >
        <i className="bi bi-bell"></i>Notifications
      </NavLink>
    </>
  );
}
