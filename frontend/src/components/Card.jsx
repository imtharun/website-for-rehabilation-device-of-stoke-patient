import React from "react";

const Card = (props) => {
  return (
    <div className="bg-gray-300 p-6 rounded-lg mb-3 text-sm">
      <div className="text-gray-black">
        <img
          className="block mx-auto w-[100px] h-[100px] rounded-full"
          src={props.profile}
          alt="Profile"
        />
      </div>
      <div className="max-w-[200px]">
        <h1 className="text-center font-medium">{props.role}</h1>
        <h1 className="font-medium">
          Name: <span className="font-normal">{props.name}</span>
        </h1>
        <h2 className="font-medium">
          Age: <span className="font-normal">{props.age}</span>
        </h2>
        <h3 className="font-medium">
          Address:
          <span className="font-normal ">{props.address}</span>
        </h3>
      </div>
    </div>
  );
};

export default Card;
