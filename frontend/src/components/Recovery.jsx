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

const Recovery = (props) => {
  const recovered = props.percentage;
  return (
    <div className="bg-gray-300 py-3 w-full rounded-lg">
      {recovered?.map((ele, index) => {
        const jointName = Object.keys(ele)[0];
        const percentage = +ele[jointName];
        return (
          <div key={index + 1} className="mb-3">
            <span className="inline-block text-sm pb-2">
              Progress - {jointName} [{percentage.toFixed(2)}%]
            </span>
            <Progress percentage={percentage.toFixed(2)} />
          </div>
        );
      })}
    </div>
  );
};

export default Recovery;
