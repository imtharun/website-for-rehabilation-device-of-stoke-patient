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
      description:
        "The player has to move the crosshair and shoot the birds to score in particular interval of time.",
    },
    {
      name: "Burst",
      supportingJoints: "Fingers and Palm – closing & opening",
      noOfLevels: 5,
      picture: burst,
      description:
        "The player has to pump the Christmas gifts and burst as many gifts as possible in given time.",
    },
    {
      name: "Block & Ball",
      supportingJoints:
        "Shoulder – Horizontal Abduction/Adduction, Elbow – Flexion/Extension",
      noOfLevels: 5,
      picture: blockAndBall,
      description:
        "The player has to cross the plane to end point without hitting any blocks on the way.",
    },
    {
      name: "Car Dodge",
      supportingJoints: "Shoulder – Horizontal Abduction/Adduction",
      noOfLevels: 5,
      picture: carDodge,
      description:
        "The player has to dodge the oncoming cars and collect the coins coming on the lane.",
    },
    {
      name: "Copter Block",
      supportingJoints: "Shoulder – Vertical Abduction/Adduction",
      noOfLevels: 5,
      picture: copterBlock,
      description:
        "The player has to make the copter dodge the block on its way and keep flying with given time",
    },
    {
      name: "Drop balls",
      supportingJoints:
        "Shoulder – Vertical Abduction/Adduction & Horizontal Abduction/Adduction",
      noOfLevels: 3,
      picture: dropBalls,
      description:
        "The player has to follow the shapes displaying on the screen, the player has to follow the given shapes to complete a cycle and move on with another level to practice another shape.",
    },
    {
      name: "Hit catch",
      supportingJoints:
        "Shoulder – Flexion/Extension & Abduction/Adduction, Elbow – Flexion/Extension",
      noOfLevels: 3,
      picture: hitCatch,
      description:
        "The player has to hit balls coming from various positions. The speed of the balls coming towards will be incremented for upcoming levels. The score will be calculated on hitting the balls",
    },
    {
      name: "Hurdles",
      supportingJoints: "Elbow – Flexion/Extension",
      noOfLevels: 5,
      picture: hurdles,
      description:
        "The player has to jump over hurdles coming in front with different positions within time period. The player should not hit the hurdles coming towards.",
    },
    {
      name: "Newton Balls",
      supportingJoints: "Shoulder – Horizontal Abduction/Adduction",
      noOfLevels: 5,
      picture: newtonBalls,
      description:
        "The player has to catch the balls falling from the sky, the player will be able to move the basket using the hand moving left to right.",
    },
    {
      name: "Trace",
      supportingJoints:
        "Shoulder – Flexion/Extension, Horizontal & Vertical Abduction/Adduction",
      noOfLevels: 5,
      picture: trace,
      description:
        "The player has to follow the cube only on the white plane. The player has to move the cube from starting point to end point without getting out of the lane.",
    },
    {
      name: "Veggie Pick",
      supportingJoints:
        "Palm and fingers – gripping and grasping, Elbow – internal rotation",
      noOfLevels: 5,
      picture: veggiePick,
      description:
        "The player has to pick the particular item displayed on the screen. Score will be increased based on each correct item picked by the player.",
    },
    {
      name: "Windows",
      supportingJoints: "Wrist – Flexion/Extension, Elbow – Flexion/Extension",
      noOfLevels: 5,
      picture: windows,
      description:
        "The player has to wipe the windows until it gets clean and shine like a new window.",
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
                <div className="pt-2">
                  <p className="text-center xs:text-left">
                    <span className="font-medium ">No of Levels: </span>
                    {ele.noOfLevels}
                  </p>
                  <p className="xs:text-left text-center xs:max-w-[80%]">
                    <span className="font-medium ">Joints: </span>
                    {ele.supportingJoints}
                  </p>
                  <p className="xs:text-left text-center xs:max-w-[85%]">
                    <span className="font-medium ">Description: </span>
                    {ele.description}
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
