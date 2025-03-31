import { useContext, useEffect, useState } from "react";
import BackButton from "../../components/basic-components/BackButton";
import PageHeader from "../../components/basic-components/PageHeader.jsx";
import ProfileIcon from "../../components/basic-components/ProfileIcon.jsx";
import Button from "../../components/basic-components/Button.jsx";
import styles from "../../styles/profile.module.scss";
import { AppContext } from "../../App.jsx";

export default function UserDetails() {
  const { user } = useContext(AppContext);
  return (
    <div>
      <BackButton />
      <PageHeader title={"Manager Details"} />
      <div className="row align-items-center mt-4 mb-5">
        <ProfileIcon user={user} size="large" />
        <div className="col-6">
          <h2 className="fs-2 text-nowrap">
            {user.first_name} {user.last_name}
          </h2>
          <p className="m-0">{user.email}</p>
          <p>{user.department}</p>
        </div>
      </div>
    </div>
  );
}
