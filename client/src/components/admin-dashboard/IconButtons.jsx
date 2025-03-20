import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/icon-buttons.module.scss";

export default function BackButton() {
  return (
    <div className={styles.icon_btn_container}>
      <div className="d-flex">
        <a href="/users/create" className={styles.icon_btn}>
          <CardContainer extraClasses={styles.icon_card}>
            <div className="">
              <div className="align-content-center">
                <i class="bi bi-person-plus"></i>
              </div>
              <div>User Creation</div>
            </div>
          </CardContainer>
        </a>
        <a href="/users/managers" className={styles.icon_btn}>
          <CardContainer extraClasses={styles.icon_card}>
            <div className="text-center">
              <div>
                <i class="bi bi-briefcase"></i>
              </div>
              <div>Managers</div>
            </div>
          </CardContainer>
        </a>
      </div>
      <div className="d-flex">
        <a href="/users/trainers" className={styles.icon_btn}>
          <CardContainer extraClasses={styles.icon_card}>
            <div className="text-center">
              <div>
                <i class="bi bi-person-video3"></i>
              </div>
              <div>Trainers</div>
            </div>
          </CardContainer>
        </a>
        <a href="/users/employees" className={styles.icon_btn}>
          <CardContainer extraClasses={styles.icon_card}>
            <div className="text-center">
              <div>
                <i class="bi bi-person"></i>
              </div>
              <div>Employees</div>
            </div>
          </CardContainer>
        </a>
      </div>
    </div>
  );
}