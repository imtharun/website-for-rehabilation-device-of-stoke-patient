import React, { useEffect, useState } from "react";
import axios from "./api/axios";
import { useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
export const UserTypeContext = React.createContext();

function UserContextProvider(props) {
  const navigate = useNavigate();
  const user = document.cookie.split("=")[1];
  const [userType, setUserType] = useState(user);

  const checkForAuth = async () => {
    try {
      const res = await axios.get("/checklogin");
      if (res.status === 401) {
        navigate("/login");
        const cookies = new Cookie();
        cookies.remove("userType", { path: "/" });
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkForAuth();
  });

  const userHandler = (user) => {
    setUserType(user);
  };

  return (
    <UserTypeContext.Provider value={{ userType, userHandler }}>
      {props.children}
    </UserTypeContext.Provider>
  );
}

export default UserContextProvider;
