import React from "react";
import Logo_PSG from "./../assets/psg.png";
import Logo_PSG_Mob from "./../assets/psg-mob.png";

const Logo = () => {
  return (
    <div>
      <img className="block sm:hidden -ml-2 w-[4rem]" src={Logo_PSG_Mob} alt="Logo" />
      <img className="hidden sm:block w-[8rem]" src={Logo_PSG} alt="Logo" />
    </div>
  );
};

export default Logo;
