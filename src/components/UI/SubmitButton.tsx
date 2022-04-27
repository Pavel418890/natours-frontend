import React from 'react';

import { dynamicStyleClassName } from '../../utils/utils';
import styles from './SubmitButton.module.css';

export interface SubmitButtonProps {
  onClick?: React.MouseEventHandler;
  innerText: string;
  styleClasses: string[];
  type: 'submit' | 'reset' | 'button';
}
const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return (
    <button
      id='button'
      type={props.type}
      className={dynamicStyleClassName(styles, '', '', props.styleClasses)}
      onClick={props.onClick}
    >
      {props.innerText}
    </button>
  );
};
export default SubmitButton;
