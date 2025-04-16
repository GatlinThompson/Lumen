import { Link } from "react-router-dom";
import styles from "../../../styles/calendar-modal.module.scss";
import CardContainer from "../../basic-components/CardContainer";
import { useContext } from "react";
import { AppContext } from "../../../App";

export default function CalendarModal(props) {
  const { setIsModalOpen, user } = useContext(AppContext);

  const date = new Date(props.dateEvents[0].event).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const todayEvents = props.dateEvents[0].programs;

  return (
    <>
      <h3 className={styles.header}>{date && date}</h3>
      <hr className={styles.seperator} />
      <div className={styles.events_container}>
        {todayEvents &&
          todayEvents.map((todayEvent, index) => {
            let time = new Date(todayEvent.deadline).toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "2-digit",
              }
            );
            return (
              <Link
                key={index}
                to={`/trainings/${todayEvent._id}`}
                onClick={() => setIsModalOpen(false)}
              >
                <CardContainer extraClasses={styles.event}>
                  <div
                    className={styles.background}
                    style={{ backgroundColor: todayEvent.background_color }}
                  />
                  <div className={styles.info}>
                    <p className={styles.title}>{todayEvent.title}</p>
                    <div className={styles.date}>
                      <i className="bi bi-calendar"></i>
                      <p>
                        {date} at {time}
                      </p>
                    </div>
                  </div>
                </CardContainer>
              </Link>
            );
          })}
      </div>
    </>
  );
}
