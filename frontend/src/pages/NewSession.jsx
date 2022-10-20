import React, { useEffect, useContext } from "react";
import Nav from "../components/Nav";
import { UserTypeContext } from "../UserContextProvider";
import { HomeIcon, TimerIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";

const NewSession = () => {
  const { userType } = useContext(UserTypeContext);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!userType) {
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate, userType]);

  return (
    <section className="h-full flex bg-[#cfece8]">
      <Nav navItems={navForPatient} />
      <Timer timeInSeconds={100} />
    </section>
  );
};

export default NewSession;
