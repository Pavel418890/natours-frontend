import React, { useEffect } from 'react';

import { setTours, Tour } from './tourSlice';
import styles from './ToursOverview.module.css';
import TourItem from './TourItem/TourItem';
import { useAppDispatch } from '../../app/hooks';
import { useGetAllToursQuery } from '../../app/services/tours';
import { hideNotification, showNotification } from '../ui/uiSlice';
import { FetchBaseQueryError, QueryStatus } from '@reduxjs/toolkit/query';

const ToursOverview: React.FC = () => {
  const {
    data: tours = [],
    error,
    isSuccess,
    isLoading,
    isError,
  } = useGetAllToursQuery();
  const dispatch = useAppDispatch();
  let err = error as FetchBaseQueryError;
  useEffect(() => {
    isLoading && dispatch(showNotification({ status: QueryStatus.pending }));
    isSuccess && dispatch(setTours(tours)) && dispatch(hideNotification());
    isError &&
      dispatch(
        showNotification({
          status: QueryStatus.rejected,
          title: err.status,
          message: JSON.stringify(err.data),
        })
      );
  }, [isSuccess, isLoading, isError, dispatch]);

  return (
    <div className={styles.container}>
      {tours.map((tour) => (
        <TourItem key={tour.id} tour={tour} />
      ))}
    </div>
  );
};
export default ToursOverview;
