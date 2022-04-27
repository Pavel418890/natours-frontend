import React from 'react';

import InputElement from './InputElement';

const EmailInputField: React.FC<{
  changeEventHandler: React.ChangeEventHandler;
  optionalPlaceholder?: string;
}> = (props) => {
  return (
    <InputElement
      changeEventHandler={props.changeEventHandler}
      type={'email'}
      id={'email'}
      required={true}
      placeholder={
        props.optionalPlaceholder
          ? props.optionalPlaceholder
          : 'your@example.com'
      }
      minLength={8}
      labelText={'Your Email'}
    />
  );
};

export default EmailInputField;
