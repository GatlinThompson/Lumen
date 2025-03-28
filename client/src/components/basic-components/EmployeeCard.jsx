import CardContainer from "./CardContainer";
import styles from "../../styles/employee-card.module.scss";
import ProfileIcon from "./ProfileIcon";
export default function EmployeeCard({ employee, children }) {
  return (
    <CardContainer>
      <div className={styles.employee_info}>
        <ProfileIcon user={employee} extraClasses={`${styles.icon}`} />
        <div className={styles.info}>
          <p className={styles.name}>
            {employee.first_name} {employee.last_name}
          </p>
          <p className={styles.department}>{employee.department.name}</p>
        </div>
        <div className={styles.extra}>{children}</div>
      </div>
    </CardContainer>
  );
}
