import React from "react";
import Bg from "./../assets/og-bg.svg";

const Background = (props) => {
  return (
    <div className="shadow-lg fixed right-0 overflow-hidden h-full hidden sm:block">
      <img
        className="h-full rounded-tl-3xl"
        src={Bg}
        alt="Background"
      />
    </div>
  );
};

export default Background;
