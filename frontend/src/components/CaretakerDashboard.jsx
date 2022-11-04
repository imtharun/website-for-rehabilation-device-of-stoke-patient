import React, { useRef, useState, useEffect, useContext } from "react";
import { getAge } from "./DoctorDashboard";
import { TimeAndDate } from "./PatientDashboard";
import profile from "./../assets/default-profile-pic.png";
import axios from "../api/axios";
import { GameNameContext } from "../ActiveGameContextProvider";
import { UserTypeContext } from "../UserContextProvider";
import Table from "./Table";
import Recovery from "./Recovery";

const CaretakerDashboard = () => {
  const searchRef = useRef();
  const [searchName, setSearchName] = useState("");
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("/caretaker/dashboard");
      console.log(res);
      setData(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    document.title = "Caretaker";
    getData();
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchName(searchRef.current.value);
    console.log(searchName);
  };

  return (
    <section className="rounded-tl-2xl bg-white p-3 pt-6 sm:p-4 w-full overflow-y-scroll">
      <TimeAndDate />
      <div className="-mt-3">
        <div>
          <h1 className="text-center my-6 text-2xl">Search Patients</h1>
        </div>
        <div>
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                <input
                  ref={searchRef}
                  type="search"
                  value={searchName}
                  onChange={searchHandler}
                  className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#17e1c6] active:border-[#17e1c6] focus:outline-none"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn  px-6 py-2.5 bg-[#4cbdae] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#17e1c6] hover:shadow-lg focus:bg-[#17e1c6] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#17e1c6] active:shadow-lg transition duration-150 ease-in-out flex items-center"
                  type="button"
                  id="button-addon2"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    className="w-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center   xxxs:ml-6 my-2  flex-1 flex-wrap">
        {searchName.length !== 0 ? (
          data.filter((ele) => {
            return ele.patient_name
              .toLowerCase()
              .includes(searchName.toLowerCase());
          }).length !== 0 ? (
            data
              .filter((ele) => {
                return ele.patient_name
                  .toLowerCase()
                  .includes(searchName.toLowerCase());
              })
              .map((ele, index) => {
                return <PatientCard key={index + 1} ele={ele} />;
              })
          ) : (
            <div className="mx-auto text-gray-400">No Patient found!</div>
          )
        ) : (
          data.map((ele, index) => {
            return (
              <PatientCard key={index + 1} ele={ele} email={ele.patient_id} />
            );
          })
        )}
      </div>
    </section>
  );
};

const PatientCard = (props) => {
  const { patientHandler } = useContext(GameNameContext);

  const get = async (email) => {
    console.log("getting", email);
    try {
      const data = await axios.post("/doctor/patientdetails", {
        email,
      });
      patientHandler(data.data);
      // setPatientData([]);
    } catch (error) {
      console.log(error);
    }
  };

  const clear = () => {
    patientHandler([]);
  };

  const clickHandler = (email) => {
    get(email);
  };

  return (
    <div className="bg-gray-100 rounded-md mx-2 my-2 max-w-[26rem]">
      <div className="flex flex-col xs:flex-row px-4 py-2 ">
        <div className="self-center mt-4">
          <img
            className="w-[90px] h-[90px] rounded-full "
            src={props.ele?.profile || profile}
            alt="Profile"
          />
        </div>
        <div className="text-center xs:text-left pl-3 pt-4">
          <div>
            <h1 className="text-base font-medium">
              {props.ele.patient_name.charAt(0).toUpperCase() +
                props.ele.patient_name.slice(1)}
            </h1>
            <small className="text-xs text-gray-500 block -pt-3">
              {getAge(props.ele.patient_dob)} years old
            </small>
          </div>
          <div className="pt-2 text-center xs:text-left">
            <p className="text-sm">Email: </p>
            <div className="">
              <span className="block text-[0.8rem] mr-2">
                {props.ele.patient_id}
              </span>
            </div>
          </div>

          <div className="pt-2 text-center xs:text-left">
            <p className="text-sm">Monitor Doctor: </p>
            <div className="">
              <span className="block text-[0.8rem] mr-2">
                {props.ele.doctor_name}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid mt-2 p-4 pb-2 justify-items-center xs:justify-items-end">
        <button
          type="button"
          onClick={() => {
            clickHandler(props.email);
          }}
          className=" mr-3 mb-2 inline-block font-medium  transition ease-in-out hover:scale-110 bg-gray-100 border-slate-500 border text-slate-500 hover:bg-slate-500 hover:text-gray-100 shadow-sm px-3 text-sm py-2 rounded-full "
          data-bs-toggle="modal"
          data-bs-target="#exampleModalLg"
        >
          More info
        </button>
        <Modal />
      </div>
    </div>
  );
};

