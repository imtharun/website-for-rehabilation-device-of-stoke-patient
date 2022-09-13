import React from "react";
import birdDodge from "./../assets/game-images/birdDodge.png";
import burst from "./../assets/game-images/burst.png";
import blockAndBall from "./../assets/game-images/blockAndBall.png";
import carDodge from "./../assets/game-images/carDodge.png";
import copterBlock from "./../assets/game-images/copterBlock.png";
import dropBalls from "./../assets/game-images/dropBalls.jpg";
import hitCatch from "./../assets/game-images/hitCatch.png";
import hurdles from "./../assets/game-images/hurdles.png";
import newtonBalls from "./../assets/game-images/newtonBalls.png";
import trace from "./../assets/game-images/trace.png";
import veggiePick from "./../assets/game-images/veggiePick.png";
import windows from "./../assets/game-images/windows.png";

const GameDetails = () => {
  const data = [
    {
      name: "Bird Dodge",
      supportingJoints:
        "Fingers and Palm – closing & opening, Wrist – Flexion/Extension",
      noOfLevels: 3,
      picture: birdDodge,
    },
    {
      name: "Burst",
      supportingJoints: "Fingers and Palm – closing & opening",
      noOfLevels: 5,
      picture: burst,
    },
    {
      name: "Block & Ball",
      supportingJoints:
        "Shoulder – Horizontal Abduction/Adduction, Elbow – Flexion/Extension",
      noOfLevels: 5,
      picture: blockAndBall,
    },
    {
      name: "Car Dodge",
      supportingJoints: "Shoulder – Horizontal Abduction/Adduction",
      noOfLevels: 5,
      picture: carDodge,
    },
    {
      name: "Copter Block",
      supportingJoints: "Shoulder – Vertical Abduction/Adduction",
      noOfLevels: 5,
      picture: copterBlock,
    },
    {
      name: "Drop balls",
      supportingJoints:
        "Shoulder – Vertical Abduction/Adduction & Horizontal Abduction/Adduction",
      noOfLevels: 3,
      picture: dropBalls,
    },
    {
      name: "Hit catch",
      supportingJoints:
        "Shoulder – Flexion/Extension & Abduction/Adduction, Elbow – Flexion/Extension",
      noOfLevels: 5,
      picture: hitCatch,
    },
    {
      name: "Hurdles",
      supportingJoints: "Elbow – Flexion/Extension",
      noOfLevels: 5,
      picture: hurdles,
    },
    {
      name: "Newton Balls",
      supportingJoints: "Shoulder – Horizontal Abduction/Adduction",
      noOfLevels: 5,
      picture: newtonBalls,
    },
    {
      name: "Trace",
      supportingJoints:
        "Shoulder – Flexion/Extension, Horizontal & Vertical Abduction/Adduction",
      noOfLevels: 5,
      picture: trace,
    },
    {
      name: "Veggie Pick",
      supportingJoints:
        "Palm and fingers – gripping and grasping, Elbow – internal rotation",
      noOfLevels: 5,
      picture: veggiePick,
    },
    {
      name: "Windows",
      supportingJoints: "Wrist – Flexion/Extension, Elbow – Flexion/Extension",
      noOfLevels: 5,
      picture: windows,
    },
  ];

  return (
    <section className="nav rounded-tl-2xl px-10 bg-white p-7 w-full overflow-scroll">
      <h1 className=" text-xl font-medium">
        Game Details - VR for Rehabilitation
      </h1>
      {data.map((ele, index) => {
        return (
          <div
            key={index + 1}
            className="mt-5 bg-gray-200 w-[100%] p-4 rounded-lg mx-auto"
          >
            <div className="flex xs:flex-row flex-col justify-center items-center xs:justify-between xs:items-center">
              <div className="">
                <h1 className="font-semibold text-center xs:text-left">
                  {ele.name}
                </h1>
                <div className="pt-3">
                  <p className="text-center xs:text-left">
                    <span className="font-medium ">No of Levels: </span>
                    {ele.noOfLevels}
                  </p>
                  <p className="xs:text-left text-center xs:max-w-[80%]">
                    <span className="font-medium ">Joints: </span>
                    {ele.supportingJoints}
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <img
                  className="w-[7rem] max-w-[7rem] min-h-[7rem] rounded-lg"
                  src={ele.picture}
                  alt={ele.name}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default GameDetails;
