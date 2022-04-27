import React from "react";

import HeadingSecondary from "../../../../../components/UI/HeadingSecondary";
import styles from "./TourDetailDescription.module.css";
import TourDetailOverview from "./OverviewDetail";
import type { Tour } from "../../../tourSlice";
import { Role } from "../../../../user/userSlice";
import OverviewDetail from "./OverviewDetail";

export type TourDetailDescriptionProps = Pick<
  Tour,
  | "start_dates"
  | "difficulty"
  | "max_group_size"
  | "ratings_avg"
  | "guides"
  | "name"
  | "description"
>;

const TourDetailDescription: React.FC<TourDetailDescriptionProps> = ({
  description,
  name,
  guides,
  start_dates,
  difficulty,
  max_group_size,
  ratings_avg,
}) => {
  const rawDate = new Date(start_dates[0].start_date);
  const date = rawDate.toLocaleString("en-us", {
    month: "long",
    year: "numeric",
  });
  const paragraph = description.split("\n");
  return (
    <section className={styles.description}>
      <div className={styles.overviewBox}>
        <div>
          <div className={styles.group}>
            <HeadingSecondary innerText={"Quick facts"} />
            <OverviewDetail
              label={"Next Date"}
              value={date}
              icon={"calendar"}
            />
            <OverviewDetail
              label={"Difficulty"}
              value={difficulty}
              icon={"chartLine"}
            />
            <OverviewDetail
              label={"Participants"}
              value={`${max_group_size} people`}
              icon={"userIcon"}
            />
            <OverviewDetail
              label={"Rating"}
              value={`${ratings_avg} / 5`}
              icon={"star"}
            />
          </div>
          <div className={styles.group}>
            <HeadingSecondary innerText="Your tour guides" />
            {guides?.map((guide) => (
              <div className={styles.boxDetail} key={guide.id}>
                <img
                  className={styles.image}
                  src={`${import.meta.env.VITE_API_URL}${guide.profile.photo}`}
                  alt={`${guide.profile.first_name} ${guide.profile.last_name}`}
                />
                <span className={styles.label}>
                  {guide.role === Role.leadGuide ? "Lead Guide" : "Tour Guide"}
                </span>
                <span
                  className={styles.value}
                >{`${guide.profile.first_name} ${guide.profile.last_name}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.descriptionBox}>
        <HeadingSecondary innerText={`About ${name} tour`} />
        {paragraph.map((p, i) => (
          <p key={i} className={styles.text}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
};
export default TourDetailDescription;
