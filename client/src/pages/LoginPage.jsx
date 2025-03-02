/* login page */
import logo from "../assets/images/lumenlogo_full_light.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import styles from "../styles/authentication-pages.module.scss";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="content margin-side-1">
      <div className={`${styles.authenticate_container}`}>
        <div className={`${styles.authentication_logo}`}>
          <img src={logo} alt="Lumen logo" />
        </div>
      </div>
      <div className={`${styles.authenticate_container}`}>
        <h2 className={styles.authentication_header}>Login</h2>
      </div>

      <form className={`${styles.authentication_form}`}>
        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <Input
          type="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <div className={`${styles.authentication_btn}`}>
          <Button variant="black" type="submit">
            Login
          </Button>
        </div>
      </form>
      <Link to={"/registration"} className={`${styles.link}`}>
        Don't have an account? Sign up
      </Link>
    </div>
  );
}
