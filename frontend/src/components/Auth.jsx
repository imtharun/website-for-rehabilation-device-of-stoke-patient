import React, { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { UserTypeContext } from "../UserContextProvider";

const Auth = () => {
  let location = useLocation();
  const { userType } = useContext(UserTypeContext);
  if (!userType) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default Auth;
