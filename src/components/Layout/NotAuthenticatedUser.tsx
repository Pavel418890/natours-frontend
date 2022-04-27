import React from "react";
import styles from "./MainNavigation.module.css";
import { Link } from "react-router-dom";

const NotAuthenticatedUser: React.FC = (props) => {
  return (
    <nav className={`${styles.nav} ${styles.navUser}`}>
      <Link to="signin" className={styles.navElem}>
        Sign in
      </Link>
      <div>
        <Link to="signup" className={`${styles.navElem} ${styles.navElemCTA}`}>
          Sign Up
        </Link>
      </div>
    </nav>
  );
};
export default NotAuthenticatedUser;
