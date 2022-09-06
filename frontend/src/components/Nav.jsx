import React from "react";
import Logo from "./Logo";
import {
  HomeIcon,
  TimerIcon,
  InfoCircledIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import axios from "../api/axios";
import { useNavigate, NavLink } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const response = await axios.get("/logout");
      console.log(response);
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    onLogout();
  };

  return (
    <nav className="nav py-4  px-2 sm:w-[14rem] sm:max-w-[14rem] overflow-scroll">
      <div>
        <Logo />
      </div>
      <ul className="mt-48 -ml-2">
        <NavLink
          style={({ isActive }) => ({
            fontWeight: isActive ? 600 : 400,
            color: !isActive ? "#54626F" : "#000",
          })}
          to={"/"}
          className="hover:font-medium"
        >
          <li className="flex items-center sm:ml-4 mb-4 ">
            <HomeIcon className="w-5 h-5 mx-auto sm:mx-0 sm:ml-1" />
            <span className="pl-2 hidden sm:inline-block">Home</span>
          </li>
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            fontWeight: isActive ? 600 : 400,
            color: !isActive ? "#54626F" : "#000",
          })}
          to={"/new-session"}
          className="hover:font-medium"
        >
          <li className="flex items-center justify-left sm:ml-4 mb-4 ">
            <TimerIcon className="w-5 h-5 mx-auto sm:mx-0 sm:ml-1" />
            <span className="pl-2 hidden sm:inline">New Session</span>
          </li>
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            fontWeight: isActive ? 600 : 400,
            color: !isActive ? "#54626F" : "#000",
          })}
          to={"/game-details"}
          className="hover:font-medium"
        >
          <li className="flex items-center justify-left sm:ml-4 ">
            <InfoCircledIcon className="w-5 h-5 mx-auto sm:mx-0 sm:ml-1 " />
            <span className="pl-2 hidden sm:inline ">Game Details</span>
          </li>
        </NavLink>
      </ul>
      <div>
        <button onClick={logoutHandler}>
          <ExitIcon className="mt-[13rem] fill-current ml-[0.6rem] sm:hidden w-5 h-5" />
        </button>
        <button
          onClick={logoutHandler}
          className="hidden mx-auto sm:inline-block mt-[11rem] ml-9 transition ease-in-out hover:scale-110 bg-gray-300 px-5 text-sm py-3 rounded-full"
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Nav;
