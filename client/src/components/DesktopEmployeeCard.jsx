import React from "react";
import styles from "../styles/desktop-employee-card.module.scss";
<<<<<<< HEAD
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
=======
import CardContainer from "./basic-components/CardContainer";
import Button from "./basic-components/Button";

export default function DesktopEmployeeCard() {
  <CardContainer>
    <div className="d-flex justify-content-between">
      <div>
        <div className="me-3 align-self-center">
          <div className="profile-icon">EP</div>
>>>>>>> 70904f9ff6d9c56f40b24f657886d233c533f814
        </div>
        <div>
          <div className="fw-bold">"Employee Name"</div>
          <div>"Employee Department"</div>
        </div>
      </div>
<<<<<<< HEAD
    </CardContainer>
  );
};

=======

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
>>>>>>> 70904f9ff6d9c56f40b24f657886d233c533f814
