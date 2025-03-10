import styles from "../../styles/desktop-header.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";
import ProfileIcon from "../basic-components/ProfileIcon";

export default function DesktopHeader() {
  let { loggedIn, user } = useContext(AppContext);
  return (
    <div className={`${styles.desktop_header}`}>
      {user ? (
        <span>
          {user.first_name} {user.last_name}
        </span>
      ) : null}
      <Link to="/profile">
        <ProfileIcon user={user} />
      </Link>
    </div>
  );
}
