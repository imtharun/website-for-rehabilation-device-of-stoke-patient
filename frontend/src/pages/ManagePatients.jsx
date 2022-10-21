import React from "react";
import { HomeIcon, AvatarIcon } from "@radix-ui/react-icons";
import Nav from "../components/Nav";
import AddOrRemovePatients from "../components/AddOrRemovePatients";

const ManagePatients = () => {
  const navForDoctor = [
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
      <Nav navItems={navForDoctor} />
      <AddOrRemovePatients />
    </section>
  );
};

export default ManagePatients;
