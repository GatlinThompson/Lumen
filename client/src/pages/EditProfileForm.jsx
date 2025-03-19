import { useFormik } from "formik";
import * as Yup from "yup";
import { apiFetch } from "../hooks/APIFetch";
import { useContext } from "react";
import { AppContext } from "../App";
import Input from "../components/form-components/Input.jsx";
import Button from "../components/basic-components/Button.jsx";
import styles from "../styles/edit-profile.module.scss";

export default function EditProfileForm({ onClose }) {
  const { user, setUser } = useContext(AppContext);

  const personalDetailsFormik = useFormik({
    initialValues: {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
    }),

    onSubmit: async (values) => {
      const { result, error } = await apiFetch(
        "/api/user/change-name",
        "PUT",
        values
      );

      if (!error) {
        setUser(result.user);
        onClose();
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    validationSchema: Yup.object({
      current_password: Yup.string().required("Current password is required"),
      new_password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .optional(),
      confirm_new_password: Yup.string()
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        .optional(),
    }),

    onSubmit: async (values) => {
      const { result, error } = await apiFetch(
        "/api/user/:id/change-password",
        "PUT",
        values
      );

      if (!error) {
        setUser(result.user);
        onClose();
      }
    },
  });

  return (
    <div>
      <h2>Edit Profile</h2>

      <form>
        <section>
          <h3>Personal Details</h3>
          <Input
            type="text"
            label="First Name"
            name="first_name"
            placeholder="Enter first name"
            onChange={personalDetailsFormik.handleChange}
            onBlur={personalDetailsFormik.handleBlur}
            value={personalDetailsFormik.values.first_name}
            error={personalDetailsFormik.errors.first_name}
            touched={personalDetailsFormik.touched.first_name}
          />
          <Input
            type="text"
            label="Last Name"
            name="last_name"
            placeholder="Enter last name"
            onChange={personalDetailsFormik.handleChange}
            onBlur={personalDetailsFormik.handleBlur}
            value={personalDetailsFormik.values.last_name}
            error={personalDetailsFormik.errors.last_name}
            touched={personalDetailsFormik.touched.last_name}
          />

          <div className={`${styles.btn_controls} ${styles.user_btns}`}>
            <Button
              variant="yellow"
              type="button"
              onClick={personalDetailsFormik.handleSubmit}
              extraClasses={`${styles.submit}`}
            >
              Save
            </Button>
            <Button
              variant="gray"
              type="button"
              onClick={onClose}
              extraClasses={`${styles.cancel}`}
            >
              Cancel
            </Button>
          </div>
        </section>

        <section>
          <h3>Change Password</h3>
          <Input
            type="password"
            label="Current Password"
            name="current_password"
            placeholder="Enter current password"
            onChange={passwordFormik.handleChange}
            onBlur={passwordFormik.handleBlur}
            value={passwordFormik.values.current_password}
            error={passwordFormik.errors.current_password}
            touched={passwordFormik.touched.current_password}
          />
          <Input
            type="password"
            label="New Password"
            name="new_password"
            placeholder="Enter new password"
            onChange={passwordFormik.handleChange}
            onBlur={passwordFormik.handleBlur}
            value={passwordFormik.values.new_password}
            error={passwordFormik.errors.new_password}
            touched={passwordFormik.touched.new_password}
          />
          <Input
            type="password"
            label="Confirm New Password"
            name="confirm_new_password"
            placeholder="Confirm new password"
            onChange={passwordFormik.handleChange}
            onBlur={passwordFormik.handleBlur}
            value={passwordFormik.values.confirm_new_password}
            error={passwordFormik.errors.confirm_new_password}
            touched={passwordFormik.touched.confirm_new_password}
          />

          <div className={`${styles.btn_controls} ${styles.user_btns}`}>
            <Button
              variant="yellow"
              type="button"
              onClick={passwordFormik.handleSubmit}
              extraClasses={`${styles.submit}`}
            >
              Save
            </Button>
            <Button
              variant="gray"
              type="button"
              onClick={onClose}
              extraClasses={`${styles.cancel}`}
            >
              Cancel
            </Button>
          </div>
        </section>
      </form>
    </div>
  );
}
