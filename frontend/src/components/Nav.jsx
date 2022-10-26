import React, { useContext } from "react";
import Logo from "./Logo";
import Cookies from "universal-cookie";
import { ExitIcon } from "@radix-ui/react-icons";
import axios from "../api/axios";
import { useNavigate, NavLink } from "react-router-dom";
import { UserTypeContext } from "../UserContextProvider";

const Nav = (props) => {
  const navigate = useNavigate();
  const { userHandler } = useContext(UserTypeContext);

  const onLogout = async () => {
    try {
      const response = await axios.get("/logout");
      console.log(response);
      if (response.status === 200) {
        const cookies = new Cookies();
        cookies.remove("userType");
        userHandler("");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    onLogout();
  };

  return (
    <nav className="nav py-4 relative mx-1 sm:w-[14rem] sm:max-w-[14rem] overflow-scroll h-full">
      <div>
        <Logo />
      </div>
      <ul className="mt-48 -ml-2">
        {props.navItems &&
          props.navItems.map((ele, index) => {
            return (
              <NavLink
                key={index + 1}
                style={({ isActive }) => ({
                  fontWeight: isActive ? 600 : 400,
                  color: !isActive
                    ? "#54626F"
                    : "rgb(100 116 139 / var(--tw-bg-opacity))",
                })}
                to={ele.link}
                className="hover:font-medium mx-auto"
                replace
                end
              >
                <li className="flex items-center sm:ml-6 mb-4 ">
                  {ele.iconComponent}
                  <span className="pl-2 hidden sm:inline-block">
                    {ele.name}
                  </span>
                </li>
              </NavLink>
            );
          })}
      </ul>
      <div className="relative">
        <button onClick={logoutHandler}>
          <ExitIcon className="mt-[13rem] fill-current ml-[0.6rem] sm:hidden w-5 h-5" />
        </button>
        <button
          onClick={logoutHandler}
          className="hidden font-medium mx-auto sm:inline-block mt-[11rem] ml-9 transition ease-in-out hover:scale-110 bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100 shadow-sm px-5 text-sm py-3 rounded-full"
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Nav;
