import React from "react";

// import { AnimatedLineProgressBar } from "@frogress/line";

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
    { bodyPart: "Neck", percentage: "30" },
    { bodyPart: "Leg", percentage: "10" },
    { bodyPart: "Elbow", percentage: "60" },
    { bodyPart: "Fingers", percentage: "90" },
    { bodyPart: "Forearm", percentage: "75" },
  ];

  return (
    <div className="bg-gray-300 px-5 py-3 w-full rounded-lg">
      {recovered.map((ele) => {
        return (
          <div key={Math.random() * 100} className="mb-3">
            <span className="text-sm">
              {ele.bodyPart + " - " + ele.percentage + "%"}
            </span>
            <Progress percentage={ele.percentage} />
          </div>
        );
      })}
    </div>
  );
};

export default Recovery;
