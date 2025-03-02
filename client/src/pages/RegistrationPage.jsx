/* login page */
import logo from "../assets/images/lumenlogo_full_light.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import styles from "../styles/authentication-pages.module.scss";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { apiFetch } from "../hooks/APIFetch";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../App.jsx";

export default function RegistrationPage() {
  const navigate = useNavigate();

  let { loggedIn, user } = useContext(AppContext);

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
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm_password: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  });

  const onSubmit = async (values) => {
    //api fetch hook
    const { result, error, loading } = await apiFetch(
      "/api/user/register",
      "POST",
      values
    );

    if (error) {
      console.log(result.message);
      return;
    } else {
      //If successful registration add notification and navigate to login page
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
          value={formik.values.first_name}
        />
        <Input
          type="text"
          label="Last Name"
          name="last_name"
          placeholder="Enter your last name"
          onChange={formik.handleChange}
          value={formik.values.last_name}
        />
        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="Enter your email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Input
          type="password"
          label="Confirm Password"
          name="confirm_password"
          placeholder="Enter your password again"
          onChange={formik.handleChange}
          value={formik.values.confirm_password}
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
