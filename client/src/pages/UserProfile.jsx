import { useContext, useEffect, useState } from "react";
import BackButton from "../components/basic-components/BackButton";
import PageHeader from "../components/basic-components/PageHeader";
import { AppContext } from "../App";
import ProfileIcon from "../components/basic-components/ProfileIcon";
import Button from "../components/basic-components/Button.jsx";
import styles from "../styles/profile.module.scss";
import EditProfileForm from "./EditProfileForm.jsx";

export default function UserProfile({ roles, departments }) {
  const { user } = useContext(AppContext);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <div>
      <BackButton />
      <PageHeader title={"Profile"} />

      <div className={styles.profile_bg}>
        <ProfileIcon user={user} size="large" />
        <div className={styles.profile_content}>
          <p className={styles.profile_name}>
            {user.first_name} {user.last_name}
          </p>
          <p>
            <b>Department:</b> {user.department}
          </p>
          <p>
            <b>Role:</b> {user.role}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
        </div>
      </div>

      <div className={styles.profile_button}>
        <Button variant="black" onClick={() => setShowEditForm(!showEditForm)}>
          {showEditForm ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {showEditForm && (
        <EditProfileForm
          user={user}
          roles={roles}
          departments={departments}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
}
