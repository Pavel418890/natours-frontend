import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { showNotification } from "../ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useConfirmUserEmailAddressMutation } from "../../app/services/users";
import { selectCurrentUser } from "./userSlice";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query";

const UserEmailConfirmation: React.FC = (props) => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { emailConfirmationToken } = useParams();

  const [
    confirmUserEmailAddress,
    { data, error, isSuccess, isLoading, isError },
  ] = useConfirmUserEmailAddressMutation();
  let err = error as FetchBaseQueryError;
  React.useEffect(() => {
    isSuccess &&
      dispatch(
        showNotification({
          status: QueryStatus.fulfilled,
          title: "Success",
          message: "Your email was confirmed!",
        })
      ) &&
      navigate("/profile/");
    isError &&
      dispatch(
        showNotification({
          status: QueryStatus.rejected,
          title: err.status,
          message: JSON.stringify(err.data),
        })
      );
    confirmUserEmailAddress({
      email: user?.email,
      token: emailConfirmationToken,
    });
  }, [isLoading, isSuccess, isError]);
  return <div />;
};
export default UserEmailConfirmation;
