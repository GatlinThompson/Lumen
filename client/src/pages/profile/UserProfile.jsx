import { useContext, useEffect, useState } from "react";
import BackButton from "../../components/basic-components/BackButton.jsx";
import PageHeader from "../../components/basic-components/PageHeader.jsx";
import { AppContext } from "../../App.jsx";
import ProfileIcon from "../../components/basic-components/ProfileIcon.jsx";
import Button from "../../components/basic-components/Button.jsx";
import styles from "../../styles/profile.module.scss";
import EditProfileForm from "./EditProfileForm.jsx";
import NotificationAlert from "../../components/basic-components/NotificationAlert.jsx";

export default function UserProfile({ roles, departments }) {
  const { user } = useContext(AppContext);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setLoaded(true);
      }, 100);
    }
  }, [user]);

  return (
    <>
      {user && (
        <div className={`${loaded ? "loaded loading" : "loading"}`}>
          <BackButton to={`/dashboard/`} />
          <PageHeader title={"Profile"} />

          {successMessage && (
            <div className={styles.success_msg}>
              <NotificationAlert error={false} message={successMessage} />
            </div>
          )}

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
            <Button
              variant="black"
              onClick={() => setShowEditForm(!showEditForm)}
            >
              {showEditForm ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          {showEditForm && (
            <EditProfileForm
              user={user}
              roles={roles}
              departments={departments}
              onClose={() => setShowEditForm(false)}
              onSuccess={(msg) => {
                setSuccessMessage(msg);
                setShowEditForm(false);
                setTimeout(() => setSuccessMessage(""), 3000);
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
