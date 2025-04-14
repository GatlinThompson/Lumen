import { Link } from "react-router-dom";
import styles from "../../../styles/calendar-modal.module.scss";
import CardContainer from "../../basic-components/CardContainer";
export default function CalendarModal(props) {
  console.log(props.dateEvents[0]);
  const date = new Date(props.dateEvents[0].event).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const todayEvents = props.dateEvents[0].programs;
  console.log(date);
  return (
    <>
      <h3 className={styles.header}>{date && date}</h3>
      <hr className={styles.seperator} />
      <div className={styles.events_container}>
        {todayEvents &&
          todayEvents.map((todayEvent, index) => {
            const time = new Date(props.dateEvents[0].event).toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "2-digit",
              }
            );
            return (
              <Link key={index}>
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
