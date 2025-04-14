import { NavLink } from "react-router-dom";
import styles from "../../styles/nav.module.scss";

export default function EmployeeNav(props) {
  return (
    <>
      <NavLink to="/dashboard" onClick={props.handleLinkClick}>
        <i className="bi bi-speedometer2"></i>Dashboard
      </NavLink>
      <NavLink
        to="/trainings"
        className={`${styles.last_user_high}`}
        onClick={props.handleLinkClick}
      >
        <i className="bi bi-book"></i>Assigned Trainings
      </NavLink>
    </>
  );
}
