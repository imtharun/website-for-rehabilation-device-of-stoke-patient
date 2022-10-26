import React from "react";
import Table from "./Table";
import Recovery from "./Recovery";

const SessionCard = (props) => {
  return (
    <div className="flex flex-col my-3 justify-center item-center">
      <div className="w-full bg-gray-300 p-2 rounded-md">
        <h1 className="text-sm sm:text-lg font-medium pl-4 pt-2">Session 99</h1>
        <Table cols={props.cols} rows={props.rows} />
        <Buttons />
      </div>
    </div>
  );
};

export const Buttons = () => {
  return (
    <div className="flex flex-col xxxs:flex-row xxxs:justify-between p-4 pt-0 -mx-2  ">
      <div className="w-full">
        <Recovery />
      </div>
    </div>
  );
};

export default SessionCard;
