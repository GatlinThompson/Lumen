import { NavLink } from "react-router-dom";
import styles from "../../styles/nav.module.scss";

export default function AdminNav() {
  return (
    <>
      <NavLink to="/dashboard">
        <i className="bi bi-speedometer2"></i>Dashboard
      </NavLink>
      <NavLink to="">
        <i className="bi bi-book"></i>All Training
      </NavLink>
      <NavLink to="">
        <i className="bi bi-file-plus"></i>Create Training
      </NavLink>
      <NavLink to="">
        <i className="bi bi-briefcase"></i>Managers
      </NavLink>
      <NavLink to="">
        <i className="bi bi-person-video3"></i>Trainers
      </NavLink>
      <NavLink to="">
        <i className="bi bi-person"></i>Employees
      </NavLink>
      <NavLink to="">
        <i className="bi bi-person-plus"></i>User Creation
      </NavLink>
      <NavLink to="">
        <i className="bi bi-bell"></i>Notifications
      </NavLink>
    </>
  );
}
