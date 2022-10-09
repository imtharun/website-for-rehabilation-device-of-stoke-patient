import React, { useEffect } from "react";
import Nav from "../components/Nav";
import PatientDashboard from "../components/PatientDashboard";
import { HomeIcon, TimerIcon, InfoCircledIcon } from "@radix-ui/react-icons";

const PatientHome = () => {
  useEffect(() => {
    document.title = "Home";
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
      <PatientDashboard />
    </section>
  );
};

export default PatientHome;
