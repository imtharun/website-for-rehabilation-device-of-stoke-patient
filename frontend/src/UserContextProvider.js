import React, { useState } from "react";
export const UserTypeContext = React.createContext();

function UserContextProvider(props) {
  const user = document.cookie.split("=")[1];

  const [userType, setUserType] = useState(user);
  const [isUserPersistent, setIsUserPersistent] = useState(false);
  // if (user) {
  //   setUserType(user);
  // }

  const persistentHandler = (flag) => {
    setIsUserPersistent(flag);
  };

  const userHandler = (user) => {
    setUserType(user);
  };
  return (
    <UserTypeContext.Provider
      value={{ userType, userHandler, isUserPersistent, persistentHandler }}
    >
      {props.children}
    </UserTypeContext.Provider>
  );
}

export default UserContextProvider;
