import React, { useEffect } from "react";
import Nav from "../components/Nav";
import GameDetails from "./../components/GameDetails";

const Game = () => {
  useEffect(() => {
    document.title = "Game Details";
  }, []);

  return (
    <section className="h-full flex bg-[#cfece8] ">
      <Nav />
      <GameDetails />
    </section>
  );
};

export default Game;
