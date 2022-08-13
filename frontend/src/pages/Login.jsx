import React, { useRef, useState, useEffect } from "react";
import Bg from "./../assets/og-bg.svg";
import Logo from "./../assets/psg.png";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);

  const submitHandler = function (event) {
    event.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="sm:flex h-full">
      {/* form div */}
      <div className="sm:w-1/2 pt-6 mx-6 h-full">
        <div>
          <img className="w-[8rem]" src={Logo} alt="Logo" />
        </div>
        <form className="mt-24" onSubmit={submitHandler}>
          <div>
            <h1 className="text-center text-3xl">Welcome Back!</h1>
            <p className="text-xs pt-1 text-gray-500 text-center">
              Please enter your details
            </p>
          </div>
          <div className="mt-8">
            <div className="max-w-xs border-b-[1.5px] border-black mx-auto p-1 pl-0">
              <input
                ref={emailRef}
                className="outline-none block w-full"
                value={email}
                type="text"
                onChange={() => setEmail(emailRef.current.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="max-w-xs mt-8 border-b-[1.5px] border-black mx-auto p-1 pl-0">
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
            <div className="my-10">
              <button className="block max-w-xs w-full rounded-full p-2 hover:opacity-70 mx-auto bg-gray-300 ">
                Login
              </button>
            </div>
          </div>
        </form>
        <div className="pt-[3.7rem]  w-sm max-w-[370px] mx-auto">
          <h1 className="text-center text-sm">
            Virtual Reality Based Rehabilitation Device for Upper Extremity
            Stroke Survivors
          </h1>
          <p className="mt-1  text-center text-xs">Sponsored by DST - BDTD</p>
        </div>
      </div>
      {/* image div */}
      <div className="w-1/2 hidden sm:block">
        <img
          className="h-screen w-full rounded-tl-3xl"
          src={Bg}
          alt="Background"
        />
      </div>
    </div>
  );
};

export default Login;
