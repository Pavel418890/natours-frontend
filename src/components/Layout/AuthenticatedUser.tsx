import React from "react";
import { Link } from "react-router-dom";

import styles from "./MainNavigation.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  userActions,
  User,
  selectCurrentUser,
} from "../../features/user/userSlice";
import { useUserProfileQuery } from "../../app/services/users";

const AuthenticatedUser: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const logoutHandler = () => dispatch(userActions.logout());
  return (
    <nav className={`${styles.nav} ${styles.navUser}`}>
      <Link
        to={"tours"}
        className={`${styles.navElem} ${styles.navElemCTA}`}
        onClick={logoutHandler}
      >
        Log Out
      </Link>
      <div>
        <Link to="profile" className={styles.navElem}>
          <img
            className={styles.userPhoto}
            src={`${import.meta.env.VITE_API_URL}${user!.profile.photo}`}
            alt={`${user!.profile.first_name}'s photo`}
          />
          {/* <span>{`${user.profile.first_name} ${user.profile.last_name}`}</span> */}
        </Link>
      </div>
    </nav>
  );
};
export default AuthenticatedUser;
