import React from "react";
import Nav from "../components/Nav";
import { HomeIcon, AvatarIcon } from "@radix-ui/react-icons";
import CaretakerDashboard from "../components/CaretakerDashboard";

export const CaretakerHome = () => {
  const navForCaretakers = [
    {
      name: "Home",
      link: "/",
      iconComponent: <HomeIcon className="w-5 h-5 mx-auto sm:mx-0 sm:ml-1" />,
    },
    {
      name: "Manage Patients",
      link: "/manage-patients",
      iconComponent: <AvatarIcon className="w-5 h-5 mx-auto sm:mx-0 sm:ml-1" />,
    },
  ];
  return (
    <section className="h-full flex bg-[#cfece8]">
      <Nav navItems={navForCaretakers} />
      <CaretakerDashboard />
    </section>
  );
};
