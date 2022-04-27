import React from 'react';

import InputElement from './InputElement';

interface PasswordInputFieldProps {
  changeEventHandler: React.ChangeEventHandler;
  id: string;
  label: string;
}
const PasswordInputField: React.FC<PasswordInputFieldProps> = (props) => {
  return (
    <InputElement
      changeEventHandler={props.changeEventHandler}
      type='password'
      id={props.id}
      placeholder={'•••••••'}
      minLength={8}
      required={true}
      labelText={props.label}
    />
  );
};

export default PasswordInputField;
