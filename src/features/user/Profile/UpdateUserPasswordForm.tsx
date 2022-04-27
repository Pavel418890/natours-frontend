import React from 'react';
import HeadingSecondary from '../../../components/UI/HeadingSecondary';
import PasswordInputField from '../../../components/UI/PasswordInputField';
import { formChangeHandler } from '../../../utils/utils';
import styles from './Profile.module.css';
import SubmitButton from '../../../components/UI/SubmitButton';
import { useAppDispatch } from '../../../app/hooks';
import { useUpdatePasswordMutation } from '../../../app/services/users';
import { showNotification } from '../../ui/uiSlice';
import { FetchBaseQueryError, QueryStatus } from '@reduxjs/toolkit/dist/query';

const UpdateUserPasswordForm: React.FC = () => {
  const [
    updatePassword,
    { error, data: responseWithUpdatedPassword, isSuccess, isError, isLoading },
  ] = useUpdatePasswordMutation();
  let err = error as FetchBaseQueryError;
  const dispatch = useAppDispatch();

  const [userPasswordFormState, setUserPasswordFormState] =
    React.useState(null);

  const enteredUserPasswordHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => formChangeHandler(event, setUserPasswordFormState);
  React.useEffect(() => {
    isLoading && dispatch(showNotification({ status: QueryStatus.pending }));
    isSuccess &&
      dispatch(
        showNotification({
          status: QueryStatus.fulfilled,
          message: responseWithUpdatedPassword.detail,
          title: responseWithUpdatedPassword.title,
        })
      );
    isError &&
      dispatch(
        showNotification({
          status: QueryStatus.rejected,
          message: JSON.stringify(err.data),
          title: err.status,
        })
      );
  }, [dispatch, isSuccess, isError, isLoading]);

  const submitPasswordUpdateHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await updatePassword(userPasswordFormState);
  };
  return (
    <form className={styles.formContainer}>
      <HeadingSecondary innerText='Password change' />
      <PasswordInputField
        id='existing_password'
        label='Password'
        changeEventHandler={enteredUserPasswordHandler}
      />
      <PasswordInputField
        changeEventHandler={enteredUserPasswordHandler}
        id='new_password'
        label='New Password'
      />
      <div className={styles.group}>
        <div className={styles.right}>
          <SubmitButton
            type={'submit'}
            styleClasses={['btn', 'btnGreen', 'btnSmall']}
            onClick={submitPasswordUpdateHandler}
            innerText='Save settings'
          />
        </div>
      </div>
    </form>
  );
};

export default UpdateUserPasswordForm;
