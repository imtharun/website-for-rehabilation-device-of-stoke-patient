import React, { useEffect, useContext } from "react";
import Nav from "../components/Nav";
import GameDetails from "./../components/GameDetails";
import { useNavigate } from "react-router-dom";
import { HomeIcon, TimerIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { UserTypeContext } from "../UserContextProvider";

const Game = () => {
  const navigate = useNavigate();
  const { userType } = useContext(UserTypeContext);

  useEffect(() => {
    if (!userType) {
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate, userType]);

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
