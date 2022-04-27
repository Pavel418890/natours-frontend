import InputElement from './InputElement';

const NameInputField: React.FC<{
  changeEventHandler: React.ChangeEventHandler;
  optionalPlaceholder?: string;
  id: string;
  label: string;
}> = (props) => {
  return (
    <InputElement
      placeholder={props.optionalPlaceholder}
      type='text'
      id={props.id}
      required={true}
      changeEventHandler={props.changeEventHandler}
      labelText={props.label}
    />
  );
};

export default NameInputField;
