import "../../styles/card-containers.scss";

export default function CardContainer(props) {
  return (
    <div className={`${props.extraClasses} card-container`}>
      {props.children}
    </div>
  );
}
