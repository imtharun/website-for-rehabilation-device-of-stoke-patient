import React from "react";
import Bg from "./../assets/og-bg.svg";

const Background = () => {
  return (
    <div className="shadow-lg h-full hidden sm:block">
      <img
        className="h-full rounded-tl-3xl"
        src={Bg}
        alt="Background"
      />
    </div>
  );
};

export default Background;
