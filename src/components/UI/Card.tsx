import React from 'react';

import classes from './Card.module.css';

const Card: React.FC = (props) => {
  return <div className={classes.Card}>{props.children}</div>;
};
export default Card;
