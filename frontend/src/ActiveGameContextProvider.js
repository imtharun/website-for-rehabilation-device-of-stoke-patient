import React, { useState } from "react";
export const GameNameContext = React.createContext();

function UserContextProvider(props) {
  const [game, setGame] = useState("");
  const [start, setStart] = useState(false);
  const [ans, setAns] = useState([]);
  const [timer, setTimer] = useState(0);
  const [roms, setRoms] = useState([]);

  const nameHandler = (name) => {
    setGame(name);
  };

  const startHandler = (flag) => {
    setStart(flag);
  };

  const ansHandler = (state) => {
    setAns(state);
  };

  const romsHandler = (romsData) => {
    setRoms(romsData);
  };

  return (
    <GameNameContext.Provider
      value={{
        game,
        nameHandler,
        start,
        startHandler,
        ans,
        ansHandler,
        roms,
        romsHandler,
        timer,
        setTimer,
      }}
    >
      {props.children}
    </GameNameContext.Provider>
  );
}

export default UserContextProvider;
