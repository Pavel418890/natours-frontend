import classes from "./TourItemContent.module.css";
import SvgGenerator from "../../../../components/UI/SvgGenerator";
import { FC } from "react";

import { Tour } from "../../tourSlice";

export type TourItemContentProp = Pick<
  Tour,
  | "duration"
  | "difficulty"
  | "summary"
  | "max_group_size"
  | "locations"
  | "start_locations"
  | "start_dates"
>;

const TourItemContent: FC<TourItemContentProp> = (props) => {
  return (
    <div className={classes.details}>
      <h4 className={classes.subHeading}>
        {props.difficulty} {props.duration}-day Tour
      </h4>
      <p className={classes.text}>{props.summary}</p>
      <div className={classes.data}>
        <div className={classes.icon}>
          <SvgGenerator name={"pin"} />
        </div>
        <span>{props.start_locations[0].name}</span>
      </div>
      <div className={classes.data}>
        <div className={classes.icon}>
          <SvgGenerator name={"calendar"} />
        </div>
        <span>
          {new Date(props.start_dates[0].start_date).toLocaleString("en-us", {
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <div className={classes.data}>
        <div className={classes.icon}>
          <SvgGenerator name={"flag"} />
        </div>
        <span>{props.locations.length} stops</span>
      </div>
      <div className={classes.data}>
        <div className={classes.icon}>
          <SvgGenerator name={"userIcon"} />
        </div>
        <span>{props.max_group_size} people</span>
      </div>
    </div>
  );
};

export default TourItemContent;
