import { Link, NavLink } from "react-router-dom";
import menu_icon from "../assets/images/menu-icon.svg";
import styles from "../styles/nav.module.scss";
import ProfileIcon from "./ProfileIcon";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AdminNav from "./role-navagation/AdminNav";
import { useContext } from "react";
import { AppContext } from "../App";
import ManagerNav from "./role-navagation/ManagerNav";
import TrainerNav from "./role-navagation/TrainerNav";
import EmployeeNav from "./role-navagation/EmployeeNav";

export default function NavBar() {
  let { user } = useContext(AppContext);

  return (
    <Navbar expand="lg" className={`${styles.navbar}`}>
      <Link to="/dashboard" className={`${styles.nav_brand}`}>
        lumen
      </Link>
      <Link to="#">
        <ProfileIcon />
      </Link>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className={`${styles.toggle}`}
      >
        <img src={menu_icon} alt="hambuger menu" />
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={`${styles.nav_links}`}>
          {user && user.role === "admin" ? <AdminNav /> : null}
          {user && user.role === "manager" ? <ManagerNav /> : null}
          {user && user.role === "trainer" ? <TrainerNav /> : null}
          {user && user.role === "employee" ? <EmployeeNav /> : null}
          <hr className={`${styles.nav_divider}`} />
          <NavLink to="">
            <i className="bi bi-gear"></i>Account
          </NavLink>
          <NavLink to="/logout">
            <i className="bi bi-arrow-bar-left"></i>Logout
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
