import React, { useState } from "react";
export const GameNameContext = React.createContext();

function UserContextProvider(props) {
  const [game, setGame] = useState("");

  const nameHandler = (name) => {
    setGame(game);
  };

  return (
    <GameNameContext.Provider value={{ game, nameHandler }}>
      {props.children}
    </GameNameContext.Provider>
  );
}

export default UserContextProvider;
