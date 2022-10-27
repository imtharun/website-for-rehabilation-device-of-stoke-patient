import React, { useRef, useState, useEffect } from "react";
import profile from "./../assets/default-profile-pic.png";
import SessionCard from "./SessionCard";
import { TimeAndDate } from "./PatientDashboard";

const patientData = [
  {
    name: "D k Suryah ",
    Age: 81,
    caretakers: ["Adhithya sdfsdfs", "Karikala dasdasda", "Pooniyin Selvan"],
    profile: profile,
  },
  {
    name: "Yuvarraj",
    Age: 81,
    caretakers: ["Adhithya", "Karikala", "Pooniyin Selvan"],
    profile: profile,
  },
  {
    name: "Yuvarraj",
    Age: 81,
    caretakers: ["Adhithya sdfsdfs", "Karikala", "Pooniyin Selvan"],
    profile: profile,
  },
  {
    name: "Shivanesh",
    Age: 81,
    caretakers: ["Adhithya", "Karikala", "Pooniyin Selvan"],
    profile: profile,
  },
  {
    name: "Shivanesh",
    Age: 81,
    caretakers: ["Adhithya", "Karikala", "Pooniyin Selvan"],
    profile: profile,
  },
];

const DoctorDashboard = () => {
  const searchRef = useRef();
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    document.title = "Doctor";
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
          patientData.filter((ele) => {
            return ele.name.toLowerCase().includes(searchName.toLowerCase());
          }).length !== 0 ? (
            patientData
              .filter((ele) => {
                return ele.name
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
          patientData.map((ele, index) => {
            return <PatientCard key={index + 1} ele={ele} />;
          })
        )}
      </div>
    </section>
  );
};

const PatientCard = ({ ele }) => {
  return (
    <div className="bg-gray-100 rounded-md mx-2 my-2 max-w-[25rem]">
      <div className="flex flex-col xs:flex-row px-4 py-2 ">
        <div className="self-center mt-4">
          <img
            className="w-[90px] h-[90px] rounded-full "
            src={ele.profile}
            alt="Profile"
          />
        </div>
        <div className="text-center xs:text-left pl-3 pt-4">
          <div>
            <h1 className="text-base font-medium">{ele.name}</h1>
            <small className="text-xs text-gray-500 block -pt-3">
              {ele.Age} years old
            </small>
          </div>
          <div className="pt-2 text-center xs:text-left">
            <p className="text-base">Caretakers: </p>
            <div className="flex flex-wrap max-w-[17rem] h-[2rem] max-h-2rem justify-center xs:justify-start">
              {ele.caretakers.map((caretaker, index) => {
                const size = ele.caretakers.length;
                if (index !== size - 1) {
                  return (
                    <span key={index + 1} className="block text-[0.8rem] mr-2">
                      {caretaker},{" "}
                    </span>
                  );
                } else {
                  return (
                    <span key={index + 1} className="block text-[0.8rem] mr-2">
                      and {caretaker}{" "}
                    </span>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="grid justify-items-center xs:justify-items-end">
        <button
          type="button"
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

export const Modal = () => {
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
            <SessionCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
