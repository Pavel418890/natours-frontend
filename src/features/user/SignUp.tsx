import React from 'react';
import { FetchBaseQueryError, QueryStatus } from '@reduxjs/toolkit/dist/query';
import { Link, useNavigate } from 'react-router-dom';

import styles from './User.module.css';
import { SignUpRequest, useSignUpMutation } from '../../app/services/auth';
import EmailInputField from '../../components/UI/EmailInputField';
import PasswordInputField from '../../components/UI/PasswordInputField';
import { useAppDispatch } from '../../app/hooks';
import { userActions } from './userSlice';
import { showNotification } from '../ui/uiSlice';
import HeadingSecondary from '../../components/UI/HeadingSecondary';
import SubmitButton from '../../components/UI/SubmitButton';
import { formChangeHandler } from '../../utils/utils';

const SignUpForm: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [
    signUp,
    { data: authenticatedUser, error, isSuccess, isLoading, isError },
  ] = useSignUpMutation();
  let err = error as FetchBaseQueryError;
  const [credentialsFormState, setCredentialsFormState] =
    React.useState<SignUpRequest>({
      email: '',
      password: '',
      password_confirm: '',
    });

  const enteredNewUserCredentialsHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => formChangeHandler(event, setCredentialsFormState);
  React.useEffect(() => {
    isLoading && showNotification({ status: QueryStatus.pending });
    isSuccess &&
      dispatch(
        showNotification({
          status: QueryStatus.fulfilled,
          title: 'Welcome to Natours Family',
          message: 'Please confirm your email address',
        })
      ) &&
      dispatch(userActions.setUser(authenticatedUser)) &&
      navigate('/profile/');
    isError &&
      dispatch(
        showNotification({
          status: QueryStatus.rejected,
          message: JSON.stringify(err.data),
          title: `Error ${err.status} 😢🤯`,
        })
      );
  }, [dispatch, isError, isLoading, isSuccess]);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await signUp(credentialsFormState);
  };
  return (
    <section className={styles.auth}>
      <HeadingSecondary innerText='Sign Up to Natours Family' />
      <form className={`${styles.form} ${styles.authForm}`}>
        <EmailInputField
          changeEventHandler={enteredNewUserCredentialsHandler}
        />
        <PasswordInputField
          id='password'
          label='Password'
          changeEventHandler={enteredNewUserCredentialsHandler}
        />
        <PasswordInputField
          id='password_confirm'
          label='Password Confirm'
          changeEventHandler={enteredNewUserCredentialsHandler}
        />
        <SubmitButton
          type='submit'
          styleClasses={['btn', 'btnGreen']}
          onClick={submitHandler}
          innerText={isLoading ? 'Loading...' : 'Sign Up'}
        />
      </form>
      <Link className={styles.toggle} to='/signin/'>
        Log in with existing account
      </Link>
    </section>
  );
};
export default SignUpForm;
