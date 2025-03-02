import Button from "../components/Button";
import logo from "../assets/images/lumenlogo_full_light.svg";
import { useNavigate } from "react-router-dom";
import styles from "../styles/landing-page.module.scss";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="content y-center x-center">
      <div className={`${styles.landing_logo}`}>
        <img src={logo} alt="Lumen logo" />
      </div>
      <p className={`${styles.landing_quote}`}>
        Your company's guiding light <span> to efficient team compliance</span>
      </p>
      <Button
        extraClasses={styles.landing_button}
        variant="black"
        type="button"
        onClick={() => navigate("/login")}
      >
        Get Started
      </Button>
    </div>
  );
}
