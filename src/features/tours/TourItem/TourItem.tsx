import React from "react";

import Card from "../../../components/UI/Card";
import TourItemHeader from "./TourItemHeader/TourItemHeader";
import TourItemContent from "./TourItemContent/TourItemContent";
import TourItemFooter from "./TourItemFooter/TourItemFooter";

import { Tour } from "../tourSlice";

const TourItem: React.FC<{ tour: Tour }> = (props) => {
  document.title = "Natours | All Tours";

  return (
    <Card>
      <TourItemHeader
        name={props.tour.name}
        image_cover={props.tour.image_cover}
      />
      <TourItemContent
        duration={props.tour.duration}
        difficulty={props.tour.difficulty}
        summary={props.tour.summary}
        max_group_size={props.tour.max_group_size}
        start_dates={props.tour.start_dates}
        locations={props.tour.locations}
        start_locations={props.tour.start_locations}
      />
      <TourItemFooter
        slug={props.tour.slug}
        ratings_avg={props.tour.ratings_avg}
        ratings_quantity={props.tour.ratings_quantity}
        price={props.tour.price}
        discount_price={props.tour.discount_price}
      />
    </Card>
  );
};

export default TourItem;
