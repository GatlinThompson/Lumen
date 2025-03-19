import { useContext } from "react";
import { AppContext } from "../../App.jsx";
import styles from "../../styles/profile-icon.module.scss";

<<<<<<< HEAD
export default function ProfileIcon({ user, size }) {
=======
export default function ProfileIcon({ user, extraClasses = "" }) {
>>>>>>> 8a056b5578389a5367fabe4a6b96ea4364a480df
  //setup profile name
  const profileLetters = user
    ? user.first_name.charAt(0).toUpperCase() +
      user.last_name.charAt(0).toUpperCase()
    : "";
  //set up background color
  const backgroundColor = user ? user.background_color : "#fff";
  return (
    <div
<<<<<<< HEAD
      className={`${styles.profile} ${size === "large" ? styles.large : ""}`}
=======
      className={`${styles.profile} ${extraClasses}`}
>>>>>>> 8a056b5578389a5367fabe4a6b96ea4364a480df
      style={{ backgroundColor: backgroundColor }}
    >
      <span>{profileLetters}</span>
    </div>
  );
}
