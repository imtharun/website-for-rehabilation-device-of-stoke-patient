import React from "react";
import Logo from "./Logo";
import {
  HomeIcon,
  TimerIcon,
  InfoCircledIcon,
  ExitIcon,
} from "@radix-ui/react-icons";

const Nav = () => {
  return (
    <nav className="py-4  px-4 sm:w-[14rem] sm:max-w-[14rem]">
      <div>
        <Logo />
      </div>
      <ul className="mt-48">
        <a href="/">
          <li className="flex items-center sm:ml-4 mb-4">
            <HomeIcon className="w-5 h-5 mx-auto sm:mx-0 sm:ml-1" />
            <span className="pl-2 hidden sm:inline-block">Home</span>
          </li>
        </a>
        <a href="/">
          <li className="flex items-center justify-left sm:ml-4 mb-4">
            <TimerIcon className="w-5 h-5 mx-auto sm:mx-0 sm:ml-1" />
            <span className="pl-2 hidden sm:inline">New Session</span>
          </li>
        </a>
        <a href="/">
          <li className="flex items-center justify-left sm:ml-4">
            <InfoCircledIcon className="w-5 h-5 mx-auto sm:mx-0 sm:ml-1" />
            <span className="pl-2 hidden sm:inline">Game Details</span>
          </li>
        </a>
      </ul>
      <div>
        <button>
          <ExitIcon className="mt-[14rem] ml-3 sm:hidden w-5 h-5" />
        </button>
        <button className="hidden sm:inline-block mt-[10rem] lg:mt-[13rem] ml-7 transition ease-in-out hover:scale-110 bg-gray-400 px-5 text-sm py-3 rounded-full">
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Nav;
