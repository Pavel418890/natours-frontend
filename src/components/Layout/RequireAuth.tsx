import React from "react";
import { useLocation, Navigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/user/userSlice";

const RequireAuth = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element | null => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location.state }} />;
  }
  return children;
};

export default RequireAuth;
