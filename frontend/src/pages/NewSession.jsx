import React, { useEffect } from "react";
import Nav from "../components/Nav";
import { HomeIcon, TimerIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import Timer from "../components/Timer";

const NewSession = () => {
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

  useEffect(() => {
    document.title = "New session";
  }, []);

  return (
    <section className="h-full flex bg-[#cfece8]">
      <Nav navItems={navForPatient} />
      <Timer timeInSeconds={20} />
    </section>
  );
};

export default NewSession;
