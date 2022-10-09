import React from "react";
import Nav from "../components/Nav";
import { AvatarIcon, HomeIcon } from "@radix-ui/react-icons";
import DoctorDashboard from "../components/DoctorDashboard";

const DoctorHome = () => {
  const navForDoctor = [
    {
      name: "Home",
      link: "/",
      iconComponent: <HomeIcon className="w-5 h-5 mx-auto sm:mx-0 sm:ml-1" />,
    },
    {
      name: "Manage Patients",
      link: "/manage-patient",
      iconComponent: <AvatarIcon className="w-5 h-5 mx-auto sm:mx-0 sm:ml-1" />,
    },
  ];

  return (
    <section className="h-full flex bg-[#cfece8]">
      <Nav navItems={navForDoctor} />
      <DoctorDashboard />
    </section>
  );
};

export default DoctorHome;
