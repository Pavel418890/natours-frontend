import React from "react";

import type { Tour } from "../../../tourSlice";
import styles from "./TourDetailPictures.module.css";
import { dynamicStyleClassName } from "../../../../../utils/utils";

export type TourDetailPicturesProps = Pick<Tour, "images" | "name">;
const TourDetailPictures: React.FC<TourDetailPicturesProps> = ({
  images,
  name,
}) => {
  // const dynamicPictureClass = (index: number): string => {
  //   const result = `numPicture${index}`;
  //   return `${styles.pictureBox} ${styles[result]}`;
  // };
  return (
    <section className={styles.pictures}>
      {images.map((img, i) => (
        <div key={i + 1}>
          <img
            key={i}
            src={`${import.meta.env.VITE_API_URL}${img.image}`}
            alt={`${name} tour ${i + 1}`}
            className={dynamicStyleClassName(styles, "numPicture", i + 1, [
              "pictureBox",
            ])}
          />
        </div>
      ))}
    </section>
  );
};
export default TourDetailPictures;
