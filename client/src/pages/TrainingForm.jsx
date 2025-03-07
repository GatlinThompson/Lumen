import BackButton from "../components/basic-components/BackButton";
import PageHeader from "../components/basic-components/PageHeader";
import Input from "../components/form-components/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "../styles/training-program.module.scss";
import TextArea from "../components/form-components/TextArea";
import { useEffect, useState } from "react";
import { apiFetch } from "../hooks/APIFetch";
import Select from "../components/form-components/Select";

export default function TrainingForm() {
  const [managers, setManagers] = useState([]);
  useEffect(() => {
    //Get managers for assigned managers
    const getMangers = async () => {
      const { result, error, loading } = await apiFetch(
        "/api/users/managers",
        "GET"
      );

      if (!error) {
        //set manger from the list of users
        console.log(result.users);
        setManagers(result.users);
      }
    };
    7;
    //call function
    getMangers();
  }, []);

  //Set Inital Values for form
  let initialValues = {
    title: "",
    description: "",
    assigned_manager: "",
  };

  // Form validation
  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    assigned_manager: yup.string().required("A Manager is required"),
  });

  const onSubmit = async (values) => {
    //api fetch hook
    console.log(values);
  };

  let formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <BackButton />
      <PageHeader title={"Create New Training"} />
      <h2 className={styles.form_title}>Training Infomation</h2>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <Input
          type="text"
          label="Training Title"
          name="title"
          placeholder="Enter title of the program"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          error={formik.errors.title}
          touched={formik.touched.title}
        />
        <TextArea
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.description}
          touched={formik.touched.description}
        />
        <Select
          label="Manager"
          name="assigned_manager"
          placeholder={"Assign a manager"}
          defaultValue={formik.values.assigned_manager}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.assigned_manager}
          touched={formik.touched.assigned_manager}
        >
          {managers.map((manager) => {
            return (
              <option key={manager._id} value={manager._id}>
                {manager.first_name} {manager.last_name}
              </option>
            );
          })}
        </Select>
      </form>
    </>
  );
}
