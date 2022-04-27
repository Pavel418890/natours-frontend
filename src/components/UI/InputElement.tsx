import React, { ChangeEventHandler } from "react";
import styles from "./InputElement.module.css";

export interface InputElementProps {
  changeEventHandler: ChangeEventHandler;
  placeholder?: string;
  type: string;
  id: string;
  minLength?: number;
  required?: boolean;
  accept?: string;
  labelText: string;
}
const InputElement: React.FC<InputElementProps> = (props) => {
  return (
    <div className={styles.group}>
      <input
        onChange={props.changeEventHandler}
        className={styles.input}
        placeholder={props.placeholder ? props.placeholder : undefined}
        id={props.id}
        name={props.id}
        type={props.type}
        minLength={props.minLength ? props.minLength : undefined}
        required={props.required}
        accept={props.accept ? props.accept : undefined}
      />
      <label className={styles.label} htmlFor={props.id}>
        {props.labelText}
      </label>
    </div>
  );
};

export default InputElement;
