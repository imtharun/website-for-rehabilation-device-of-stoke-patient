import React, { useRef, useState, useEffect } from "react";
import Logo from "../components/Logo";
import { validateEmail, Bottom, Top } from "./Signup";
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
    <div className="bg-og-bg bg-cover min-h-screen">
      <div className="pt-3 ml-2">
        <Logo />
      </div>
      <div className="xxxs:flex xxxs:justify-center">
        {/* form div */}
        <div className="xxxs:w-[26rem] pt-2 mx-[0.86rem]">
          <form
            className="mt-[3.56rem] bg-white rounded-md p-8 shadow-2xl "
            onSubmit={submitHandler}
          >
            <Top />
            <div className="mt-4">
              <div className="relative max-w-[21rem] border-b-[1.5px] border-black  p-1 pl-0">
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
              <div className="max-w-[21rem] mt-8 border-b-[1.5px] border-black  p-1 pl-0">
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
                <button className="block max-w-[21rem] w-full transition ease-in-out hover:scale-110 rounded-full p-2 bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100 ">
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
          <Bottom />
        </div>
      </div>
    </div>
  );
};

export default Login;
