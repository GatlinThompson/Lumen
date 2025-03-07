/* login page */
import logo from "../assets/images/lumenlogo_full_light.svg";
import Button from "../components/basic-components/Button.jsx";
import Input from "../components/Input";
import styles from "../styles/authentication-pages.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { apiFetch } from "../hooks/APIFetch";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App.jsx";
import NotificationAlert from "../components/basic-components/NotificationAlert.jsx";

export default function LoginPage() {
  const navigate = useNavigate();

  let { loggedIn, user, setLoggedIn, setUser } = useContext(AppContext);

  //go to dashboard if user is already logged in
  useEffect(() => {
    if (loggedIn && user) {
      navigate("/dashboard");
    }
  }, [loggedIn]);

  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Set Inital Values for form
  let initialValues = {
    email: "",
    password: "",
  };

  // Form validation
  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const onSubmit = async (values) => {
    //api fetch hook
    const { result, error, loading } = await apiFetch(
      "/api/user/signin",
      "POST",
      values
    );

    // if theres no error from fetch
    if (!error) {
      setLoggedIn(true); //set login to true
      setUser(result.user); // set user
      setFormError(false); // no form errors
      navigate("/dashboard"); // navigate to dashboard
    } else {
      setFormError(true);
      setErrorMessage(result.message);
    }
  };

  let formik = useFormik({ initialValues, validationSchema, onSubmit });

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
      {formError ? (
        <NotificationAlert successful={formError} message={errorMessage} />
      ) : null}
      <form
        className={`${styles.authentication_form}`}
        onSubmit={formik.handleSubmit}
      >
        <Input
          id="email"
          type="email"
          label="Email"
          name="email"
          placeholder="Enter your email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          value={formik.values.password}
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
