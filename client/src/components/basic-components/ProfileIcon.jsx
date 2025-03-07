import { useContext } from "react";
import { AppContext } from "../../App.jsx";
import styles from "../../styles/profile-icon.module.scss";

export default function ProfileIcon({ user }) {
  //setup profile name
  const profileLetters = user
    ? user.first_name.charAt(0).toUpperCase() +
      user.last_name.charAt(0).toUpperCase()
    : "";
  //set up background color
  const backgroundColor = user ? user.background_color : "#fff";
  return (
    <div
      className={`${styles.profile}`}
      style={{ backgroundColor: backgroundColor }}
    >
      <span>{profileLetters}</span>
    </div>
  );
}
