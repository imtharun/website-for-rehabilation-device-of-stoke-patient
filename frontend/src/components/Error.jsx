import React from "react";
import Error404 from "./../assets/Error404.svg";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      <img
        className="w-[600px] h-[450px] min-w-[450px]"
        src={Error404}
        alt="Some Error Occurred"
      />
      <div className="mx-auto">
        <p className="text-center text-sm sm:text-lg font-medium">
          Some Error has occurred! Try again later 😔
        </p>
        <div className="p-3">
          <button
            onClick={clickHandler}
            className="block mx-auto transition ease-in-out hover:scale-110 bg-gray-200 px-5 text-sm py-3 rounded-full"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
