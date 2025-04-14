import { useEffect, useState } from "react";
import Week from "./Week";

export default function MonthContent(props) {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const weekArray = [];
    for (let i = 0; i < props.days.length; i += 7) {
      weekArray.push(props.days.slice(i, i + 7));
    }

    setWeeks(weekArray);
  }, [props.days]);

  return (
    <tbody>
      {weeks &&
        weeks.map((week, index) => {
          return <Week key={index} week={week} />;
        })}
    </tbody>
  );
}
