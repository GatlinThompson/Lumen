import CardContainer from "./CardContainer";
import styles from "../../styles/circle-chart.module.scss";
import CircleChart from "./CircleChart";

export default function CircleContainer({ details }) {
  return (
    <CardContainer extraClasses={`${styles.circle_container}`}>
      <CircleChart percent={30} color={"blue"} />
      <p className={styles.title}>Completed Trainings</p>
      <p className={styles.percent}>20%</p> {/**PERCENT */}
    </CardContainer>
  );
}
