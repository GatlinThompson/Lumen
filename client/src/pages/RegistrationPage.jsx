/* login page */
import logo from "../assets/images/lumenlogo_full_light.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import styles from "../styles/authentication-pages.module.scss";
import { Link } from "react-router-dom";

export default function RegistrationPage() {
  return (
    <div className="content margin-side-1">
      <div className={`${styles.authenticate_container}`}>
        <div className={`${styles.authentication_logo}`}>
          <img src={logo} alt="Lumen logo" />
        </div>
      </div>
      <div className={`${styles.authenticate_container}`}>
        <h2 className={styles.authentication_header}>Registration</h2>
      </div>

      <form className={`${styles.authentication_form}`}>
        <Input
          type="text"
          label="First Name"
          name="first_name"
          placeholder="Enter your first name"
          required
        />
        <Input
          type="text"
          label="Last Name"
          name="last_name"
          placeholder="Enter your last name"
          required
        />
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
        <Input
          type="password"
          label="Confirm Password"
          name="confirm_password"
          placeholder="Enter your password again"
          required
        />
        <div className={`${styles.authentication_btn}`}>
          <Button variant="black" type="submit">
            Register now
          </Button>
        </div>
      </form>
      <Link to={"/login"} className={`${styles.link}`}>
        Already have an account? Login
      </Link>
    </div>
  );
}
