import React from "react";

const Table = () => {
  const cols = [
    "Game name",
    "Joints",
    "Min ROM",
    "Max ROM",
    "Duration (in mins)",
    "Current Level",
  ];
  const rows = [
    {
      gameName: "Burst",
      joints: " Fingers and Palm – closing & opening",
      minRom: 1,
      maxRom: 2,
      timeDuration: 12,
      currentLevel: 2,
    },
    
    {
      gameName: "Trace",
      joints:
        "Shoulder – Flexion/Extension, Horizontal & Vertical Abduction/Adduction",
      minRom: 1,
      maxRom: 2,
      timeDuration: 12,
      currentLevel: 4,
    },
  ];

  return (
    <div className="flex flex-col max-w-3xl ml-2 rounded-md mx-2 sm:mx-4">
      <div className="p-2 mx-2 overflow-x-auto sm:-mx-6 lg:-mx-8 scrollbar-thin scrollbar-thumb-[#389387] scrollbar-track-[#cfece8] scrollbar-thumb-rounded-full  left-[-100]">
        <div className="py-2 inline-block min-w-full  ">
          <div className="overflow-hidden rounded-md">
            <table className="min-w-full ">
              <thead className="bg-gray-100 border-b">
                <tr>
                  {cols.map((col, index) => {
                    return (
                      <th
                        key={index + 1}
                        scope="col"
                        className="text-sm whitespace-nowrap font-medium px-4 py-4 text-left"
                      >
                        {col}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  return (
                    <tr
                      key={index + 1}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        {row.gameName}
                      </td>
                      <td className="text-sm w-[150px] max-w-[150px] break-wor font-light px-6 py-4">
                        {row.joints}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap ">
                        {row.minRom}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {row.maxRom}
                      </td>
                      <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                        {row.timeDuration}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {row.currentLevel}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
