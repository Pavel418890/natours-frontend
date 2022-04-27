import React from "react";

import styles from "./PhotoUploadField.module.css";
import { useUpdateUserPhotoMutation } from "../../../app/services/users";
import { selectCurrentUser } from "../userSlice";
import { showNotification } from "../../ui/uiSlice";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { userActions } from "../userSlice";

const PhotoUploadField: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const [
    updateUserPhoto,
    { data: uploadedUserPhoto, error, isError, isLoading, isSuccess },
  ] = useUpdateUserPhotoMutation();
  let err = error as FetchBaseQueryError;

  React.useEffect(() => {
    isLoading && dispatch(showNotification({ status: QueryStatus.pending }));
    isSuccess &&
      dispatch(userActions.updateUserPhoto(uploadedUserPhoto)) &&
      dispatch(
        showNotification({
          status: QueryStatus.fulfilled,
          title: "Success",
          message: "Photo was updated successfully",
        })
      );
    isError &&
      dispatch(
        showNotification({
          status: QueryStatus.rejected,
          title: err.status,
          message: JSON.stringify(err.data),
        })
      );
  }, [isError, isLoading, isSuccess, dispatch]);

  const uploadUserPhotoHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (!event.target.files) return;
    const customForm = new FormData();
    customForm.append(event.target.name, event.target.files[0]);
    await updateUserPhoto(customForm);
  };

  return (
    <div className={styles.photoUpload}>
      <img
        className={styles.userPhoto}
        src={`${import.meta.env.VITE_API_URL}${user!.profile.photo}`}
        alt={"uploaded-photo"}
      />
      <input
        id={"photo"}
        name={"photo"}
        onChange={uploadUserPhotoHandler}
        className={styles.upload}
        type="file"
        accept={"image/*"}
      />
      <label htmlFor={"photo"}>Choose new photo</label>
    </div>
  );
};

export default PhotoUploadField;
