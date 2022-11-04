import React, { useState, useEffect } from "react";
import Table from "./Table";
import Recovery from "./Recovery";
import axios from "../api/axios";

const SessionCard = (props) => {
  const [values, setValues] = useState([]);
  const jointInfo = {
    "bird dodge":
      "Fingers and Palm – closing & opening, Wrist – Flexion/Extension",
    burst: "Fingers and Palm – closing & opening",
    "block & ball":
      "Shoulder – Horizontal Abduction/Adduction, Elbow – Flexion/Extension",
    "car dodge": "Shoulder – Horizontal Abduction/Adduction",
    "copter block": "Shoulder – Vertical Abduction/Adduction",
    "drop balls":
      "Shoulder – Vertical Abduction/Adduction & Horizontal Abduction/Adduction",
    "hit catch":
      "Shoulder – Flexion/Extension & Abduction/Adduction, Elbow – Flexion/Extension",
    hurdles: "Elbow – Flexion/Extension",
    "Newton Balls": "Shoulder – Horizontal Abduction/Adduction",

    trace:
      "Shoulder – Flexion/Extension, Horizontal & Vertical Abduction/Adduction",
    "veggie pick":
      "Palm and fingers – gripping and grasping, Elbow – internal rotation",
    windows: "Wrist – Flexion/Extension, Elbow – Flexion/Extension",
  };
  const cols = [
    "Game name",
    "Joints",
    ["Shoulder 1", "Shoulder 2", "Shoulder 3", "Elbow", "Wrist"],
    "Duration (in mins)",
    "Current Level",
  ];

  const tableData = async () => {
    try {
      const data = await axios.get("/patient/dashboard");
      console.log(data);
      setValues(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let size = values?.length;

  useEffect(() => {
    tableData();
  }, []);

  return (
    <div className="flex flex-col my-3 justify-center item-center">
      {values?.reverse()?.map((ele, index) => {
        const sess = "session" + (size - index);
        if (size - index === 0) return "";
        const percentage = ele.percentage;
        const rows = [];
        ele[sess]?.forEach((game) => {
          const gameName = Object.keys(game)[0];
          if (gameName === "feedback") return;
          const row = {
            gameName: gameName,
            timeDuration: game[gameName]["timer"],
            currentLevel: game[gameName]["level"],
            roms: game[gameName]["roms"],
            joints: jointInfo[gameName.toLowerCase()],
          };
          rows.push(JSON.parse(JSON.stringify(row)));
        });

        return (
          <div
            key={index + 1}
            className="w-full bg-gray-300 p-2 my-2 rounded-md"
          >
            <h1 className="text-sm sm:text-lg font-medium pl-4 pt-2">
              Session {size - index}
            </h1>
            {rows.length !== 0 && (
              <Table key={index + 1} cols={cols} rows={rows} />
            )}
            <Buttons percentage={percentage} />
          </div>
        );
      })}
    </div>
  );
};

export const Buttons = (props) => {
  return (
    <div className="flex flex-col xxxs:flex-row xxxs:justify-between p-4 pt-0 -mx-2  ">
      <div className="w-full">
        <Recovery percentage={props.percentage} />
      </div>
    </div>
  );
};

export default SessionCard;
