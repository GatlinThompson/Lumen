import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  eachDayOfInterval,
} from "date-fns";
import { createContext, useContext, useEffect, useState } from "react";
import CardContainer from "../../basic-components/CardContainer";
import styles from "../../../styles/calendar.module.scss";
import MonthHeader from "./MonthHeader";
import MonthBody from "./MonthBody";
import { apiFetch } from "../../../hooks/APIFetch";
import { AppContext } from "../../../App";
import SimpleModal from "./SimpleModal";

export const CalendarContext = createContext();

export default function Calendar() {
  const { user } = useContext(AppContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  // returns days in the month's calendar
  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const startWeek = startOfWeek(start);

    // returns array for days in the month
    return eachDayOfInterval({ start: startWeek, end: endOfWeek(end) });
  };

  // goes to next month
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // goes to previous month
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  //get events
  const getManagerEvents = async (req, res) => {
    const { result, error } = await apiFetch(
      "/api/dashboard/manager-calendar",
      "GET"
    );

    if (!error) {
      setEvents(result.events);
    }
  };

  const getTrainerEvents = async (req, res) => {
    const { result, error } = await apiFetch(
      "/api/dashboard/trainer-calendar",
      "GET"
    );

    if (!error) {
      setEvents(result.events);
    }
  };

  const getEmployeeEvents = async (req, res) => {
    const { result, error } = await apiFetch(
      "/api/dashboard/employee-calendar",
      "GET"
    );

    if (!error) {
      setEvents(result.events);
    }
  };

  useEffect(() => {
    if (user && user.role === "manager") {
      getManagerEvents();
    }

    if (user && user.role === "trainer") {
      getTrainerEvents();
    }

    if (user && user.role === "employee") {
      getEmployeeEvents();
    }
  }, [user]);

  return (
    <CalendarContext.Provider value={{ today, currentDate, events }}>
      <CardContainer extraClasses={styles.calendar}>
        <MonthHeader
          nextMonth={nextMonth}
          prevMonth={prevMonth}
          month={format(currentDate, "MMMM yyyy")}
        />
        <MonthBody days={getDaysInMonth()} />
      </CardContainer>
    </CalendarContext.Provider>
  );
}
