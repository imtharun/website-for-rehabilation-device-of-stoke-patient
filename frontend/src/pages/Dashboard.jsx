import React from "react";
import Nav from "../components/Nav";
// import Home from "../components/Home";
import GameDetails from "../components/GameDetails";

const DashBoard = () => {
  return (
    <section className="h-full flex bg-[#cfece8]">
      <Nav />
      <GameDetails />
    </section>
  );
};

export default DashBoard;
