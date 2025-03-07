import React from "react";
import styles from "../styles/desktop-employee-card.module.scss";
import CardContainer from "./basic-components/CardContainer";
import Button from "./basic-components/Button";

export default function DesktopEmployeeCard() {
  <CardContainer>
    <div className="d-flex justify-content-between">
      <div>
        <div className="me-3 align-self-center">
          <div className="profile-icon">EP</div>
        </div>
        <div>
          <div className="fw-bold">"Employee Name"</div>
          <div>"Employee Department"</div>
        </div>
      </div>

      <div>
        <Button
          extraClasses={styles.landing_button}
          variant="black"
          type="button"
          onClick={() => navigate("#")}
        >
          Details
        </Button>
      </div>
    </div>
  </CardContainer>;
}
