import React from "react";
import styles from "./Profile.module.css";
import SidebarNavbarItem from "../../../components/Layout/SidebarNavbarItem";

const AdminSidebar: React.FC = () => {
  return (
    <div className={styles.adminNav}>
      <h5 className={styles.adminHeading}>Admin</h5>
      <ul className={styles.sideNav}>
        <SidebarNavbarItem
          activeLinkClassname={styles.activeLink}
          regularLinkClassname={styles.regularLink}
          iconClassname={styles.icon}
          link={"/manage-tours"}
          iconName={"map"}
          text={"Manage Tours"}
        />
        <SidebarNavbarItem
          activeLinkClassname={styles.activeLink}
          regularLinkClassname={styles.regularLink}
          iconClassname={styles.icon}
          link={"/manage-users"}
          iconName={"users"}
          text={"Manage Users"}
        />
        <SidebarNavbarItem
          activeLinkClassname={styles.activeLink}
          regularLinkClassname={styles.regularLink}
          iconClassname={styles.icon}
          link={"/manage-reviews"}
          iconName={"star"}
          text={"Manage Reviews"}
        />
        <SidebarNavbarItem
          activeLinkClassname={styles.activeLink}
          regularLinkClassname={styles.regularLink}
          iconClassname={styles.icon}
          link={"/manage-bookings"}
          iconName={"suitcase"}
          text={"Manage Bookings"}
        />
      </ul>
    </div>
  );
};

export default AdminSidebar;
