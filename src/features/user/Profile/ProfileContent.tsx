import React, { FormEvent } from 'react';

import styles from './Profile.module.css';
import HeadingSecondary from '../../../components/UI/HeadingSecondary';
import NameInputField from '../../../components/UI/NameInputField';
import SubmitButton from '../../../components/UI/SubmitButton';
import { formChangeHandler } from '../../../utils/utils';
import { selectCurrentUser, User, userActions } from '../userSlice';
import {
  useUpdateUserProfileMutation,
  useUpdateUserPhotoMutation,
} from '../../../app/services/users';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { showNotification } from '../../ui/uiSlice';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import PhotoUploadField from './PhotoUploadField';

const ProfileContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [userProfileFormState, setUserProfileFormState] = React.useState(null);
  const [
    updateUserProfile,
    { data: changedProfile, error, isError, isLoading, isSuccess },
  ] = useUpdateUserProfileMutation();
  let err = error as FetchBaseQueryError;

  const enteredUserProfileDataHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => formChangeHandler(event, setUserProfileFormState);

  React.useEffect(() => {
    isLoading && dispatch(showNotification({ status: QueryStatus.pending }));
    isSuccess &&
      dispatch(
        showNotification({
          status: QueryStatus.fulfilled,
          title: 'Success',
          message: 'Profile was updated successfully!',
        })
      ) &&
      dispatch(userActions.updateUserProfile(changedProfile));
    isError &&
      dispatch(
        showNotification({
          status: QueryStatus.rejected,
          title: err.status,
          message: JSON.stringify(err.data),
        })
      );
  }, [dispatch, isError, isSuccess, isLoading]);

  const submitUpdateUserProfileHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    await updateUserProfile(userProfileFormState);
  };

  if (user)
    return (
      <div className={styles.formContainer}>
        <HeadingSecondary innerText='Your account settings' />
        <form className={styles.formUserData}>
          <NameInputField
            optionalPlaceholder={user.profile.first_name}
            id={'first_name'}
            changeEventHandler={enteredUserProfileDataHandler}
            label='Your First Name'
          />
          <NameInputField
            optionalPlaceholder={user.profile.last_name}
            id={'last_name'}
            changeEventHandler={enteredUserProfileDataHandler}
            label='Your Last Name'
          />
          <PhotoUploadField />
          <div className={styles.right}>
            <SubmitButton
              innerText='Save Settings'
              onClick={submitUpdateUserProfileHandler}
              type='submit'
              styleClasses={['btn', 'btnGreen', 'btnSmall']}
            />
          </div>
        </form>
      </div>
    );
  else return <div />;
};

export default ProfileContent;
