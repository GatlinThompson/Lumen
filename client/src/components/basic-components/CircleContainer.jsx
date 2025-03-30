import CardContainer from "./CardContainer";
import styles from "../../styles/circle-chart.module.scss";
import CircleChart from "./CircleChart";
import { useEffect, useState } from "react";

export default function CircleContainer({
  percent,
  color = "blue",
  title = "Test",
}) {
  const [circlePercent, setCirclePercent] = useState(0);
  useEffect(() => {
    if (percent) {
      setCirclePercent(percent);
    }
  }, [title, color, percent]);
  return (
    <CardContainer extraClasses={`${styles.circle_container}`}>
      <CircleChart percent={percent} color={color} />
      <p className={styles.title}>{title}</p>
      <p className={styles.percent}>{percent ? percent : "0"}%</p>{" "}
      {/**PERCENT */}
    </CardContainer>
  );
}
