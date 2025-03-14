/* login page */
import logo from "../assets/images/lumenlogo_full_light.svg";
import Button from "../components/basic-components/Button.jsx";
import Input from "../components/form-components/Input.jsx";
import styles from "../styles/authentication-pages.module.scss";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { apiFetch } from "../hooks/APIFetch";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App.jsx";
import NotificationAlert from "../components/basic-components/NotificationAlert.jsx";

export default function RegistrationPage() {
  const navigate = useNavigate();

  let { loggedIn, user } = useContext(AppContext);
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //go to dashboard if user is already logged in
  useEffect(() => {
    if (loggedIn && user) {
      navigate("/dashboard");
    }
  }, [loggedIn]);

  //Set Inital Values for form
  let initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  // Form validation
  const validationSchema = yup.object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    confirm_password: yup
      .string()
      .required("")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  });

  const onSubmit = async (values) => {
    //api fetch hook
    const { result, error, loading } = await apiFetch(
      "/api/user/register",
      "POST",
      values
    );

    // if errors
    if (error) {
      setFormError(true);
      setErrorMessage(result.message);
      return;
    } else {
      //If successful registration add notification and navigate to login page
      setFormError(false); // no form errors
      navigate("/login");
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
        <h2 className={styles.authentication_header}>Registration</h2>
      </div>
      {formError ? (
        <NotificationAlert successful={formError} message={errorMessage} />
      ) : null}

      <form
        className={`${styles.authentication_form}`}
        onSubmit={formik.handleSubmit}
      >
        <Input
          type="text"
          label="First Name"
          name="first_name"
          placeholder="Enter your first name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.first_name}
          error={formik.errors.first_name}
          touched={formik.touched.first_name}
        />
        <Input
          type="text"
          label="Last Name"
          name="last_name"
          placeholder="Enter your last name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.last_name}
          error={formik.errors.last_name}
          touched={formik.touched.last_name}
        />
        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="Enter your email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.errors.password}
          touched={formik.touched.password}
        />
        <Input
          type="password"
          label="Confirm Password"
          name="confirm_password"
          placeholder="Enter your password again"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirm_password}
          error={formik.errors.confirm_password}
          touched={formik.touched.password}
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
