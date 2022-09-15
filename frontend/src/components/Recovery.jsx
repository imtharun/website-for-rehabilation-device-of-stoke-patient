import React from "react";

export const Progress = (props) => {
  return (
    <div className=" bg-gray-500 rounded-full mb-4 w-full">
      <div
        style={{
          width: `${props.percentage}%`,
        }}
        className={`max-w-full h-[.8rem] rounded-full bg-[#649f97]`}
      ></div>
    </div>
  );
};

const Recovery = () => {
  const recovered = [
    { gameName: "Burst", currentLevel: 2, totalLevel: 5 },
    { gameName: "Trace", currentLevel: 4, totalLevel: 5 },
  ];

  return (
    <div className="bg-gray-300 py-3 w-full rounded-lg">
      {recovered.map((ele, index) => {
        const percentage = (ele.currentLevel / ele.totalLevel) * 100;
        return (
          <div key={index + 1} className="mb-3">
            <span className="inline-block text-sm pb-2">
              Progress - {ele.gameName} [{percentage.toFixed(2)}%]
            </span>
            <Progress percentage={percentage.toFixed(2)} />
          </div>
        );
      })}
    </div>
  );
};

export default Recovery;
