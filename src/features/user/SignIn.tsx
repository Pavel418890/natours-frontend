import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FetchBaseQueryError, QueryStatus } from '@reduxjs/toolkit/dist/query';

import type { SignInRequest } from '../../app/services/auth';

import { userActions, selectCurrentUser } from './userSlice';
import EmailInputField from '../../components/UI/EmailInputField';
import PasswordInputField from '../../components/UI/PasswordInputField';
import SubmitButton from '../../components/UI/SubmitButton';
import { showNotification } from '../ui/uiSlice';
import styles from './User.module.css';
import { useAppDispatch } from '../../app/hooks';
import { useSignInMutation } from '../../app/services/auth';
import HeadingSecondary from '../../components/UI/HeadingSecondary';
import { formChangeHandler } from '../../utils/utils';

const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [
    signIn,
    { data: authenticatedUser, error, isSuccess, isError, isLoading },
  ] = useSignInMutation();
  let err = error as FetchBaseQueryError;
  const [enteredCredentialsFormState, setEnteredCredentialsFormState] =
    React.useState<SignInRequest>({ email: '', password: '' });

  const enteredDataHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    formChangeHandler(event, setEnteredCredentialsFormState);

  React.useEffect(() => {
    isLoading && dispatch(showNotification({ status: QueryStatus.pending }));
    isSuccess &&
      dispatch(userActions.setUser(authenticatedUser)) &&
      navigate(from, { replace: true });
    isError &&
      dispatch(
        showNotification({
          status: QueryStatus.rejected,
          title: JSON.stringify(err.status),
          message: JSON.stringify(err.data),
        })
      );
  }, [dispatch, isSuccess, isError, isLoading, dispatch]);

  const submitSignInHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await signIn(enteredCredentialsFormState);
  };

  return (
    <section className={styles.auth}>
      <HeadingSecondary innerText='Log into your account' />
      <form className={`${styles.form} ${styles.authForm}`}>
        <EmailInputField changeEventHandler={enteredDataHandler} />
        <PasswordInputField
          id='password'
          label='Password'
          changeEventHandler={enteredDataHandler}
        />
        <SubmitButton
          onClick={submitSignInHandler}
          type='submit'
          styleClasses={['btn', 'btnGreen']}
          innerText={isLoading ? 'Loading...' : 'Sign In'}
        />
      </form>
      <Link className={styles.toggle} to='/signup/'>
        Create New Account
      </Link>
    </section>
  );
};
export default SignInForm;
