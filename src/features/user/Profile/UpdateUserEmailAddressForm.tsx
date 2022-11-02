import React from 'react';

import EmailInputField from '../../../components/UI/EmailInputField';
import { FetchBaseQueryError, QueryStatus } from '@reduxjs/toolkit/query';
import { formChangeHandler } from '../../../utils/utils';
import { selectCurrentUser, userActions } from '../userSlice';
import { showNotification } from '../../ui/uiSlice';
import styles from './Profile.module.css';
import SubmitButton from '../../../components/UI/SubmitButton';
import HeadingSecondary from '../../../components/UI/HeadingSecondary';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useUpdateEmailAddressMutation } from '../../../app/services/users';

const UpdateUserEmailAddressForm: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [userEmailAddressForm, setUserEmailAddressForm] = React.useState({});
  const [isConfirmationSended, setIsConfirmationSended] = React.useState(false);

  const [
    updateEmailAddress,
    { data: responseWithUpdatedEmail, error, isSuccess, isError, isLoading },
  ] = useUpdateEmailAddressMutation();

  let err = error as FetchBaseQueryError;
  const enteredUserEmailDataHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => formChangeHandler(event, setUserEmailAddressForm);

  React.useEffect(() => {
    setTimeout(() => {
      setIsConfirmationSended(false);
    }, 1000 * 60);
  }, [isConfirmationSended]);

  React.useEffect(() => {
    isLoading && dispatch(showNotification({ status: QueryStatus.pending }));
    if (isSuccess) {
      dispatch(
        showNotification({
          status: QueryStatus.fulfilled,
          title: 'Success',
          message: 'Email was updated! Please confirm your new email address!',
        })
      );
      setIsConfirmationSended(true);
      dispatch(userActions.updateUserEmailAddress(responseWithUpdatedEmail));
    }

    isError &&
      dispatch(
        showNotification({
          status: QueryStatus.rejected,
          title: err.status,
          message: JSON.stringify(err.data),
        })
      );
  }, [dispatch, isLoading, isSuccess, isError, showNotification]);

  const submitUpdateEmailHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    !isConfirmationSended
      ? await updateEmailAddress(userEmailAddressForm)
      : dispatch(
          showNotification({
            status: QueryStatus.rejected,
            message:
              'You have already change email address. Please check your email or try later!',
          })
        );
  };
  return (
    <form className={styles.formContainer}>
      <HeadingSecondary innerText='Your Email Address' />
      <EmailInputField
        optionalPlaceholder={user?.email}
        changeEventHandler={enteredUserEmailDataHandler}
      />
      <div className={styles.right}>
        <SubmitButton
          type={'submit'}
          styleClasses={['btn', 'btnGreen', 'btnSmall']}
          onClick={submitUpdateEmailHandler}
          innerText='Save settings'
        />
      </div>
    </form>
  );
};

export default UpdateUserEmailAddressForm;
