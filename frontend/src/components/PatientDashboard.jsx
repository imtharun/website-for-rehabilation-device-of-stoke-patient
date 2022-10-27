import React, { useEffect, useState } from "react";
import moment from "moment";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import Card from "./Card";
import DefaultProfilePic from "./../assets/default-profile-pic.png";
import SessionCard from "./SessionCard";

const PatientDashboard = () => {
  return (
    <section className="rounded-tl-2xl bg-white p-3 pt-6 sm:p-4 w-full overflow-y-scroll">
      <div className="flex justify-between">
        <div className="mt-[4px]">
          <h1 className="flex items-end font-medium text-sm sm:text-lg">
            Total sessions: <span className="ml-1">99</span>
          </h1>
        </div>
        <TimeAndDate />
      </div>
      <div className="flex flex-col justify-around mx-auto 970:flex-col xlg:flex-row mt-2">
        <div className="">
          <SessionCard />
        </div>
        <div>
          <CardComponent />
        </div>
      </div>
    </section>
  );
};

export const TimeAndDate = () => {
  const [date, setDate] = useState(new Date());
  const dataSetter = () => {
    setInterval(() => setDate(new Date()), 1000);
  };

  useEffect(() => {
    dataSetter();
  }, []);

  return (
    <div className="flex justify-end">
      <div className="-ml-3 ">
        <h1 className="flex items-center mb-1 sm:mb-2">
          <CalendarIcon className="mr-1 h-[.90rem] w-[.90rem]  xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
          <span className="ml-1 text-sm">
            {moment(date).format("MM/DD/YY")}
          </span>
        </h1>
        <h1 className="flex items-center">
          <ClockIcon className="mr-1 h-[.90rem] w-[.90rem] xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
          <span className="ml-1 text-sm text-right">
            {moment(date).format("LT")}
          </span>
        </h1>
      </div>
    </div>
  );
};

const CardComponent = () => {
  const userData = [
    {
      role: "Patient",
      name: "Jack Dane",
      age: 79,
      address: "600 Pennsylvania Avenue NW, Washington, LA, TN",
    },
    {
      role: "Care taker",
      name: "Jack Dane",
      age: 79,
      address: "600 Pennsylvania Avenue NW, Washington, LA, TN",
    },
    {
      role: "Care taker",
      name: "Jack Dane",
      age: 79,
      address: "600 Pennsylvania Avenue NW, Washington, LA, TN",
    },
    {
      role: "Care taker",
      name: "Jack Dane",
      age: 79,
      address: "600 Pennsylvania Avenue NW, Washington, LA, TN",
    },
  ];
  return (
    <div className="mt-[0.75rem] mx-auto justify-center flex flex-col items-center forCard:flex-row forCard:justify-center forCard:flex-wrap 970:flex-row 970:flex-wrap">
      {userData.map((user, index) => {
        return (
          <Card
            key={index + 1}
            name={user.name}
            role={user.role}
            age={user.age}
            address={user.address}
            profile={user.profile ?? DefaultProfilePic}
          />
        );
      })}
    </div>
  );
};

export default PatientDashboard;
