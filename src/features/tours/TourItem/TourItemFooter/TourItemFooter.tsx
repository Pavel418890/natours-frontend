import { FC, MouseEventHandler, MouseEvent } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./TourItemFooter.module.css";
import { Tour } from "../../tourSlice";
import SubmitButton from "../../../../components/UI/SubmitButton";

export type TourItemFooterProp = Pick<
  Tour,
  "slug" | "ratings_avg" | "ratings_quantity" | "price" | "discount_price"
>;

const TourItemFooter: FC<TourItemFooterProp> = (props) => {
  return (
    <div className={styles.footer}>
      <p>
        <span className={styles.value}>${props.price}</span>
        <span className={styles.text}> per person</span>
      </p>
      <p className={styles.ratings}>
        <span className={styles.value}>{props.ratings_avg}</span>
        <span className={styles.text}> ratings({props.ratings_quantity})</span>
      </p>

      <Link to={`/tours/${props.slug}`} key={props.slug}>
        <SubmitButton
          type={"button"}
          innerText={"Details"}
          styleClasses={["btn", "btnGreen", "btnSmall"]}
          onClick={undefined}
        />
      </Link>
    </div>
  );
};
export default TourItemFooter;
