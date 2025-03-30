import { useNavigate } from "react-router-dom";
import styles from "../../styles/back-button.module.scss";
import BackButtonImage from "../../assets/images/back-button.svg";

export default function BackButton({ to = null }) {
  const navigate = useNavigate();

  const goBack = () => {
    if (to) {
      navigate(to);
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <button className={styles.back_button} onClick={goBack}>
      <img src={BackButtonImage} alt="Back Button Image" />
    </button>
  );
}
