import React from "react";
import { QueryStatus, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

import TourDetailHeader from "./TourDetailHeader/TourDetailHeader";
import TourDetailContent from "./TourDetailContent/TourDetailContent";
import TourDetailFooter from "./TourDetailFooter/TourDetailFooter";
import { hideNotification, showNotification } from "../../ui/uiSlice";
import { useGetTourQuery } from "../../../app/services/tours";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";

const TourDetail: React.FC = () => {
  const dispatch = useAppDispatch();

  const { tourSlug } = useParams();
  const {
    data: tour,
    error,
    isFetching,
    isSuccess,
    isError,
  } = useGetTourQuery(`${tourSlug}`);
  let err = error as FetchBaseQueryError;
  isFetching
    ? dispatch(showNotification({ status: QueryStatus.pending }))
    : dispatch(hideNotification());
  isError &&
    dispatch(
      showNotification({
        status: QueryStatus.rejected,
        title: err.status,
        message: JSON.stringify(err.data),
      })
    );
  if (isSuccess && tour) {
    document.title = `Natours | ${tour.name}`;
    return (
      <React.Fragment>
        <TourDetailHeader
          image_cover={tour.image_cover}
          name={tour.name}
          start_locations={tour.start_locations}
          duration={tour.duration}
        />
        <TourDetailContent
          max_group_size={tour.max_group_size}
          ratings_avg={tour.ratings_avg}
          difficulty={tour.difficulty}
          start_dates={tour.start_dates}
          guides={tour.guides}
          name={tour.name}
          description={tour.description}
          images={tour.images}
          locations={tour.locations}
          reviews={tour.reviews}
        />
        <TourDetailFooter
          duration={tour.duration}
          id={tour.id}
          images={tour.images}
        />
      </React.Fragment>
    );
  }
  return <div />;
};

export default TourDetail;
