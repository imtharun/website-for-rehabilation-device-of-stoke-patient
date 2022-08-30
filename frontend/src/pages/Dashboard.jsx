import React from "react";
import Nav from "../components/Nav";
// import Home from "../components/Home";
import Timer from "../components/Timer";
// import GameDetails from "../components/GameDetails";

const DashBoard = () => {
  return (
    <section className="h-full flex bg-[#cfece8]">
      <Nav />
      {/* <GameDetails /> */}
      {/* <Home /> */}
      <Timer timeInSeconds={9000} />
    </section>
  );
};

export default DashBoard;
