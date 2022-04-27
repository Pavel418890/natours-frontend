import { FC } from "react";

import styles from "./TourItemHeader.module.css";
import { Tour } from "../../tourSlice";

export type TourItemHeaderProp = Pick<Tour, "image_cover" | "name">;

const TourItemHeader: FC<TourItemHeaderProp> = (props) => {
  return (
    <div className={styles.header}>
      <div className={styles.picture}>
        <div className={styles.overlay} />
        <img
          className={styles.image}
          src={`${import.meta.env.VITE_API_URL}${props.image_cover}`}
          alt={props.name}
        />
      </div>
      <h3 className="headingTertiary">
        <span>{props.name}</span>
      </h3>
    </div>
  );
};
export default TourItemHeader;
