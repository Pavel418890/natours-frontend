import React from "react";
import { Link } from "react-router-dom";

import styles from "./MainNavigation.module.css";
import NatoursLogo from "../UI/NatoursLogo";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/user/userSlice";
import NotAuthenticatedUser from "./NotAuthenticatedUser";
import AuthenticatedUser from "./AuthenticatedUser";

const MainNavigation = () => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${styles.navTour}`}>
        <div className={styles.navElem}>
          <Link to="tours" className={styles.navElem}>
            All Tours
          </Link>
        </div>
      </nav>
      <NatoursLogo />
      {user ? <AuthenticatedUser /> : <NotAuthenticatedUser />}
    </header>
  );
};
export default MainNavigation;
