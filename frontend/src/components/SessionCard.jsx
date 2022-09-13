import React from "react";
import Table from "./Table";
// import Recovery from "./Recovery";

const SessionCard = () => {
  return (
    <div className="flex flex-col my-4 justify-between ">
      <div className="w-full bg-gray-300 p-4 rounded-md">
        <h1 className="text-sm sm:text-lg font-medium ml-1 mb-1">Session 99</h1>
        <Table />
        <Buttons />
      </div>
    </div>
  );
};

export const Buttons = () => {
  return (
    <div className="flex flex-col xxxs:flex-row xxxs:justify-between p-4 -mx-2  ">
      <button className="my-4 shadow-md sm:my-0 px-5 transition ease-in-out hover:scale-110   text-sm  py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100">
        Progress
      </button>
      <button className="my-4 shadow-md sm:my-0 transition ease-in-out hover:scale-110  px-5 text-sm py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100">
        Download
      </button>
    </div>
  );
};

export default SessionCard;
