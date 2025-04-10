import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import BackButton from "../../components/basic-components/BackButton";
import Button from "../../components/basic-components/Button";
import Select from "../../components/form-components/Select";
import PageHeader from "../../components/basic-components/PageHeader";
import NotificationAlert from "../../components/basic-components/NotificationAlert";
import { apiFetch } from "../../hooks/APIFetch";
import styles from "../../styles/training-program.module.scss";
import { AppContext } from "../../App";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const [pageUser, setPageUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validationSchema = yup.object({
    role: yup.string().required("Role is required"),
    department: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      role: "",
      department: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { result, error } = await apiFetch(
        `/api/user/${id}/edit`,
        "PUT",
        values
      );
      if (!error) {
        setFormError(false);
        setSuccessMessage("User updated successfully!");
      } else {
        setFormError(true);
        setErrorMessage(result.message || "Failed to update user.");
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
      return;
    }

    const fetchData = async () => {
      try {
        const [{ result: meta }, { result: userData }] = await Promise.all([
          apiFetch("/api/admin/roles-and-departments", "GET"),
          apiFetch(`/api/user/${id}`, "GET"),
        ]);

        setPageUser(userData.user);
        setRoles(meta.roles);
        setDepartments(meta.departments);

        formik.setValues({
          role: userData.user.role?._id || "",
          department: userData.user.department?._id || "",
        });

        setLoaded(true);
      } catch (err) {
        setFormError(true);
        setErrorMessage("Failed to load user data.");
      }
    };

    fetchData();
  }, [id, user]);

  if (!loaded) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className={`${loaded ? "loaded loading" : "loading"}`}>
        <BackButton to={`/user/${id}`} />
        <PageHeader title={"Edit User"} />
        <h2 className="fs-3 text-nowrap">
          {pageUser.first_name} {pageUser.last_name}
        </h2>

        {formError && (
          <div className={styles.error_msg}>
            <NotificationAlert error={true} message={errorMessage} />
          </div>
        )}

        {successMessage && (
          <div className={styles.success_msg}>
            <NotificationAlert error={false} message={successMessage} />
          </div>
        )}

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <Select
            label="Role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.role}
            touched={formik.touched.role}
          >
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </Select>

          {formik.values.role !== "67c35a28cbe9a75c992624e2" &&
            formik.values.role !== "67c355eb36db681b9d63d01f" && (
              <Select
                label="Department"
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.department}
                touched={formik.touched.department}
              >
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </Select>
            )}

          <div className={`${styles.btn_controls} ${styles.user_btns}`}>
            <Button variant="yellow" type="submit" extraClasses={styles.submit}>
              Save changes
            </Button>

            <Button
              variant="gray"
              type="button"
              extraClasses={styles.cancel}
              onClick={() => navigate(`/user/${id}`)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
