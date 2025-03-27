import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/users-overview.module.scss";

export default function UsersOverview() {
  return (
    <CardContainer extraClasses={styles.users_overview_container}>
      <div className="fs-4 pb-3">Users</div>

      <div className={styles.users_data}>
        <div>
          <div className="fw-bold fs-3">3</div>
          <div>Managers</div>
        </div>

        <div>
          <div className="fw-bold fs-3">10</div>
          <div>Trainers</div>
        </div>

        <div>
          <div className="fw-bold fs-3">20</div>
          <div>Employees</div>
        </div>
      </div>
    </CardContainer>
  );
}
