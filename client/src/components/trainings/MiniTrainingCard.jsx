import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/mini-training-card.module.scss";
import { Link } from "react-router-dom";

export default function MiniTrainingCard(props) {
  const backgroundColor = props.training
    ? props.training.background_color
    : "#fff";
  return (
    <CardContainer
      extraClasses={`has_background_color flex ${styles.mini_training_card}`}
    >
      <div
        className={styles.background_color}
        style={{ backgroundColor: backgroundColor }}
      />
      <p className={styles.title}>{props.training.title}</p>
      {props.children}
    </CardContainer>
  );
}
