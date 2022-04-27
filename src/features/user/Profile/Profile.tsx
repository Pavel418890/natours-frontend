import React from "react";

import ProfileSidebar from "./ProfileSidebar";
import AdminSidebar from "./AdminSidebar";

import ProfileContent from "./ProfileContent";
import UpdateUserPasswordForm from "./UpdateUserPasswordForm";
import styles from "./Profile.module.css";
import { useAppSelector } from "../../../app/hooks";
import { selectCurrentUser } from "../userSlice";
import UpdateUserEmailAddressForm from "./UpdateUserEmailAddressForm";

const ProfilePage: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  document.title = "Natours | Profile";
  return (
    <React.Fragment>
      <div className={styles.userView}>
        <nav className={styles.menu}>
          <ProfileSidebar />
          {user?.role === "admin" && <AdminSidebar />}
        </nav>
        <div className={styles.profileContent}>
          <ProfileContent />
          <div className={styles.line}>&nbsp;</div>
          <UpdateUserEmailAddressForm />
          <UpdateUserPasswordForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfilePage;
