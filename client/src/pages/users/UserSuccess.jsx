import BackButton from "../../components/basic-components/BackButton";
import { useNavigate } from "react-router-dom";
import SuccessHeader from "../../components/basic-components/SucessHeader";
import styles from "../../styles/success-page.module.scss";
import Button from "../../components/basic-components/Button";
import { useEffect, useState } from "react";

export default function UserSuccess() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  return (
    <div className={`${loaded ? "loaded loading" : "loading"}`}>
      <BackButton to="/users/create" />
      <SuccessHeader />
      <div className={styles.info_container}></div>
      <p className={styles.info}>User successfully created.</p>

      <div className={`${styles.btn_controls} ${styles.user_success_btns}`}>
        <Button
          variant="yellow"
          type="button"
          extraClasses={`${styles.submit}`}
          onClick={() => navigate("/users/create")}
        >
          Create another user
        </Button>

        <Button
          variant="gray"
          type="button"
          extraClasses={`${styles.cancel}`}
          onClick={() => navigate("/dashboard")}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
}
