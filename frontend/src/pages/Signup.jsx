import React, { useRef, useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Logo from "../components/Logo";
import Background from "../components/Background";
import { Link } from "react-router-dom";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import axios from "../api/axios";

const isAlpha = (text) => {
  return text.match("^[ a-zA-Z()]+$");
};

export const validateEmail = (email) => {
  return email.match(/^([a-zA-Z0-9._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/);
};

const validatePhoneNumber = (number) => {
  return number.match(
    /^(?:(?:\+|0{0,2})91(\s*[ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/
  );
};

const Login = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dobRef = useRef();
  const confirmPasswordRef = useRef();
  const phoneNumberRef = useRef();
  const addressRef = useRef();
  const medicalConditionRef = useRef();
  const caretakerNameRef = useRef();
  const caretakerDobRef = useRef();
  const caretakerAddressRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [dob, setDob] = useState("");
  const [caretakerName, setCaretakerName] = useState("");
  const [caretakerAddress, setCaretakerAddress] = useState("");
  const [caretakerDob, setCaretakerDob] = useState("");

  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isCaretakerName, setIsCaretakerName] = useState(false);

  useEffect(() => {
    document.title = "Sign up";
  }, []);

  useEffect(() => {
    if (name !== "" && !isAlpha(name)) {
      setIsName(true);
    } else {
      setIsName(false);
    }
  }, [name]);

  useEffect(() => {
    if (caretakerName !== "" && !isAlpha(caretakerName)) {
      setIsCaretakerName(true);
    } else {
      setIsCaretakerName(false);
    }
  }, [caretakerName]);

  useEffect(() => {
    if (email !== "" && !validateEmail(email)) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  }, [email]);

  useEffect(() => {
    if (phoneNumber !== "" && !validatePhoneNumber(phoneNumber)) {
      setIsPhoneNumber(true);
    } else {
      setIsPhoneNumber(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (password === "" && confirmPassword === "") {
      setIsPassword(false);
      return;
    }

    if (confirmPassword.length !== password.length) {
      setIsPassword(true);
      return;
    }
    if (
      password !== "" &&
      confirmPassword !== "" &&
      password !== confirmPassword
    ) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  }, [password, confirmPassword]);

  const postData = async () => {
    try {
      const resp = await axios.post({
        name,
        email,
        password,
        confirmPassword,
        phoneNumber,
        dob,
        address,
        medicalCondition,
        caretakerName,
        caretakerDob,
        caretakerAddress,
      });

      console.log(resp);
    } catch (error) {
      console.log(error``);
    }
  };

  const submitHandler = function (event) {
    event.preventDefault();
    postData();
  };

  return (
    <div className="sm:flex min-h-screen">
      {/* form div */}
      <div className="sm:w-1/2 pt-6 mx-6 h-full">
        <Logo />
        <form className="mt-20" onSubmit={submitHandler}>
          <div>
            <h1 className="text-center text-3xl">Welcome Back!</h1>
            <p className="text-xs pt-1 text-gray-500 text-center">
              Please enter your details
            </p>
          </div>
          <div className="mt-8">
            <div
              className={`relative max-w-[22rem] border-b-[1.5px] mx-auto p-1 pl-0 ${
                isName ? "border-red-500" : "border-black"
              }`}
            >
              <input
                ref={nameRef}
                className="outline-none block w-full"
                value={name}
                type="text"
                onChange={() => setName(nameRef.current.value)}
                placeholder="Name"
                required
              />
              {isName && (
                <span className="text-red-500 absolute text-xs -top-2 right-0">
                  Invalid Name
                </span>
              )}
            </div>
            <div
              className={`relative max-w-[22rem] mt-7 border-b-[1.5px]  ${
                isEmail ? "border-red-500" : "border-black"
              } mx-auto p-1 pl-0 `}
            >
              <input
                ref={emailRef}
                className="outline-none block w-full"
                value={email}
                type="email"
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
            <div className="max-w-[22rem] mt-7 relative  border-b-[1.5px] border-black mx-auto p-1 pl-0">
              <input
                ref={dobRef}
                className="outline-none block w-full"
                value={dob}
                placeholder="DD/MM/YYYY"
                onChange={() => setDob(dobRef.current.value)}
                type="text"
                required
              />
            </div>
            <div
              className={`max-w-[22rem] ${
                isPhoneNumber ? "border-red-500" : "border-black"
              } mt-7 relative border-b-[1.5px] border-black mx-auto p-1 pl-0`}
            >
              <input
                ref={phoneNumberRef}
                className="outline-none block w-full"
                value={phoneNumber}
                type="text"
                onChange={() => setPhoneNumber(phoneNumberRef.current.value)}
                placeholder="Phone number"
                required
              />
              {isPhoneNumber && (
                <span className="text-red-500 absolute text-xs -top-2 right-0">
                  Invalid Phone Number
                </span>
              )}
            </div>
            <div className="max-w-[22rem] mt-7 relative border-b-[1.5px] border-black mx-auto p-1 pl-0">
              <TextareaAutosize
                ref={addressRef}
                minRows={2}
                className="outline-none block w-full"
                value={address}
                type="text"
                onChange={() => setAddress(addressRef.current.value)}
                placeholder="Address"
                required
              />
            </div>
            <div className="max-w-[22rem] mt-7 relative border-b-[1.5px] border-black mx-auto p-1 pl-0">
              <TextareaAutosize
                ref={medicalConditionRef}
                minRows={2}
                className="outline-none block w-full"
                value={medicalCondition}
                type="text"
                onChange={() =>
                  setMedicalCondition(medicalConditionRef.current.value)
                }
                placeholder="Medical Condition"
                required
              />
            </div>

            <div
              className={`${
                isPassword ? "border-red-500" : "border-black"
              } max-w-[22rem] mt-7 relative  border-b-[1.5px] border-black mx-auto p-1 pl-0`}
            >
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
              {isPassword && (
                <span className="text-red-500 absolute text-xs -top-2 right-0">
                  Invalid Password
                </span>
              )}
            </div>
            <div
              className={`${
                isPassword ? "border-red-500" : "border-black"
              } max-w-[22rem] mt-7 relative  border-b-[1.5px] border-black mx-auto p-1 pl-0`}
            >
              <input
                ref={confirmPasswordRef}
                className="outline-none block w-full"
                value={confirmPassword}
                onChange={() =>
                  setConfirmPassword(confirmPasswordRef.current.value)
                }
                type="password"
                autoComplete="off"
                placeholder="Confirm Password"
                required
              />
              {isPassword && (
                <span className="text-red-500 absolute text-xs -top-2 right-0">
                  Invalid Password
                </span>
              )}
            </div>
            <div
              className={`${
                isCaretakerName ? "border-red-500" : "border-black"
              } max-w-[22rem] mt-7 relative border-b-[1.5px] border-black mx-auto p-1 pl-0`}
            >
              <input
                ref={caretakerNameRef}
                className="outline-none block w-full"
                value={caretakerName}
                type="text"
                onChange={() =>
                  setCaretakerName(caretakerNameRef.current.value)
                }
                placeholder="Caretaker Name"
                required
              />
              {isCaretakerName && (
                <span className="text-red-500 absolute text-xs -top-2 right-0">
                  Invalid Name
                </span>
              )}
            </div>
            <div className="max-w-[22rem] mt-7 relative border-b-[1.5px] border-black mx-auto p-1 pl-0">
              <input
                ref={caretakerDobRef}
                className="outline-none block w-full"
                value={caretakerDob}
                type="text"
                onChange={() => setCaretakerDob(caretakerDobRef.current.value)}
                placeholder="Caretaker Dob"
                required
              />
            </div>
            <div className="max-w-[22rem] mt-7 relative border-b-[1.5px] border-black mx-auto p-1 pl-0">
              <TextareaAutosize
                ref={caretakerAddressRef}
                minRows={2}
                className="outline-none block w-full"
                value={caretakerAddress}
                type="text"
                onChange={() =>
                  setCaretakerAddress(caretakerAddressRef.current.value)
                }
                placeholder="Caretaker Address"
                required
              />
            </div>

            <div className="my-10">
              <button className="block hover:scale-110 transition ease-in-out max-w-[22rem] w-full rounded-full p-2 mx-auto bg-gray-300 ">
                Sign up
              </button>
            </div>
            <div className="text-center flex justify-center -mt-4 text-sm">
              Already have an account ?,
              <span className="ml-1 flex border-b-[1px] border-transparent hover:border-b-black transition-all duration-700 ease-out">
                <Link to={"/login"}>Log In</Link>
                <ArrowTopRightIcon className="ml-1 mt-[.25rem] w-3 h-3" />
              </span>
            </div>
          </div>
        </form>
        <div className="pt-[3.7rem] pb-4 w-sm max-w-[370px] mx-auto">
          <h1 className="text-center text-xs">
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