export const Modal = (props) => {
  const { userType } = useContext(UserTypeContext);
  const { patientData } = useContext(GameNameContext);

  console.log(patientData);

  return (
    <div
      className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-y-scroll"
      id="exampleModalLg"
      tabIndex="-1"
      aria-labelledby="exampleModalLgLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalLgLabel"
            >
              Patient's Session Details
            </h5>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body relative p-4">
            {userType === "doctor" && patientData.length === 0 ? (
              <p>No user data found</p>
            ) : (
              <SessionCardForCaretaker values={patientData.data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SessionCardForCaretaker = (props) => {
  const { patientData } = useContext(GameNameContext);

  const jointInfo = {
    "bird dodge":
      "Fingers and Palm – closing & opening, Wrist – Flexion/Extension",
    burst: "Fingers and Palm – closing & opening",
    "block & ball":
      "Shoulder – Horizontal Abduction/Adduction, Elbow – Flexion/Extension",
    "car dodge": "Shoulder – Horizontal Abduction/Adduction",
    "copter block": "Shoulder – Vertical Abduction/Adduction",
    "drop balls":
      "Shoulder – Vertical Abduction/Adduction & Horizontal Abduction/Adduction",
    "hit catch":
      "Shoulder – Flexion/Extension & Abduction/Adduction, Elbow – Flexion/Extension",
    hurdles: "Elbow – Flexion/Extension",
    "Newton Balls": "Shoulder – Horizontal Abduction/Adduction",

    trace:
      "Shoulder – Flexion/Extension, Horizontal & Vertical Abduction/Adduction",
    "veggie pick":
      "Palm and fingers – gripping and grasping, Elbow – internal rotation",
    windows: "Wrist – Flexion/Extension, Elbow – Flexion/Extension",
  };
  const cols = [
    "Game name",
    "Joints",
    ["Shoulder 1", "Shoulder 2", "Shoulder 3", "Elbow", "Wrist"],
    "Duration (in mins)",
    "Current Level",
  ];

  let size = patientData?.length;
  return (
    <div className="flex flex-col my-3 justify-center item-center">
      {patientData?.reverse()?.map((ele, index) => {
        const sess = "session" + (size - index);
        if (size - index === 0) return "";
        const percentage = ele.percentage;
        const rows = [];
        ele[sess]?.forEach((game) => {
          const gameName = Object.keys(game)[0];
          if (gameName === "feedback") return;
          const row = {
            gameName: gameName,
            timeDuration: game[gameName]["timer"],
            currentLevel: game[gameName]["level"],
            roms: game[gameName]["roms"],
            joints: jointInfo[gameName.toLowerCase()],
          };
          rows.push(JSON.parse(JSON.stringify(row)));
        });
        return (
          <div
            key={index + 1}
            className="w-full bg-gray-300 p-2 my-2 rounded-md"
          >
            <h1 className="text-sm sm:text-lg font-medium pl-4 pt-2">
              Session {size - index}
            </h1>
            <Table key={index + 1} cols={cols} rows={rows} />
            <Buttons percentage={percentage} />
          </div>
        );
      })}
    </div>
  );
};

const Buttons = (props) => {
  return (
    <div className="flex flex-col xxxs:flex-row xxxs:justify-between p-4 pt-0 -mx-2  ">
      <div className="w-full">
        <Recovery percentage={props.percentage} />
      </div>
    </div>
  );
};

export default CaretakerDashboard;
