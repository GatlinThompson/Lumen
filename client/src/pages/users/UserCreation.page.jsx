import { useNavigate } from "react-router-dom";
import BackButton from "../../components/basic-components/BackButton";
import Button from "../../components/basic-components/Button";
import styles from "../../styles/training-program.module.scss";
import { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/basic-components/PageHeader";
import NotificationAlert from "../../components/basic-components/NotificationAlert";
import { apiFetch } from "../../hooks/APIFetch";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../../components/form-components/Input";
import Select from "../../components/form-components/Select";
import { AppContext } from "../../App";

export default function UserCreationPage() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loaded, setLoaded] = useState(false);

  let initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    temp_password: "",
    role: "",
    department: "",
  };

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
    }
    const getRolesandDepartments = async () => {
      const { result, error } = await apiFetch(
        "/api/admin/roles-and-departments",
        "GET"
      );

      //if no errors
      if (!error) {
        setFormError(false);
        setRoles(result.roles); //set roles
        setDepartments(result.departments); //set departments
      } else {
        setFormError(true);
        setErrorMessage(result.message);
        navigate("/errorapi");
      }
    };
    //add page tranisiton
    setTimeout(() => {
      setLoaded(true);
    }, 100);

    getRolesandDepartments();
  }, []);

  // Form validation
  const validationSchema = yup.object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    temp_password: yup.string().required("Password is required"),
    role: yup.string().required("Role is required"),
    department: yup.string(),
  });

  const onSubmit = async (values) => {
    //api fetch hook
    const { result, error } = await apiFetch(
      "/api/user/create",
      "POST",
      values
    );

    if (!error) {
      setFormError(false); // no form errors
      navigate(`/users/create/success`);
    } else {
      setFormError(true);
      setErrorMessage(result.message);
    }
  };

  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className={`${loaded ? "loaded loading" : "loading"}`}>
      <BackButton to="/dashboard" />
      <PageHeader title={"Create new user"} />
      <div className={styles.error_msg}>
        {formError ? (
          <NotificationAlert successful={formError} message={errorMessage} />
        ) : null}
      </div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          label="First name"
          name="first_name"
          placeholder="Enter first name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.first_name}
          error={formik.errors.first_name}
          touched={formik.touched.first_name}
        />
        <Input
          type="text"
          label="Last name"
          name="last_name"
          placeholder="Enter last name"
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
          placeholder="Enter an email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
        />
        <Input
          type="password"
          label="Temporary password"
          name="temp_password"
          placeholder="Enter a temporary password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.temp_password}
          error={formik.errors.temp_password}
          touched={formik.touched.temp_password}
        />
        <Select
          label="Role"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.role}
          touched={formik.touched.role}
        >
          {roles.map((role) => {
            return (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            );
          })}
        </Select>
        {/*67c35a28cbe9a75c992624e2*/}
        {formik.values.role != "67c35a28cbe9a75c992624e2" &&
          formik.values.role != "67c355eb36db681b9d63d01f" && (
            <Select
              label="Department"
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.department}
              touched={formik.touched.department}
            >
              {departments.map((department) => {
                return (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                );
              })}
            </Select>
          )}

        <div className={`${styles.btn_controls} ${styles.user_btns}`}>
          <Button
            variant="yellow"
            type="submit"
            extraClasses={`${styles.submit}`}
          >
            Confirm user creation
          </Button>

          <Button
            variant="gray"
            type="button"
            extraClasses={`${styles.cancel}`}
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
