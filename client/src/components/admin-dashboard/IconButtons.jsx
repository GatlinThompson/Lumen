import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/icon-buttons.module.scss";
import { Link } from "react-router-dom";

export default function BackButton() {
  return (
    <div className={`mt-4 ${styles.icon_btn_container}`}>
      <div className="row">
        <Link
          to="/users/create"
          className={`col-6 col-md-6 ${styles.icon_btn}`}
        >
          <CardContainer extraClasses={`py-5 ${styles.icon_card}`}>
            <div>
              <div className="align-content-center">
                <i className="bi bi-person-plus"></i>
              </div>
              <div>User Creation</div>
            </div>
          </CardContainer>
        </Link>
        <Link
          to="/users/managers"
          className={`col-6 col-md-6 ${styles.icon_btn}`}
        >
          <CardContainer extraClasses={`py-5 ${styles.icon_card}`}>
            <div className="text-center">
              <div>
                <i className="bi bi-briefcase"></i>
              </div>
              <div>Managers</div>
            </div>
          </CardContainer>
        </Link>
      </div>
      <div className="row">
        <Link
          to="/users/trainers"
          className={`col-6 col-md-6 ${styles.icon_btn}`}
        >
          <CardContainer extraClasses={`py-5 ${styles.icon_card}`}>
            <div className="text-center">
              <div>
                <i className="bi bi-person-video3"></i>
              </div>
              <div>Trainers</div>
            </div>
          </CardContainer>
        </Link>
        <Link
          to="/users/employees"
          className={`col-6 col-md-6 ${styles.icon_btn}`}
        >
          <CardContainer extraClasses={`py-5 ${styles.icon_card}`}>
            <div className="text-center">
              <div>
                <i className="bi bi-person"></i>
              </div>
              <div>Employees</div>
            </div>
          </CardContainer>
        </Link>
      </div>
    </div>
  );
}
