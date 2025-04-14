import { useEffect, useState } from "react";
import Day from "./Day";

export default function Week(props) {
  const [week, setWeek] = useState([]);

  useEffect(() => {
    setWeek(props.week);
  }, [props.week]);

  return (
    <tr>
      {week.map((day, index) => {
        return <Day key={index} day={new Date(day)} />;
      })}
    </tr>
  );
}
