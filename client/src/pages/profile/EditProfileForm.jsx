import { useFormik } from "formik";
import * as Yup from "yup";
import { apiFetch } from "../../hooks/APIFetch";
import { useContext } from "react";
import { AppContext } from "../../App";
import Input from "../../components/form-components/Input.jsx";
import Button from "../../components/basic-components/Button.jsx";
import styles from "../../styles/edit-profile.module.scss";

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
      </form>
    </div>
  );
}
