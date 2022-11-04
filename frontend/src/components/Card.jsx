import React from "react";

const Card = (props) => {
  return (
    <div className="bg-gray-300 max-w-[330px]    mt-2 min-w-[211px] p-6 rounded-lg mx-1 970:ml-2 mb-3 text-sm">
      <div className="text-gray-black">
        <img
          className="block mx-auto w-[100px]  h-[100px] rounded-full"
          src={props.profile}
          alt="Profile"
        />
      </div>
      <div className="max-w-[300px]">
        <h1 className="text-center font-medium my-2">{props.role}</h1>
        <h1 className="font-medium">
          Name: <span className="font-normal">{props.name}</span>
        </h1>
        {/* <h2 className="font-medium">
          Age: <span className="font-normal">{props.age}</span>
        </h2> */}
        <h2 className="font-medium">
          Role: <span className="font-normal">{props.role}</span>
        </h2>
        <h2 className="font-medium">
          Email: <span className="font-normal">{props.email}</span>
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
