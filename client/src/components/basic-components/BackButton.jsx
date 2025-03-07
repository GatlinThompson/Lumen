import { useNavigate } from "react-router-dom";

import styles from "../../styles/back-button.module.scss";

export default function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <button className={styles.back_button} onClick={goBack}>
      &lt;
    </button>
  );
}
