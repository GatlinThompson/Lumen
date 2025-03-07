import { NavLink } from "react-router-dom";

export default function AdminNav(props) {
  return (
    <>
      <NavLink to="/dashboard" onClick={props.handleLinkClick}>
        <i className="bi bi-speedometer2"></i>
        Dashboard
      </NavLink>
      <NavLink to="/trainings" onClick={props.handleLinkClick}>
        <i className="bi bi-book"></i>All Trainings
      </NavLink>
      <NavLink to="/training/new" onClick={props.handleLinkClick}>
        <i
          className="bi bi-file-plus"
          onClick={() => {
            props.handleLinkClick;
          }}
        ></i>
        Create Training
      </NavLink>
      <NavLink to="">
        <i className="bi bi-briefcase" onClick={props.handleLinkClick}></i>
        Managers
      </NavLink>
      <NavLink to="" onClick={props.handleLinkClick}>
        <i className="bi bi-person-video3"></i>Trainers
      </NavLink>
      <NavLink to="" onClick={props.handleLinkClick}>
        <i className="bi bi-person"></i>Employees
      </NavLink>
      <NavLink to="" onClick={props.handleLinkClick}>
        <i className="bi bi-person-plus"></i>User Creation
      </NavLink>
      <NavLink to="" onClick={props.handleLinkClick}>
        <i className="bi bi-bell"></i>Notifications
      </NavLink>
    </>
  );
}
