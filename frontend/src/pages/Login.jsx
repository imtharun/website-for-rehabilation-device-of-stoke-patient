import React, { useRef, useState, useEffect } from "react";
import Logo from "../components/Logo";
import { validateEmail } from "./Signup";
import Background from "../components/Background";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);

  useEffect(() => {
    console.log(validateEmail(email));
    if (email !== "" && !validateEmail(email)) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  }, [email]);

  const submitHandler = function (event) {
    event.preventDefault();
    console.log(email, password);
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
            <div className="my-10">
              <button className="block max-w-[22rem] w-full transition ease-in-out hover:scale-110 rounded-full p-2 mx-auto bg-gray-300 ">
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
      <Background />
    </div>
  );
};

export default Login;
