import React, { useContext, useEffect } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserTypeContext } from "../UserContextProvider";
import axios from "../api/axios";
import Cookies from "universal-cookie";

const Auth = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const checkForAuth = async () => {
    try {
      const res = await axios.get("/checklogin");
    } catch (error) {
      if (error.response.status === 401) {
        const cookies = new Cookies();
        cookies.remove("userType", { path: "/" });
        navigate(0);
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    }
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
