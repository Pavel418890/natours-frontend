import React from 'react';

import type { Tour } from '../../../tourSlice';
import styles from './TourDetailReviews.module.css';
import SvgGenerator from '../../../../../components/UI/SvgGenerator';

const TourDetailReviews: React.FC<Pick<Tour, 'reviews'>> = ({ reviews }) => {
  return (
    <section className={styles.reviewsBox}>
      <div className={styles.reviews}>
        {reviews?.map((review) => (
          <div
            className={styles.card}
            key={`${review.created_at} ${review.id}`}
          >
            <div className={styles.avatarBox}>
              <img
                className={styles.avatar}
                src={`${import.meta.env.VITE_API_URL}${review.user.profile.photo}`}
                alt={review.user.profile.first_name}
              />
              <h6 className={styles.username}>
                {review.user.profile.first_name}
              </h6>
            </div>
            <p className={styles.text}>{review.review}</p>
            <div className={styles.rating}>
              {[1, 2, 3, 4, 5].map((star, i) => (
                <div className={styles.star} key={i}>
                  <SvgGenerator
                    name={review.rating >= star ? 'star' : 'starEmpty'}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default TourDetailReviews;
