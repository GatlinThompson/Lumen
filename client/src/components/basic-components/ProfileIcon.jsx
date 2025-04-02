import styles from "../../styles/profile-icon.module.scss";

export default function ProfileIcon({
  user,
  size,
  extraClasses = "",
  handleLinkClick,
}) {
  //setup profile name
  const profileLetters = user
    ? user.first_name.charAt(0).toUpperCase() +
      user.last_name.charAt(0).toUpperCase()
    : "";
  //set up background color
  const backgroundColor = user ? user.background_color : "#fff";
  return (
    <div
      className={`${styles.profile} ${
        (size === "large" ? styles.large : "",
        size === "medium" ? styles.medium : "")
      } ${extraClasses}`}
      style={{ backgroundColor: backgroundColor }}
      onClick={() => handleLinkClick}
    >
      <span>{profileLetters}</span>
    </div>
  );
}
