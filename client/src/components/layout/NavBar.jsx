import { Link, NavLink } from "react-router-dom";
import menu_icon from "../../assets/images/menu-icon.svg";
import styles from "../../styles/nav.module.scss";
import ProfileIcon from "../basic-components/ProfileIcon";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AdminNav from "../role-navagation/AdminNav";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import ManagerNav from "../role-navagation/ManagerNav";
import TrainerNav from "../role-navagation/TrainerNav";
import EmployeeNav from "../role-navagation/EmployeeNav";
import logo from "../../assets/images/lumenlogo.svg";

export default function NavBar() {
  let { user } = useContext(AppContext);
  const [expanded, setExpanded] = useState(false);

  //Handle closing Nav when link is clicked
  const handleLinkClick = () => {
    setExpanded(false);
  };

  return (
    <header>
      <Navbar expand="lg" className={`${styles.navbar}`} expanded={expanded}>
        <Link to="/dashboard" className={`${styles.nav_brand}`}>
          <div>
            <img src={logo} alt="Lumen Logo" />
          </div>
          lumen
        </Link>
        <Link to="#" className={`${styles.lg_gone}`}>
          <ProfileIcon user={user} />
        </Link>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          className={`${styles.toggle}`}
          onClick={() => setExpanded(!expanded)}
        >
          <img src={menu_icon} alt="hamburger menu" />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar-nav">
          <Nav className={`${styles.nav_links}`}>
            {user && user.role === "admin" ? (
              <AdminNav handleLinkClick={handleLinkClick} />
            ) : null}
            {user && user.role === "manager" ? (
              <ManagerNav handleLinkClick={handleLinkClick} />
            ) : null}
            {user && user.role === "trainer" ? (
              <TrainerNav handleLinkClick={handleLinkClick} />
            ) : null}
            {user && user.role === "employee" ? (
              <EmployeeNav handleLinkClick={handleLinkClick} />
            ) : null}

            <hr className={`${styles.nav_divider}`} />
            <NavLink
              to="/training/67ce263f0b751242f5c050ec/edit"
              className={`${styles.lg_divider}`}
              onClick={handleLinkClick}
            >
              <i className="bi bi-gear"></i>Account
            </NavLink>
            <NavLink to="/logout" onClick={handleLinkClick}>
              <i className="bi bi-arrow-bar-left"></i>Logout
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
