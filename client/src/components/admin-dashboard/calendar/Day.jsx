import { useContext, useEffect, useState } from "react";
import styles from "../../../styles/calendar.module.scss";
import { CalendarContext } from "./Calendar";
import EventIcon from "./EventIcons";
import { date } from "yup";
import { AppContext } from "../../../App";
import CalendarModal from "./CalendarModal";

export default function Day(props) {
  const [datesEvents, setDatesEvents] = useState([]);
  const [eventColor, setEventColor] = useState("");

  const { today, currentDate, events } = useContext(CalendarContext);
  const { setIsModalOpen, setModalData } = useContext(AppContext);

  let isToday = today.getTime() == props.day.getTime();

  let isMonth = currentDate.getMonth() == props.day.getMonth();

  useEffect(() => {
    const todayEvents = events.filter((todayEvent) => {
      const eventDate = new Date(todayEvent.event);
      eventDate.setHours(0, 0, 0, 0);
      const thisDay = new Date(props.day);
      thisDay.setHours(0, 0, 0, 0);
      return eventDate.getTime() === thisDay.getTime();
    });

    setDatesEvents(todayEvents);

    if (todayEvents.length > 0) {
      setEventColor(todayEvents[0].programs[0].background_color);
    } else {
      setEventColor("");
    }
  }, [events, props.day.getTime()]);

  const getEventDetails = () => {
    if (datesEvents.length == 0) {
      return;
    }
    setModalData(<CalendarModal dateEvents={datesEvents} />);
    setIsModalOpen(true);
  };

  return (
    <td
      className={`${styles.day} ${isToday ? styles.today : ""} ${
        isMonth ? "" : styles.other_month
      }  `}
      onClick={getEventDetails}
    >
      <span>{props.day.getDate()}</span>
      {datesEvents.length > 0 && <EventIcon color={eventColor} />}
    </td>
  );
}
