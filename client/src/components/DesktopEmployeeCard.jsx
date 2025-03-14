import React from "react";
import styles from "../styles/desktop-employee-card.module.scss";
import CardContainer from "./CardContainer";
import Button from "./Button";
import ProfileIcon from "./ProfileIcon";

export default function DesktopEmployeeCard() {
  return (
    <CardContainer>
      <div className="d-flex justify-content-between align-items-center m-3">
        <div className="d-flex">
          <div className="profile-icon me-2">
            <ProfileIcon></ProfileIcon>
          </div>
          <div>
            <div className="fw-bold">Employee Name</div>
            <div>Employee Department</div>
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
    </CardContainer>
  );
};

