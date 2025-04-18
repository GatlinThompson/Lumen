import { useFormik } from "formik";
import * as Yup from "yup";
import { apiFetch } from "../../hooks/APIFetch";
import { useState, useContext } from "react";
import { AppContext } from "../../App";
import Input from "../../components/form-components/Input.jsx";
import Button from "../../components/basic-components/Button.jsx";
import styles from "../../styles/edit-profile.module.scss";
import NotificationAlert from "../../components/basic-components/NotificationAlert";

export default function EditProfileForm({ onClose, onSuccess }) {
  const { user, setUser } = useContext(AppContext);
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
        setFormError(false);
        onSuccess("User updated successfully!");
        setUser(result.user);
        onClose();
      } else {
        setFormError(true);
        setErrorMessage(result.message || "Failed to update user.");
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
        .min(5, "Password must be at least 5 characters")
        .optional(),
      confirm_new_password: Yup.string()
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        .optional(),
    }),

    onSubmit: async (values) => {
      const { result, error } = await apiFetch(
        "/api/user/change-password",
        "PUT",
        values
      );

      if (!error) {
        setFormError(false);
        setSuccessMessage("Password updated successfully!");
        onSuccess("Password updated successfully!");
        onClose();
      } else {
        setFormError(true);
        setErrorMessage(result.message || "Failed to update password.");
      }
    },
  });

  return (
    <div>
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

      <h2>Edit Profile</h2>
      <form className="mb-5">
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
      </form>

      <form>
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
      </form>
    </div>
  );
}
