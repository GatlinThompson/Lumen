import "../../styles/card-containers.scss";

export default function CardContainer(props) {
  return <div className="card-container">{props.children}</div>;
}
