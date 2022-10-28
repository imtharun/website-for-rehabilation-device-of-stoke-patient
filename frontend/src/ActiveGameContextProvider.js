import React, { useState } from "react";
export const GameNameContext = React.createContext();

function UserContextProvider(props) {
  const [game, setGame] = useState("");
  const [start, setStart] = useState(false);

  const nameHandler = (name) => {
    setGame(name);
  };

  const startHandler = (flag) => {
    setStart(flag);
  };

  return (
    <GameNameContext.Provider
      value={{ game, nameHandler, start, startHandler }}
    >
      {props.children}
    </GameNameContext.Provider>
  );
}

export default UserContextProvider;
