import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "../components/Nav";
import Home from "../components/Home";
import Timer from "../components/Timer";
import GameDetails from "../components/GameDetails";

const DashBoard = () => {
  return (
    <section className="h-full flex bg-[#cfece8] ">
      <Nav />
      <Routes>
        <Route index path={"/"} element={<Home />} />
        <Route path="/new-session" element={<Timer timeInSeconds={9000} />} />
        <Route path="/game-details" element={<GameDetails />} />
      </Routes>
    </section>
  );
};

export default DashBoard;
