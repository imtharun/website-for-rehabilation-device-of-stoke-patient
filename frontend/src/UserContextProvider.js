import React, { useState } from "react";
export const UserTypeContext = React.createContext();

function UserContextProvider(props) {
  const user = document.cookie.split("=")[1];

  const [userType, setUserType] = useState(user);

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
