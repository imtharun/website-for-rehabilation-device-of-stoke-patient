import React, { useRef, useState, useContext, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import axios from "../api/axios";
import "tw-elements";
import { UserTypeContext } from "../UserContextProvider";

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
  const navigate = useNavigate();
  const { userType } = useContext(UserTypeContext);
  const USER_TYPES = ["Patient", "Doctor", "Caretaker"];

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dobRef = useRef();
  const confirmPasswordRef = useRef();
  const phoneNumberRef = useRef();
  const addressRef = useRef();
  const hospitalNameRef = useRef();
  const doctorEmailRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  // const [image, setImage] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [userTypee, setUserTypee] = useState("Patient");
  const [doctorEmail, setDoctorEmail] = useState("");

  const [isName, setIsName] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isPhoneNumber, setIsPhoneNumber] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isDoctorEmail, setIsDoctorEmail] = useState(true);

  const radioChangeHandler = (e) => {
    setUserTypee(e.target.value);
  };

  useEffect(() => {
    document.title = "Sign up";
  }, []);

  useEffect(() => {
    if (name !== "" && !isAlpha(name)) {
      setIsName(false);
    } else {
      setIsName(true);
    }
  }, [name]);

  useEffect(() => {
    if (email !== "" && !validateEmail(email)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  }, [email]);

  useEffect(() => {
    if (doctorEmail !== "" && !validateEmail(doctorEmail)) {
      setIsDoctorEmail(false);
    } else {
      setIsDoctorEmail(true);
    }
  }, [doctorEmail]);

  useEffect(() => {
    if (phoneNumber !== "" && !validatePhoneNumber(phoneNumber)) {
      setIsPhoneNumber(false);
    } else {
      setIsPhoneNumber(true);
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (password.length === 0) {
      setIsPassword(true);
    }
    if (
      password.length !== 0 &&
      confirmPassword.length !== 0 &&
      confirmPassword === password
    ) {
      setIsPassword(true);
    }
    if (password !== "" && (password.length < 8 || password.length > 16)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
    if (
      password.length !== 0 &&
      confirmPassword.length !== 0 &&
      confirmPassword !== password
    ) {
      setIsPassword(false);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (userType) {
      navigate("/", { replace: true });
    }
  }, [navigate, userType]);

  const postData = async () => {
    try {
      // const formData = new FormData();
      // formData.append("image", image, image.name);
      // formData.append("name", image.name);

      const resp = await axios.post("/signup", {
        name,
        email,
        password,
        phoneNumber,
        hospitalName,
        dob,
        address,
        userTypee,
        // formData,
        doctorEmail,
      });

      console.log(resp);
      if (resp.status === 200) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = function (event) {
    event.preventDefault();
    postData();
  };

  return (
    <div className="bg-og-bg bg-contain">
      <div className="pt-3 ml-2">
        <Logo />
      </div>
      <div className="xxxs:flex xxxs:justify-center shadow-xl">
        {/* form div */}
        <div className="xxxs:w-[28rem] mx-5 ">
          <form
            className="mt-[3.3rem] shadow-2xl p-6 bg-[#FFF] rounded-md h-[880px] overflow-y-scroll scrollbar-none"
            onSubmit={submitHandler}
          >
            <Top />
            <div className="mt-8">
              <div
                className={`relative max-w-[22rem] border-b-[1.5px] mx-auto p-1 pl-0 ${
                  !isName ? "border-red-500" : "border-black"
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
                {!isName && (
                  <span className="text-red-500 absolute text-xs -top-2 right-0">
                    Invalid Name
                  </span>
                )}
              </div>
              <div
                className={`relative max-w-[22rem] mt-7 border-b-[1.5px]  ${
                  !isEmail ? "border-red-500" : "border-black"
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

                {!isEmail && (
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
                  placeholder="DD-MM-YYYY"
                  onChange={() => setDob(dobRef.current.value)}
                  type="text"
                  required
                />
              </div>
              <div className="max-w-[22rem] mt-7 relative  border-b-[1.5px] border-black mx-auto p-1 pl-0">
                <input
                  ref={hospitalNameRef}
                  className="outline-none block w-full"
                  value={hospitalName}
                  placeholder="Hospital Name"
                  onChange={() =>
                    setHospitalName(hospitalNameRef.current.value)
                  }
                  type="text"
                  required
                />
              </div>
              <div
                className={`max-w-[22rem] ${
                  !isPhoneNumber ? "border-red-500" : "border-black"
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
                {!isPhoneNumber && (
                  <span className="text-red-500 absolute text-xs -top-2 right-0">
                    Invalid Phone Number
                  </span>
                )}
              </div>
              {/* <div className="max-w-[22rem] mt-4  mx-auto p-1 pl-0">
                <label
                  htmlFor="formFile"
                  className="form-label inline-block mb-2 text-gray-400"
                >
                  Profile Picture
                </label>
                <input
                  className="form-control block text-gray-400 w-full px-3 py-1 text-base font-normal  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                  type="file"
                  id="formFile"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  accept="image/png, image/gif, image/jpeg"
                  required
                />
              </div> */}

              <div className="max-w-[22rem] mt-4 relative border-b-[1.5px] border-black mx-auto p-1 pl-0">
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

              <div
                className={`${
                  !isPassword ? "border-red-500" : "border-black"
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
                {!isPassword && (
                  <span className="text-red-500 absolute text-xs -top-2 right-0">
                    Invalid Password
                  </span>
                )}
              </div>
              <div
                className={`${
                  !isPassword ? "border-red-500" : "border-black"
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
                {!isPassword && (
                  <span className="text-red-500 absolute text-xs -top-2 right-0">
                    Invalid Password
                  </span>
                )}
              </div>

              <div className="flex mt-6 max-w-[22rem] mx-auto justify-between">
                {USER_TYPES.map((user, index) => {
                  return (
                    <div key={index + 1} className="form-check">
                      <input
                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#cfece8] checked:border-[#cfece8] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        value={user}
                        name="flexRadioDefault"
                        checked={userTypee === user}
                        id={"flexRadioDefault" + index}
                        onChange={radioChangeHandler}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800"
                        htmlFor={"flexRadioDefault" + index}
                      >
                        {user}
                      </label>
                    </div>
                  );
                })}
              </div>
              {userTypee === "Patient" && (
                <div
                  className={`relative max-w-[22rem] mt-7 border-b-[1.5px]  ${
                    !isDoctorEmail ? "border-red-500" : "border-black"
                  } mx-auto p-1 pl-0 `}
                >
                  <input
                    ref={doctorEmailRef}
                    className="outline-none block w-full"
                    value={doctorEmail}
                    type="email"
                    onChange={() =>
                      setDoctorEmail(doctorEmailRef.current.value)
                    }
                    placeholder="Doctor Email"
                    required
                  />

                  {!isDoctorEmail && (
                    <span className="text-red-500 absolute text-xs -top-2 right-0">
                      Invalid Mail Id
                    </span>
                  )}
                </div>
              )}
              <div>
                <div className="my-8">
                  <button
                    className={`${
                      isEmail &&
                      name.length !== 0 &&
                      password.length !== 0 &&
                      email.length !== 0 &&
                      phoneNumber.length !== 0 &&
                      isPassword &&
                      isPhoneNumber &&
                      isName
                        ? "opacity-100 hover:bg-slate-500 hover:scale-110 hover:text-gray-100 cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    } block max-w-[21rem] w-full transition ease-in-out mx-auto rounded-full p-2 bg-gray-100 border-slate-500 border  text-slate-500`}
                  >
                    Sign up
                  </button>
                </div>
                <div className="text-center flex justify-center -mt-4 text-sm">
                  Already have an account ?
                  <span className="ml-1 flex border-b-[1px] border-transparent hover:border-b-black transition-all duration-700 ease-out">
                    <Link to={"/login"} replace>
                      Log In
                    </Link>
                    <ArrowTopRightIcon className="ml-1 mt-[.25rem] w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </form>
          <Bottom />
        </div>
      </div>
    </div>
  );
};

export const Top = () => {
  return (
    <div>
      <h1 className="text-center text-3xl">Welcome !</h1>
      <p className="text-xs pt-1 text-gray-500 text-center">
        Please enter your details
      </p>
    </div>
  );
};

export const Bottom = () => {
  return (
    <div className="pt-[3.5rem] pb-4 w-sm max-w-[370px] mx-auto text-white">
      <h1 className="text-center text-xs">
        Virtual Reality Based Rehabilitation Device for Upper Extremity Stroke
        Survivors
      </h1>
      <p className="mt-1  text-center text-xs">Sponsored by DST - BDTD</p>
    </div>
  );
};

export default Login;
