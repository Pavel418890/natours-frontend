import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./SidebarNavbarItem.module.css";
import SvgGenerator from "../UI/SvgGenerator";
import { dynamicStyleClassName } from "../../utils/utils";
import { CSSModulesOptions } from "vite";

export interface SidebarNavbarItem {
  link: string;
  iconName: string;
  text: string;
  activeLinkClassname: string;
  regularLinkClassname: string;
  iconClassname: string;
}
const SidebarNavbarItem: React.FC<SidebarNavbarItem> = (props) => {
  return (
    <li>
      <NavLink
        to={props.link}
        className={({ isActive }) =>
          isActive ? props.activeLinkClassname : props.regularLinkClassname
        }
      >
        <div className={props.iconClassname}>
          <SvgGenerator name={props.iconName} />
        </div>
        {props.text}
      </NavLink>
    </li>
  );
};

export default SidebarNavbarItem;
