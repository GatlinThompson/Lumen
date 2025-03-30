import BackButton from "../../components/basic-components/BackButton";
import PageHeader from "../../components/basic-components/PageHeader";
import Input from "../../components/form-components/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "../../styles/training-program.module.scss";
import TextArea from "../../components/form-components/TextArea";
import { useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";
import Select from "../../components/form-components/Select";
import SessionsFormCard from "../../components/trainings/SessionsFormCard";
import Button from "../../components/basic-components/Button";
import NotificationAlert from "../../components/basic-components/NotificationAlert";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function TrainingForm() {
  //use states
  const [managers, setManagers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let initialValues = {
    title: "",
    description: "",
    assigned_manager: "",
    deadline: "",
    duration: "",
    sessions: [],
  };

  const durations = [
    { time: 30, duration: "30 minutes" },
    { time: 45, duration: "45 minutes" },
    { time: 60, duration: "1 hour" },
    { time: 90, duration: "1.5 hours" },
    { time: 120, duration: "2 hours" },
    { time: 150, duration: "2.5 hours" },
    { time: 180, duration: "3 hours" },
    { time: 210, duration: "3.5 hours" },
    { time: 240, duration: "4 hours" },
    { time: 300, duration: "5 hours" },
  ];
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
    }
    //Get managers for assigned managers
    const getManagers = async () => {
      const { result, error, loading } = await apiFetch(
        "/api/users/managers",
        "GET"
      );

      if (!error) {
        //set manager from the list of users
        setManagers(result.users);
      } else {
        navigate("/errorapi");
      }
    };

    const getTrainers = async () => {
      const { result, error, loading } = await apiFetch(
        "/api/users/trainers",
        "GET"
      );

      if (!error) {
        //set trainers from the list of users
        setTrainers(result.users);
      } else {
        navigate("/errorapi");
      }
    };
    //call functions
    getManagers();
    getTrainers();
    addSession();
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, [user, navigate]);

  //Adds Session
  const addSession = () => {
    //new session schema
    const newSession = { _id: "", trainer: "", date: "", time: "" };

    //add new session to array
    setSessions((oldSessions) => {
      const updatedSessions = [...oldSessions, newSession];
      //update formik
      formik.setFieldValue("sessions", updatedSessions);
      return updatedSessions;
    });
  };

  //Removes Session
  const removeSession = (index) => {
    const removedSession = sessions.filter((session, i) => i !== index);
    setSessions(removedSession);
    //update formik
    formik.setFieldValue("sessions", removedSession);
  };

  //Updates Session
  const updateSession = (index, updatedSession) => {
    const updatedSessions = sessions.map(
      (session, i) => (i === index ? updatedSession : session) //update array if index equal array index
    );
    setSessions(updatedSessions);
    //update formik
    formik.setFieldValue("sessions", updatedSessions);
  };

  // Form validation
  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    assigned_manager: yup.string().required("A manager is required"),
    duration: yup
      .number()
      .min(30, "Duration at least 30 min.")
      .required("A duration is required"),
    deadline: yup
      .date()
      .min(new Date(new Date().setHours(0, 0, 0, 0)), "Must today or later.")
      .required("A deadline is required"),
    sessions: yup.array().of(
      yup.object({
        trainer: yup.string().required("Trainer is required"),
        date: yup
          .date()
          .min(
            new Date(new Date().setHours(0, 0, 0, 0)),
            "Must today or later."
          )
          .required("Date is required"),
        time: yup.string().required("Time is required"),
      })
    ),
  });

  const onSubmit = async (values) => {
    //api fetch hook
    const { result, error, loading } = await apiFetch(
      "/api/training-programs/create",
      "POST",
      values
    );

    if (!error) {
      setFormError(false); // no form errors
      navigate(`/training/new/${result.program}/success`);
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
      <BackButton />
      <PageHeader title={"Create New Training"} />

      <h2 className={styles.form_title}>Training Infomation</h2>
      <div className={styles.error_msg}>
        {formError ? (
          <NotificationAlert successful={formError} message={errorMessage} />
        ) : null}
      </div>
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
        <div className={styles.double_row}>
          <Select
            label="Duration"
            name="duration"
            placeholder={"00:00"}
            value={formik.values.duration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.duration}
            touched={formik.touched.duration}
            extraClasses={`${styles.duration}`}
          >
            {durations.map((duration, index) => {
              return (
                <option key={index} value={duration.time}>
                  {duration.duration}
                </option>
              );
            })}
          </Select>

          <Input
            type="date"
            label="Deadline"
            name="deadline"
            placeholder="MM/DD/YYYY"
            onChange={formik.handleChange}
            extraClasses={`${styles.small_input} ${styles.deadline}`}
            onBlur={formik.handleBlur}
            value={formik.values.deadline}
            error={formik.errors.deadline}
            touched={formik.touched.deadline}
          />
        </div>
        <div className="col-11">
          <Select
            label="Manager"
            name="assigned_manager"
            placeholder={"Assign a manager"}
            value={formik.values.assigned_manager}
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
        </div>
        {/*Sessions Dynamic Portion*/}
        <h2 className={`${styles.form_title} ${styles.session_section}`}>
          Create Sessions
        </h2>
        <div className={styles.sessions}>
          {sessions.map((session, index) => {
            return (
              <SessionsFormCard
                key={index}
                index={index}
                trainers={trainers}
                session={session}
                removeSession={removeSession}
                updateSession={updateSession}
                length={sessions.length}
                formik={formik}
                errors={
                  formik.errors.sessions ? formik.errors.sessions[index] : {}
                }
                touches={
                  formik.touched.sessions ? formik.touched.sessions[index] : {}
                }
              />
            );
          })}
        </div>
        <div>
          <Button
            variant="dark"
            onClick={addSession}
            type="button"
            extraClasses={`${styles.add_btn}`}
          >
            Add session
          </Button>
        </div>
        <div className={styles.btn_controls}>
          <Button
            variant="yellow"
            type="submit"
            extraClasses={`${styles.submit}`}
          >
            Create training
          </Button>
          <Button
            variant="gray"
            type="button"
            extraClasses={`${styles.cancel}`}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
