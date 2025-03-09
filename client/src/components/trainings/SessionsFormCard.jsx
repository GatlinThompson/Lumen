import CardContainer from "../basic-components/CardContainer";
import Input from "../form-components/Input";
import styles from "../../styles/training-program.module.scss";
import Select from "../form-components/Select";
import { use, useEffect, useState } from "react";

export default function SessionsFormCard({
  index,
  trainers,
  session,
  removeSession,
  updateSession,
  length,
  formik,
  errors,
  touches,
}) {
  //initialize touches to false
  const [timeTouched, setTimeTouched] = useState(false);
  const [dateTouched, setDateTouched] = useState(false);
  const [trainerTouched, setTrainerTouched] = useState(false);

  const [timeError, setTimeError] = useState("");
  const [dateError, setDateError] = useState("");
  const [trainerError, setTrainerError] = useState("");
  useEffect(() => {
    //If Formik produces any errors
    if (errors) {
      //Time Error
      if (errors.time) {
        setTimeError(errors.time);
      } else {
        setTimeError("");
      }

      //Date Error
      if (errors.date) {
        setDateError(errors.date);
      } else {
        setDateError("");
      }

      //Trainer Error
      if (errors.trainer) {
        setTrainerError(errors.trainer);
      } else {
        setTrainerError("");
      }
    } else {
      //Everything is valid
      setDateError("");
      setTimeError("");
      setTrainerError("");
    }
  }, [errors]);

  useEffect(() => {
    //If Formik sumbit button is clicked and required fields are filled
    if (touches) {
      //Time Touch
      if (touches.time) setTimeTouched(touches.time);
      //Date Touch
      if (touches.date) setDateTouched(touches.date);
      //Trainer Touch
      if (touches.trainer) setTrainerTouched(touches.trainer);
    }
  }, [touches]);

  return (
    <CardContainer extraClasses={`${styles.session_container}`}>
      <div className={styles.session_header}>
        <p className={styles.session_header}>Session {index + 1}</p>
        {length - 1 === index && length > 1 && (
          <button
            type="button"
            onClick={() => {
              removeSession(index);
            }}
          >
            X
          </button>
        )}
      </div>
      <hr />
      <div className={styles.session_body}>
        <div className={styles.top_row}>
          <Input
            type="date"
            label="Date"
            name={`sessions[${index}].date`}
            placeholder="MM/DD/YYYY"
            extraClasses={`${styles.small_input} ${styles.date}`}
            onBlur={() => {
              setDateTouched(true);
            }}
            onChange={(e) => {
              formik.handleChange(e);
              updateSession(index, { ...session, date: e.target.value });
            }}
            value={session.date}
            touched={dateTouched}
            error={dateError}
          />

          <Input
            type="time"
            label="Time"
            name={`sessions[${index}].time`}
            extraClasses={`${styles.small_input} ${styles.time}`}
            onBlur={() => {
              setTimeTouched(true);
            }}
            onChange={(e) => {
              formik.handleChange(e);
              updateSession(index, { ...session, time: e.target.value });
            }}
            value={session.time}
            touched={timeTouched}
            error={timeError}
          />
        </div>
        {/*Training Select*/}
        <Select
          label="Trainer"
          name={`sessions[${index}].trainer`}
          onChange={(e) => {
            formik.handleChange(e);
            updateSession(index, { ...session, trainer: e.target.value });
          }}
          onBlur={() => {
            setTrainerTouched(true);
          }}
          touched={trainerTouched}
          error={trainerError}
          value={session.trainer}
          placeholder={"Pick a Trainer"}
        >
          {trainers.map((trainer) => {
            return (
              <option key={trainer._id} value={trainer._id}>
                {trainer.first_name} {trainer.last_name}
              </option>
            );
          })}
        </Select>
      </div>
    </CardContainer>
  );
}
