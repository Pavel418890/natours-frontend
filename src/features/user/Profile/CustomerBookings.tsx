import React from "react";
import { useGetCustomerBookingsQuery } from "../../../app/services/bookings";
import styles from "../../tours/ToursOverview.module.css";
import TourItem from "../../tours/TourItem/TourItem";

const CustomerBookings: React.FC = (props) => {
  const {
    data: bookings,
    error,
    isSuccess,
    isError,
    isFetching,
  } = useGetCustomerBookingsQuery();
  return (
    <ul className={styles.container}>
      {bookings?.map((booking) => (
        <li key={booking.id}>
          <h2>{`Tour: ${booking.tour.name} Price: ${booking.price}`}</h2>
        </li>
      ))}
    </ul>
  );
};

export default CustomerBookings;
