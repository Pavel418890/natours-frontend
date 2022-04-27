import React from "react";
import styles from "./Profile.module.css";
import SidebarNavbarItem from "../../../components/Layout/SidebarNavbarItem";

const ProfileSidebar: React.FC = () => {
  return (
    <ul className={styles.sideNav}>
      <SidebarNavbarItem
        activeLinkClassname={styles.activeLink}
        regularLinkClassname={styles.regularLink}
        iconClassname={styles.icon}
        link={"/profile"}
        iconName={"userConfig"}
        text={"Settings"}
      />
      <SidebarNavbarItem
        activeLinkClassname={styles.activeLink}
        regularLinkClassname={styles.regularLink}
        iconClassname={styles.icon}
        link={"/bookings"}
        iconName={"suitcase"}
        text={"My bookings"}
      />
      <SidebarNavbarItem
        activeLinkClassname={styles.activeLink}
        regularLinkClassname={styles.regularLink}
        iconClassname={styles.icon}
        link={"/tour-reviews"}
        iconName={"star"}
        text={"My reviews"}
      />
      <SidebarNavbarItem
        activeLinkClassname={styles.activeLink}
        regularLinkClassname={styles.regularLink}
        iconClassname={styles.icon}
        link={"/billings"}
        iconName={"creditCard"}
        text={"Billing"}
      />
    </ul>
  );
};

export default ProfileSidebar;
