import React from 'react';

import { useGetCustomerBookingsQuery } from '../../../app/services/bookings';
import { useAppDispatch } from '../../../app/hooks';
import styles from '../../tours/ToursOverview.module.css';
import TourItem from '../../tours/TourItem/TourItem';
import { FetchBaseQueryError, QueryStatus } from '@reduxjs/toolkit/query';
import { setBookings } from './bookingSlice';
import { hideNotification, showNotification } from '../../ui/uiSlice';

const CustomerBookings: React.FC = () => {
  const {
    data: bookings = [],
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetCustomerBookingsQuery();
  const dispatch = useAppDispatch();
  let err = error as FetchBaseQueryError;
  React.useEffect(() => {
    isLoading && dispatch(showNotification({ status: QueryStatus.pending }));
    isSuccess &&
      dispatch(setBookings(bookings)) &&
      dispatch(hideNotification());
    isError &&
      dispatch(
        showNotification({
          status: QueryStatus.rejected,
          title: err.status,
          message: JSON.stringify(err.data),
        })
      );
  }, [isSuccess, isError, dispatch]);

  return (
    <div className={styles.container}>
      {bookings.map((booking) => (
        <TourItem key={booking.id} tour={booking.tour} />
      ))}
    </div>
  );
};
export default CustomerBookings;
