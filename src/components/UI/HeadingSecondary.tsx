import React from "react";

import styles from "./HeadingSecondary.module.css";

export interface HeadingSecondaryProps {
  innerText: string;
  isError?: boolean;
}

const HeadingSecondary: React.FC<HeadingSecondaryProps> = (props) => {
  return <h2 className={styles.headingSecondary}>{props.innerText}</h2>;
};

export default HeadingSecondary;
