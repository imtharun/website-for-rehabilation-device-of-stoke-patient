import React, { useRef, useState, useEffect } from "react";
import Logo from "../components/Logo";
import { validateEmail } from "./Signup";
import Background from "../components/Background";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (email !== "" && !validateEmail(email)) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  }, [email]);

  const authenticate = async () => {
    try {
      const resp = await axios.post({
        email,
        password,
      });
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = function (event) {
    event.preventDefault();
    authenticate();
  };

  return (
    <div className="sm:flex h-full">
      {/* form div */}
      <div className="sm:w-1/2 pt-6 mx-6 h-full">
        <Logo />
        <form className="mt-24" onSubmit={submitHandler}>
          <div>
            <h1 className="text-center text-3xl">Welcome Back!</h1>
            <p className="text-xs pt-1 text-gray-500 text-center">
              Please enter your details
            </p>
          </div>
          <div className="mt-8">
            <div className="relative max-w-[22rem] border-b-[1.5px] border-black mx-auto p-1 pl-0">
              <input
                ref={emailRef}
                className="outline-none block w-full"
                value={email}
                type="text"
                onChange={() => setEmail(emailRef.current.value)}
                placeholder="Email"
                required
              />
              {isEmail && (
                <span className="text-red-500 absolute text-xs -top-2 right-0">
                  Invalid Mail Id
                </span>
              )}
            </div>
            <div className="max-w-[22rem] mt-8 border-b-[1.5px] border-black mx-auto p-1 pl-0">
              <input
                ref={passwordRef}
                className="outline-none block w-full"
                value={password}
                onChange={() => setPassword(passwordRef.current.value)}
                type="password"
                autoComplete="off"
                placeholder="Password"
                required
              />
            </div>
            <div className="mt-10 mb-8">
              <button className="block max-w-[22rem] w-full transition ease-in-out hover:scale-110 rounded-full p-2 mx-auto bg-gray-300 ">
                Login
              </button>
            </div>
            <div className="text-center flex justify-center -mt-4 text-sm">
              Don't have an account,
              <span className="ml-1 flex border-b-[1px] border-transparent hover:border-b-black transition-all duration-700 ease-out">
                <Link to={"/signup"}>Sign up</Link>
                <ArrowTopRightIcon className="ml-1 mt-[.25rem] w-3 h-3" />
              </span>
            </div>
          </div>
        </form>
        <div className="pt-[4.8rem] w-sm max-w-[370px] mx-auto">
          <h1 className="text-center text-xs">
            Virtual Reality Based Rehabilitation Device for Upper Extremity
            Stroke Survivors
          </h1>
          <p className="mt-1 text-center text-xs">Sponsored by DST - BDTD</p>
        </div>
      </div>
      {/* image div */}
      <Background />
    </div>
  );
};

export default Login;
