import { useEffect, useState } from "react";
import styles from "../styles/notification-alert.module.scss";

export default function NotificationAlert({ error = true, message = null }) {
  const [notifyMsg, setNotifyMsg] = useState("");
  useEffect(() => {
    setNotifyMsg(message);
  }, [message, error]);

  return (
    <>
      <div className={styles.notification_container}>
        <div
          className={`${styles.notification} ${
            !error ? styles.success : styles.error
          }`}
        >
          {!error ? (
            <i className="bi bi-check-circle-fill"></i>
          ) : (
            <i className="bi bi-x-circle-fill"></i>
          )}
          <span>{notifyMsg}</span>
        </div>
      </div>
    </>
  );
}
