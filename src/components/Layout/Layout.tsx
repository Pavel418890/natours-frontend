import React from "react";

import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import Notification from "../UI/Notification";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentNotificationState } from "../../features/ui/uiSlice";

const Layout: React.FC = (props) => {
  const notification = useAppSelector(selectCurrentNotificationState);
  return (
    <React.Fragment>
      <MainNavigation />
      {notification && (
        <Notification
          message={notification.message}
          title={notification.title}
          status={notification.status}
        />
      )}
      <main className={classes.main}>{props.children}</main>
      <Footer />
      <Outlet />
    </React.Fragment>
  );
};
export default Layout;
