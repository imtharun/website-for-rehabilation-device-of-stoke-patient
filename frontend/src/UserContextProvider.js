import React, { useState } from "react";
export const UserTypeContext = React.createContext();

function UserContextProvider(props) {
  const user = document.cookie.split("=")[1];
  const [sessions, setSessions] = useState(0);

  const [userType, setUserType] = useState(user);

  const userHandler = (user) => {
    setUserType(user);
  };

  const sessionHandler = (session) => {
    setSessions(session);
  };

  return (
    <UserTypeContext.Provider
      value={{ userType, userHandler, sessions, sessionHandler }}
    >
      {props.children}
    </UserTypeContext.Provider>
  );
}

export default UserContextProvider;
