import React from "react";
import Logo from "./Logo";
import { HomeIcon, TimerIcon, InfoCircledIcon } from "@radix-ui/react-icons";

const Nav = () => {
  return (
    <nav className="p-4 mx-4">
      <div>
        <Logo />
      </div>
      <ul className="mt-48">
        <a href="/">
          <li className="flex items-center ml-2 mb-2">
            <HomeIcon />
            <span className="pl-2">Home</span>
          </li>
        </a>
        <a href="/">
          <li className="flex items-center ml-2 mb-2">
            <TimerIcon />
            <span className="pl-2">New Session</span>
          </li>
        </a>
        <a href="/">
          <li className="flex items-center ml-2">
            <InfoCircledIcon />
            <span className="pl-2">Game Details</span>
          </li>
        </a>
      </ul>
    </nav>
  );
};

export default Nav;
