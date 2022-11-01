import React, { useContext, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { UserTypeContext } from "../UserContextProvider";
import axios from "../api/axios";
import Cookies from "universal-cookie";

const Auth = () => {
  let location = useLocation();
  const checkForAuth = async () => {
    try {
      const res = await axios.get("/checklogin");
      console.log(res);
      if (res.status === 401) {
        const cookies = new Cookies();
        cookies.remove("userType", { path: "/" });
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkForAuth();
  });
  const { userType } = useContext(UserTypeContext);
  if (!userType) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default Auth;
