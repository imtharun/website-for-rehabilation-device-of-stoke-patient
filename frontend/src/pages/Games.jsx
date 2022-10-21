import React, { useEffect } from "react";
import Nav from "../components/Nav";
import GameDetails from "./../components/GameDetails";
import { HomeIcon, TimerIcon, InfoCircledIcon } from "@radix-ui/react-icons";

const Game = () => {
  useEffect(() => {
    document.title = "Game Details";
  }, []);

  const navForPatient = [
    {
      name: "Home",
      link: "/",
      iconComponent: <HomeIcon className="w-5 h-5 mx-auto sm:mx-0 sm:ml-1" />,
    },
    {
      name: "New Session",
      link: "/new-session",
      iconComponent: <TimerIcon className="w-5 h-5 mx-auto sm:mx-0 sm:ml-1" />,
    },
    {
      name: "Game Details",
      link: "/game-details",
      iconComponent: (
        <InfoCircledIcon className="w-5 h-5 mx-auto sm:mx-0 sm:ml-1 " />
      ),
    },
  ];

  return (
    <section className="h-full flex bg-[#cfece8] ">
      <Nav navItems={navForPatient} />
      <GameDetails />
    </section>
  );
};

export default Game;
