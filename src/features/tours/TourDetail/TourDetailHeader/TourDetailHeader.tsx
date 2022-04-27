import { FC } from "react";

import { Tour } from "../../tourSlice";
import styles from "./TourDetailHeader.module.css";
import SvgGenerator from "../../../../components/UI/SvgGenerator";

type TourDetailHeaderProps = Pick<
  Tour,
  "name" | "image_cover" | "duration" | "start_locations"
>;

const TourDetailHeader: FC<TourDetailHeaderProps> = (props) => {
  return (
    <section className={styles.header}>
      <div className={styles.hero}>
        <div className={styles.overlay}>&nbsp;</div>
        <img
          className={styles.image}
          src={`${import.meta.env.VITE_API_URL}${props.image_cover}`}
          alt="image"
        />
      </div>
      <div className={styles.box}>
        <h1 className={"headingPrimary"}>
          <span>{`${props.name} tour`}</span>
        </h1>
        <div className={styles.group}>
          <div className={styles.detail}>
            <div className={styles.icon}>
              <SvgGenerator name="clock" />
            </div>
            <span>{`${props.duration} days`}</span>
          </div>
          <div className={styles.detail}>
            <div className={styles.icon}>
              <SvgGenerator name="pin" />
            </div>
            <span>{`${props.start_locations[0].name} days`}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourDetailHeader;
