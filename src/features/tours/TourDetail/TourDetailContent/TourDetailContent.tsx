import React from "react";

import TourDetailDescription from "./TourDetailDescription/TourDetailDescription";
import TourDetailPictures from "./TourDetailPictures/TourDetailPictures";
import TourDetailReviews from "./TourDetailReviews/TourDetailReviews";
import Map from "../../../../components/Layout/Map";
import type { TourDetailDescriptionProps } from "./TourDetailDescription/TourDetailDescription";
import type { TourDetailPicturesProps } from "./TourDetailPictures/TourDetailPictures";
import type { Tour } from "../../tourSlice";

export interface TourDetailContentProps
  extends TourDetailPicturesProps,
    TourDetailDescriptionProps,
    Pick<Tour, "locations" | "reviews"> {}

const TourDetailContent: React.FC<TourDetailContentProps> = ({
  start_dates,
  max_group_size,
  difficulty,
  ratings_avg,
  guides,
  description,
  name,
  images,
  locations,
  reviews,
}) => {
  return (
    <React.Fragment>
      <TourDetailDescription
        start_dates={start_dates}
        difficulty={difficulty}
        ratings_avg={ratings_avg}
        max_group_size={max_group_size}
        guides={guides}
        description={description}
        name={name}
      />
      <TourDetailPictures images={images} name={name} />
      <Map locations={locations} />
      <TourDetailReviews reviews={reviews} />
    </React.Fragment>
  );
};
export default TourDetailContent;
