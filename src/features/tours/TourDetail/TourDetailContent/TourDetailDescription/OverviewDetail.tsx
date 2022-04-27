import React from "react";

import styles from "./TourDetailDescription.module.css";
import SvgGenerator from "../../../../../components/UI/SvgGenerator";

export interface OverviewBoxProps {
  label: string;
  value: string;
  icon: string;
}
const OverviewDetail: React.FC<OverviewBoxProps> = (props) => {
  return (
    <div className={styles.boxDetail}>
      <div className={styles.icon}>
        <SvgGenerator name={props.icon} />
      </div>
      <span className={styles.label}>{props.label}</span>
      <span className={styles.value}>{props.value}</span>
    </div>
  );
};
export default OverviewDetail;
