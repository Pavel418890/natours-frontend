import React, { FormEvent } from "react";

import type { Tour } from "../../tourSlice";

import styles from "./TourDetailFooter.module.css";
import { dynamicStyleClassName } from "../../../../utils/utils";
import SubmitButton from "../../../../components/UI/SubmitButton";
import { useGetCheckoutSessionMutation } from "../../../../app/services/bookings";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/dist/query";
import { showNotification } from "../../../ui/uiSlice";
import { useAppDispatch } from "../../../../app/hooks";
import StripeCheckoutSessionForm from "./StripeCheckoutSessionForm";

const TourDetailFooter: React.FC<Pick<Tour, "images" | "duration" | "id">> = (
  props
) => {
  return (
    <section className={styles.footer}>
      <div className={styles.cta}>
        <div className={`${styles.images} ${styles.logo}`}>
          <img src="/logo-white.png" alt="Natours Logo" />
        </div>
        {props.images.slice(1).map((image, i) => (
          <img
            key={i}
            className={dynamicStyleClassName(styles, "image", i, ["images"])}
            src={`${import.meta.env.VITE_API_URL}${image.image}`}
            alt={`Tour Picture ${i}`}
          />
        ))}
        <StripeCheckoutSessionForm duration={props.duration} id={props.id} />
      </div>
    </section>
  );
};

export default TourDetailFooter;
