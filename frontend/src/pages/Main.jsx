import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "../components/Nav";
import Home from "../components/Home";

const Main = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <section className="h-full flex bg-[#cfece8] ">
      <Nav />
      <Routes>
        <Route index path={"/"} element={<Home />} />
      </Routes>
    </section>
  );
};

export default Main;
