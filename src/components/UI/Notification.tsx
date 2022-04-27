import React from "react";

import {
  NotificationState,
  selectCurrentNotificationState,
  hideNotification,
} from "../../features/ui/uiSlice";
import styles from "./Notification.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Notification: React.FC<NotificationState> = ({
  status,
  title,
  message,
}) => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(selectCurrentNotificationState);
  const closeHandler = () => dispatch(hideNotification());
  React.useLayoutEffect(() => {
    if (status !== "pending") {
      let timer = setTimeout(() => dispatch(hideNotification()), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  let subClassName = "";

  if (status === "rejected" || status === "uninitialized")
    subClassName = styles.error;
  if (status === "fulfilled") subClassName = styles.success;

  const fullClassName =
    status === "pending"
      ? styles.spinner
      : `${styles.notification} ${subClassName}`;
  return (
    <section className={fullClassName} onClick={closeHandler}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
    </section>
  );
};
export default Notification;
