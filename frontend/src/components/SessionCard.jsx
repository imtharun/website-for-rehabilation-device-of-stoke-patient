import React, { useState, useEffect } from "react";
import Table from "./Table";
import Recovery from "./Recovery";
import axios from "../api/axios";

const SessionCard = () => {
  // const [values, setValues] = useState([]);

  const props = [
    {
      cols: [
        "Game name",
        "Joints",
        ["Shoulder 1", "Shoulder 2", "Shoulder 3", "Elbow", "Wrist"],
        "Duration (in mins)",
        "Current Level",
      ],
      rows: [
        {
          gameName: "Burst",
          joints: " Fingers and Palm – closing & opening",
          roms: [
            { minRom: 7, maxRom: 8 },
            { minRom: 9, maxRom: 10 },
            { minRom: 11, maxRom: 12 },
            { minRom: 11, maxRom: 12 },
            { minRom: 11, maxRom: 12 },
          ],
          timeDuration: 12,
          currentLevel: 2,
        },

        {
          gameName: "Trace",
          joints:
            "Shoulder – Flexion/Extension, Horizontal & Vertical Abduction/Adduction",
          roms: [
            { minRom: 7, maxRom: 8 },
            { minRom: 9, maxRom: 10 },
            { minRom: 11, maxRom: 12 },
            { minRom: 11, maxRom: 12 },
            { minRom: 11, maxRom: 12 },
          ],
          timeDuration: 12,
          currentLevel: 4,
        },
      ],
    },
    {
      cols: [
        "Game name",
        "Joints",
        ["Shoulder 1", "Shoulder 2", "Shoulder 3", "Elbow", "Wrist"],
        "Duration (in mins)",
        "Current Level",
      ],
      rows: [
        {
          gameName: "Burst",
          joints: " Fingers and Palm – closing & opening",
          roms: [
            { minRom: -17, maxRom: 8 },
            { minRom: 9, maxRom: 10 },
            { minRom: 9, maxRom: 10 },
            { minRom: 9, maxRom: 10 },
            { minRom: 9, maxRom: 10 },
          ],
          timeDuration: 12,
          currentLevel: 2,
        },

        {
          gameName: "Trace",
          joints:
            "Shoulder – Flexion/Extension, Horizontal & Vertical Abduction/Adduction",
          roms: [
            { minRom: 7, maxRom: 8 },
            { minRom: 9, maxRom: 10 },
            { minRom: 9, maxRom: 10 },
            { minRom: 9, maxRom: 10 },
            { minRom: 9, maxRom: 10 },
          ],
          timeDuration: 12,
          currentLevel: 4,
        },
      ],
    },
    {
      cols: [
        "Game name",
        "Joints",
        ["Shoulder 1", "Shoulder 2", "Shoulder 3", "Elbow", "Wrist"],
        "Duration (in mins)",
        "Current Level",
      ],
      rows: [
        {
          gameName: "Burst",
          joints: " Fingers and Palm – closing & opening",
          roms: [
            { minRom: 7, maxRom: 8 },
            { minRom: 9, maxRom: 10 },
            { minRom: 9, maxRom: 10 },
            { minRom: 9, maxRom: 10 },
            { minRom: 9, maxRom: 10 },
          ],
          timeDuration: 12,
          currentLevel: 2,
        },

        {
          gameName: "Trace",
          joints:
            "Shoulder – Flexion/Extension, Horizontal & Vertical Abduction/Adduction",
          roms: [
            { minRom: 7, maxRom: 8 },
            { minRom: 9, maxRom: 10 },
            { minRom: 9, maxRom: 10 },
            { minRom: 9, maxRom: 10 },
            { minRom: 9, maxRom: 10 },
          ],
          timeDuration: 12,
          currentLevel: 4,
        },
      ],
    },
  ];

  const tableData = async () => {
    try {
      const data = await axios.get("/patient/dashboard");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    tableData();
  }, []);

  return (
    <div className="flex flex-col my-3 justify-center item-center">
      {props.map((ele, index) => {
        return (
          <div
            key={index + 1}
            className="w-full bg-gray-300 p-2 my-2 rounded-md"
          >
            <h1 className="text-sm sm:text-lg font-medium pl-4 pt-2">
              Session 99
            </h1>
            <Table key={index + 1} cols={ele.cols} rows={ele.rows} />
            <Buttons />
          </div>
        );
      })}
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
