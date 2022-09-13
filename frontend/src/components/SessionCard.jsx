import React from "react";
import Table from "./Table";
import Card from "./Card";
// import Recovery from "./Recovery";
import DefaultProfilePic from "./../assets/default-profile-pic.png";

const SessionCard = () => {
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

  return (
    <div className="flex flex-col 970:flex-row justify-between">
      <div className="w-full">
        <h1 className="text-lg font-medium ml-1 mb-1">Session 99</h1>
        {/* <Recovery />   */}
        <Table />
        <div className="flex justify-between p-4">
          <div>
            <button className=" transition ease-in-out hover:scale-110 bg-gray-300 px-5 text-sm py-3 rounded-full">
              To see Progress
            </button>
          </div>
          <div>
            <button className="transition ease-in-out hover:scale-110 bg-gray-300 px-5 text-sm py-3 rounded-full">
              For entire dataset
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[2.5rem] 970:mt-[3.5rem] mx-auto flex justify-around flex-row 970:flex-col">
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
    </div>
  );
};

export default SessionCard;
