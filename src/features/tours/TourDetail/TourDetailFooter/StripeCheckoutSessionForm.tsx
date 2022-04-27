import styles from "./TourDetailFooter.module.css";
import SubmitButton from "../../../../components/UI/SubmitButton";
import React, { FormEvent } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { useGetCheckoutSessionMutation } from "../../../../app/services/bookings";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query";
import { showNotification } from "../../../ui/uiSlice";
import { Tour } from "../../tourSlice";
import HeadingSecondary from "../../../../components/UI/HeadingSecondary";

const StripeCheckoutSessionForm: React.FC<Pick<Tour, "id" | "duration">> = (
  props
) => {
  const dispatch = useAppDispatch();
  const [
    getCheckoutSession,
    { data: stripeCheckoutSession, error, isLoading, isSuccess, isError },
  ] = useGetCheckoutSessionMutation();

  React.useEffect(() => {
    let err = error as FetchBaseQueryError;
    isSuccess && window.location.assign(stripeCheckoutSession!.url);
    isError &&
      dispatch(
        showNotification({
          status: QueryStatus.rejected,
          title: err.status,
          message: JSON.stringify(err.data),
        })
      );
  });

  const submitCheckoutSession = (event: FormEvent) => {
    event.preventDefault();
    getCheckoutSession(props.id);
  };

  return (
    <form onSubmit={submitCheckoutSession} className={styles.content}>
      <HeadingSecondary innerText={`What are you waiting for?!`} />
      <p
        className={styles.text}
      >{`${props.duration} days. 1 adventure. Infinite memories. Make it yours today!`}</p>
      <SubmitButton
        styleClasses={["btn", "btnGreen", "spanAllRows"]}
        innerText={isLoading ? "Processing..." : "Book Tour Now!"}
        type={"submit"}
      />
    </form>
  );
};

export default StripeCheckoutSessionForm;
