import React from "react";
import Nav from "../components/Nav";
import Home from "../components/Home";
import Timer from "../components/Timer";
import moment from "moment";
import GameDetails from "../components/GameDetails";

const DashBoard = () => {
  return (
    <section className="h-full flex bg-[#cfece8]">
      <Nav />
      {/* <GameDetails /> */}
      {/* <Home /> */}
      <Timer timeInSeconds={moment.s}
      />
    </section>
  );
};

export default DashBoard;
