import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  CalendarIcon,
  ClockIcon,
  ArrowTopRightIcon,
} from "@radix-ui/react-icons";
import Card from "./Card";
import Recovery from "./Recovery";
import DefaultProfilePic from "./../assets/default-profile-pic.png";

const Sections = () => {
  const [date, setDate] = useState(new Date());

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
  ];

  const dataSetter = () => {
    setInterval(() => setDate(new Date()), 1000);
  };

  useEffect(() => {
    dataSetter();
  }, []);

  return (
    <section className="rounded-tl-2xl bg-white p-3 pt-6 sm:p-4 w-full overflow-y-scroll">
      <div className="flex justify-between">
        <div className="mt-[4px]">
          <h1 className="flex items-end text-sm sm:text-lg border-b-[1.5px] border-b-black">
            <a className="flex items-center" href="/">
              Total sessions: <span className="ml-1">99</span>
              <ArrowTopRightIcon className=" sm:h-5 sm:w-5" />
            </a>
          </h1>
        </div>
        <div className="-ml-3 ">
          <h1 className="flex items-center mb-1 sm:mb-2">
            <CalendarIcon className="mr-1 h-[.90rem] w-[.90rem]  xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
            <span className="ml-1 text-sm">
              {moment(date).format("MM/DD/YY")}
            </span>
          </h1>
          <h1 className="flex items-center ">
            <ClockIcon className="mr-1 h-[.90rem] w-[.90rem] xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
            <span className="ml-1 text-sm text-right">
              {moment(date).format("LT")}
            </span>
          </h1>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between">
        <div className="mt-3 w-full">
          <h1 className="text-lg font-medium ml-1 mb-1">Progress</h1>
          <Recovery />
        </div>
        <div className="sm:ml-4 flex flex-row md:flex-col justify-between  mt-11">
          <div className="mx-auto">
            {userData.map((user) => {
              return (
                <Card
                  key={Math.random() * 100}
                  name={user.name}
                  role={user.role}
                  age={user.age}
                  address={user.address}
                  profile={user.profile ?? DefaultProfilePic}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sections;
