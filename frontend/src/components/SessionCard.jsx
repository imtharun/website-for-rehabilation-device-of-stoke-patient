import React, { useState, useEffect } from "react";
import Table from "./Table";
import Recovery from "./Recovery";
import axios from "../api/axios";

const SessionCard = () => {
  const [values, setValues] = useState([]);
  const jointInfo = {
    "Bird Dodge":
      "Fingers and Palm – closing & opening, Wrist – Flexion/Extension",
    Burst: "Fingers and Palm – closing & opening",
    "Block & Ball":
      "Shoulder – Horizontal Abduction/Adduction, Elbow – Flexion/Extension",
    "Car Dodge": "Shoulder – Horizontal Abduction/Adduction",
    "Copter Block": "Shoulder – Vertical Abduction/Adduction",
    "Drop balls":
      "Shoulder – Vertical Abduction/Adduction & Horizontal Abduction/Adduction",
    "Hit catch":
      "Shoulder – Flexion/Extension & Abduction/Adduction, Elbow – Flexion/Extension",
    Hurdles: "Elbow – Flexion/Extension",
    "Newton Balls": "Shoulder – Horizontal Abduction/Adduction",

    Trace:
      "Shoulder – Flexion/Extension, Horizontal & Vertical Abduction/Adduction",
    "Veggie Pick":
      "Palm and fingers – gripping and grasping, Elbow – internal rotation",
    Windows: "Wrist – Flexion/Extension, Elbow – Flexion/Extension",
  };
  const cols = [
    "Game name",
    "Joints",
    ["Shoulder 1", "Shoulder 2", "Shoulder 3", "Elbow", "Wrist"],
    "Duration (in mins)",
    "Current Level",
  ];
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
          joints: "Fingers and Palm – closing & opening",
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

  const rows = [];

  const tableData = async () => {
    try {
      const data = await axios.get("/patient/dashboard");
      console.log(data.data);
      setValues(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    tableData();
  }, []);

  let size = values.length;
  return (
    <div className="flex flex-col my-3 justify-center item-center">
      {values.reverse().map((ele, index) => {
        return (
          <div
            key={index + 1}
            className="w-full bg-gray-300 p-2 my-2 rounded-md"
          >
            <h1 className="text-sm sm:text-lg font-medium pl-4 pt-2">
              Session {size}
            </h1>
            {ele["session" + size--].forEach((e) => {
              if (e["feedback"]) return "";
              const keys = Object.keys(e);
              keys.forEach((key) => {
                const row = {
                  gameName: key,
                  joints: jointInfo[key],
                  roms: [
                    { minRom: 7, maxRom: 8 },
                    { minRom: 9, maxRom: 10 },
                    { minRom: 9, maxRom: 10 },
                    { minRom: 9, maxRom: 10 },
                    { minRom: 9, maxRom: 10 },
                  ],
                  timeDuration: e[key].timer,
                  currentLevel: e[key].level,
                };
                rows.push(row);
              });
            })}
            <Table key={index + 1} cols={cols} rows={rows} />
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
