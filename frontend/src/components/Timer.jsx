import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "./../api/axios";
import Serial from "../components/Serial";
import { GameNameContext } from "../ActiveGameContextProvider";
import "tw-elements";

const getTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const mins = Math.floor(seconds / 60);
  const _seconds = seconds % 60;

  return { hours, mins, _seconds };
};

const Timer = (props) => {
  const { level } = useContext(GameNameContext);
  return (
    <section className="bg-white p-6 w-full overflow-y-scroll rounded-tl-2xl">
      <h1 className="text-3xl text-center">Timer</h1>
      <div className=" flex flex-col forTimer:flex-row justify-around my-6">
        <div className="py-2 flex flex-col forCard:flex-row forCard:justify-around  sm:justify-center items-center">
          <div className="flex flex-col md:flex-row mt-4 text-[15px] ">
            <div>
              <Input game="Bird Dodge" />
              <Input game="Burst" />
              <Input game="Block & Ball" />
              <Input game="Car Dodge" />
              <Input game="Copter Block" />
              <Input game="Drop balls" />
            </div>
            <div className="md:ml-3">
              <Input game="Hit Catch" />
              <Input game="Hurdles" />
              <Input game="Newton Balls" />
              <Input game="Trace" />
              <Input game="Veggie Pick" />
              <Input game="Windows" />
            </div>
          </div>
          <div className="p-3 flex flex-col mt-5 sm:mt-4 sm:mx-2">
            <div className="bg-gray-100 rounded-md p-3 sm:p-6 ">
              <h1 className="text-center text-xs sm:text-sm">
                Current Level: <span>{level}</span>
              </h1>
              <IncreaseAndDecreaseButtons />
            </div>
          </div>
        </div>
        <PomView timeInSeconds={props.timeInSeconds} />
      </div>
    </section>
  );
};

const PomView = (props) => {
  const { game, start, startHandler, ans, timer, setTimer } =
    useContext(GameNameContext);
  const firstStart = useRef(true);
  const tick = useRef();

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (start && timer !== props.timeInSeconds) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else {
      clearInterval(tick.current);
    }
    return () => clearInterval(tick.current);
  }, [props.timeInSeconds, setTimer, start, timer]);

  const toggleStart = () => {
    startHandler(!start);
  };

  // const clickHandler = async () => {
  //   if (start) {
  //     const timerr = timer;
  //     const obj = {
  //       roms: roms,
  //       game,
  //       timerr: timer,
  //       timeInHMS: getTime(timerr),
  //     };
  //     ansHandler([...ans, obj]);
  //     setTimer(0);
  //   }
  //   startHandler(false);
  // };

  const displaySecondsAsMins = (seconds) => {
    const { mins, _seconds } = getTime(seconds);

    return (
      <div className="flex flex-col xs:flex-row justify-center items-center">
        {/* <div className="bg-gray-200 p-3 px-2 w-[8rem] rounded-lg">
          {hours === 0 ? "" : hours.toString()}
        </div> */}
        <div className="xs:mt-0 xs:ml-6 bg-gray-200 p-3 px-2 w-[8rem] rounded-lg">
          {mins === 0 ? "00" : mins.toString()}
        </div>

        <div className="mt-6 xs:mt-0 xs:mx-6 bg-gray-200 p-3 px-2 w-[8rem] rounded-lg">
          {+_seconds === 0
            ? "00"
            : _seconds <= 9
            ? "0" + _seconds
            : _seconds.toString()}
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="text-8xl mt-3 mx-auto text-center rounded-xl">
        {displaySecondsAsMins(timer)}
      </div>
      <div className="flex flex-col sm:flex-row px-4 my-5 justify-center items-center">
        <div className="text-center ml-2 mb-4">
          <button
            disabled={game === ""}
            className={`text-xs sm:text-sm mx-auto w-[5rem] sm:inline-block shadow-md sm:my-0 transition ease-in-out px-5  py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 ${
              game === ""
                ? "opacity-50 cursor-not-allowed"
                : " opacity-100 hover:bg-slate-500 hover:scale-110 hover:text-gray-100 cursor-pointer"
            }`}
          >
            Play
          </button>
        </div>
        <div className="ml-4 mb-4">
          <button
            disabled={game === ""}
            className={`text-xs sm:text-sm mx-auto  w-[5rem] sm:inline-block shadow-md sm:my-0 transition ease-in-out px-5  py-3 rounded-full bg-gray-100 border-slate-500 border text-slate-500 
             ${
               game === ""
                 ? "opacity-50 cursor-not-allowed"
                 : " opacity-100 hover:bg-slate-500 hover:scale-110 hover:text-gray-100 cursor-pointer"
             }`}
            onClick={toggleStart}
          >
            {!start ? "Start" : "Stop"}
          </button>
        </div>
        <div className="ml-4 mb-4 text-center">
          <button
            type="button"
            disabled={game === "" || start || timer === 0}
            className={`px-6 leading-tight text-xs sm:text-sm mx-auto w-[5rem] sm:inline-block shadow-md sm:my-0 transition ease-in-out   py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 ${
              game === "" || start || timer === 0
                ? "opacity-50 cursor-not-allowed"
                : " opacity-100 hover:bg-slate-500 hover:scale-110 hover:text-gray-100 cursor-pointer"
            }`}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add
          </button>
          <Modal />
        </div>
        <div className="text-center ml-4 mb-4">
          <button
            type="button"
            // onClick={clickHandler}
            disabled={ans.length === 0}
            className={`text-xs mr-3 sm:text-sm mx-auto w-[5rem] sm:inline-block shadow-md sm:my-0 transition ease-in-out py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 ${
              ans.length === 0
                ? "opacity-50 cursor-not-allowed"
                : " opacity-100 hover:bg-slate-500 hover:scale-110 hover:text-gray-100 cursor-pointer"
            }`}
            data-bs-toggle="modal"
            data-bs-target="#exampleModalLg"
          >
            Submit
          </button>
          <ModalSubmit />
        </div>
        <div className="text-center ml-2 mb-4">
          <button
            disabled={game === "" || timer === 0}
            onClick={() => {
              setTimer(0);
            }}
            className={`text-xs sm:text-sm mx-auto -ml-3 w-[5rem] sm:inline-block shadow-md sm:my-0 transition ease-in-out py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 ${
              game === "" || timer === 0
                ? "opacity-50 cursor-not-allowed"
                : " opacity-100 hover:bg-slate-500 hover:scale-110 hover:text-gray-100 cursor-pointer"
            }`}
          >
            Clear
          </button>
        </div>
      </div>
      <div>
        <Serial start={start} />
      </div>
    </div>
  );
};

const Input = (props) => {
  const { nameHandler, game, levelHandler } = useContext(GameNameContext);

  const radioChangeHandler = (event) => {
    nameHandler(event.target.value);
    levelHandler(0);
  };
  return (
    <div className="form-check pb-1">
      <input
        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#298e80] checked:border-[#298e80] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio"
        name="flexRadioDefault"
        onChange={radioChangeHandler}
        value={props.game}
        checked={game === props.game}
        id={props.game.toLowerCase().replace(" ", "")}
      />
      <label
        className="form-check-label inline-block text-gray-800"
        htmlFor={props.game.toLowerCase().replace(" ", "")}
      >
        {props.game}
      </label>
    </div>
  );
};

const IncreaseAndDecreaseButtons = () => {
  const { levelHandler } = useContext(GameNameContext);
  return (
    <div className="flex flex-col justify-center items-center mt-4 ">
      <div className="mb-0 sm:mb-4 ">
        <button
          onClick={() => {
            levelHandler((prev) => {
              return prev + 1;
            });
          }}
          className="text-xs sm:text-sm block m-4 shadow-md sm:my-0 transition ease-in-out hover:scale-110  px-3 sm:px-5 py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100"
        >
          Increase Level
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            levelHandler((prev) => {
              return prev <= 0 ? 0 : prev - 1;
            });
          }}
          className="text-xs sm:text-sm block m-4 shadow-md sm:my-0 transition ease-in-out hover:scale-110 px-3 sm:px-5  py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100"
        >
          Decrease Level
        </button>
      </div>
    </div>
  );
};

const Modal = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const { romsHandler, setTimer, game, timer, ansHandler, level, ans, roms } =
    useContext(GameNameContext);

  const [shoulderOne, setShoulderOne] = useState({
    minRom: "",
    maxRom: "",
  });
  const [shoulderTwo, setShoulderTwo] = useState({ minRom: "", maxRom: "" });
  const [shoulderThree, setShoulderThree] = useState({
    minRom: "",
    maxRom: "",
  });
  const [elbow, setElbow] = useState({ minRom: "", maxRom: "" });
  const [wrist, setWrist] = useState({ minRom: "", maxRom: "" });

  useEffect(() => {
    if (
      shoulderOne.minRom === "" ||
      shoulderOne.maxRom === "" ||
      shoulderTwo.minRom === "" ||
      shoulderTwo.maxRom === "" ||
      shoulderThree.minRom === "" ||
      shoulderThree.maxRom === "" ||
      elbow.minRom === "" ||
      elbow.maxRom === "" ||
      wrist.minRom === "" ||
      wrist.maxRom === ""
    ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [shoulderOne, shoulderTwo, shoulderThree, elbow, wrist]);

  useEffect(() => {
    if (roms.length !== 0 && timer !== 0 && game !== "") {
      const o = {
        [game]: {
          timer: JSON.parse(JSON.stringify(timer)),
          timeInHMS: getTime(timer),
          roms: JSON.parse(JSON.stringify(roms)),
          level: JSON.parse(JSON.stringify(level)),
        },
      };
      ansHandler([...ans, o]);
    }
    console.log(ans);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roms]);

  const submitHandler = (e) => {
    if (isEmpty || submitted || !game) return;

    romsHandler([shoulderOne, shoulderTwo, shoulderThree, elbow, wrist]);
    setSubmitted(true);
  };

  const closeHandler = (e) => {
    e.preventDefault();
    shoulderOne.minRom = "";
    shoulderOne.maxRom = "";
    shoulderTwo.minRom = "";
    shoulderTwo.maxRom = "";
    shoulderThree.minRom = "";
    shoulderThree.maxRom = "";
    elbow.minRom = "";
    elbow.maxRom = "";
    wrist.minRom = "";
    wrist.maxRom = "";
    setTimer(0);
    setIsEmpty(true);
    setSubmitted(false);
  };

  return (
    <div
      className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalLabel"
            >
              Enter Patient Details
            </h5>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body relative p-4">
            {props.children}

            <div className=" px-3">
              <div className="w-[100px] text-left text-base font-medium">
                Shoulder 1
              </div>
              <div className="flex my-2">
                <div className="border-b-[1.5px] border-black mr-5">
                  <input
                    className="outline-none block w-full placeholder:text-gray-300"
                    placeholder="Min Rom"
                    type="text"
                    value={shoulderOne.minRom}
                    onChange={(e) => {
                      const minRom = e.target.value;
                      setShoulderOne((prev) => ({ ...prev, minRom }));
                    }}
                    required
                  />
                </div>
                <div className="border-b-[1.5px] border-black ml-4">
                  <input
                    className="outline-none block w-full placeholder:text-gray-300"
                    placeholder="Max ROM"
                    type="text"
                    value={shoulderOne.maxRom}
                    onChange={(e) => {
                      const maxRom = e.target.value;
                      setShoulderOne((prev) => ({ ...prev, maxRom }));
                    }}
                    required
                  />
                </div>
              </div>
              <div className="w-[100px] text-left text-base font-medium">
                Shoulder 2
              </div>
              <div className="flex my-2">
                <div className="border-b-[1.5px] border-black pl-0 mr-5">
                  <input
                    className="outline-none block w-full placeholder:text-gray-300"
                    placeholder="Min Rom"
                    type="text"
                    value={shoulderTwo.minRom}
                    onChange={(e) => {
                      const minRom = e.target.value;
                      setShoulderTwo((prev) => ({ ...prev, minRom }));
                    }}
                    required
                  />
                </div>
                <div className="border-b-[1.5px] border-black ml-4 pl-0">
                  <input
                    className="outline-none block w-full placeholder:text-gray-300"
                    placeholder="Max ROM"
                    type="text"
                    value={shoulderTwo.maxRom}
                    onChange={(e) => {
                      const maxRom = e.target.value;
                      setShoulderTwo((prev) => ({ ...prev, maxRom }));
                    }}
                    required
                  />
                </div>
              </div>
              <div className="w-[100px] text-left text-base font-medium">
                Shoulder 3
              </div>
              <div className="flex my-2">
                <div className="border-b-[1.5px] border-black mr-5 pl-0 ">
                  <input
                    className="outline-none block w-full placeholder:text-gray-300"
                    placeholder="Min Rom"
                    type="text"
                    value={shoulderThree.minRom}
                    onChange={(e) => {
                      const minRom = e.target.value;
                      setShoulderThree((prev) => ({ ...prev, minRom }));
                    }}
                    required
                  />
                </div>
                <div className="border-b-[1.5px] border-black ml-4 pl-0">
                  <input
                    className="outline-none block w-full placeholder:text-gray-300"
                    placeholder="Max ROM"
                    type="text"
                    value={shoulderThree.maxRom}
                    onChange={(e) => {
                      const maxRom = e.target.value;
                      setShoulderThree((prev) => ({ ...prev, maxRom }));
                    }}
                    required
                  />
                </div>
              </div>
              <div className="w-[100px] text-left text-base font-medium">
                Elbow
              </div>
              <div className="flex my-2">
                <div className="border-b-[1.5px] border-black mr-5 pl-0 ">
                  <input
                    className="outline-none block w-full placeholder:text-gray-300"
                    placeholder="Min Rom"
                    type="text"
                    value={elbow.minRom}
                    onChange={(e) => {
                      const minRom = e.target.value;
                      setElbow((prev) => ({ ...prev, minRom }));
                    }}
                    required
                  />
                </div>
                <div className="border-b-[1.5px] border-black ml-4 pl-0">
                  <input
                    className="outline-none block w-full placeholder:text-gray-300"
                    placeholder="Max ROM"
                    type="text"
                    value={elbow.maxRom}
                    onChange={(e) => {
                      const maxRom = e.target.value;
                      setElbow((prev) => ({ ...prev, maxRom }));
                    }}
                    required
                  />
                </div>
              </div>
              <div className="w-[100px] text-left text-base font-medium">
                Wrist
              </div>
              <div className="flex my-2">
                <div className="border-b-[1.5px] border-black mr-5 pl-0 ">
                  <input
                    className="outline-none block w-full placeholder:text-gray-300"
                    placeholder="Min Rom"
                    type="text"
                    value={wrist.minRom}
                    onChange={(e) => {
                      const minRom = e.target.value;
                      setWrist((prev) => ({ ...prev, minRom }));
                    }}
                    required
                  />
                </div>
                <div className="border-b-[1.5px] border-black ml-4 pl-0">
                  <input
                    className="outline-none block w-full placeholder:text-gray-300"
                    placeholder="Max ROM"
                    type="text"
                    value={wrist.maxRom}
                    onChange={(e) => {
                      const maxRom = e.target.value;
                      setWrist((prev) => ({ ...prev, maxRom }));
                    }}
                    required
                  />
                </div>
              </div>
              {isEmpty && (
                <div className="mt-4">
                  <p className="text-red-500">Enter all the values!</p>
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button
              type="button"
              onClick={closeHandler}
              className="text-xs sm:text-sm p-4 sm:inline-block shadow-md sm:my-0 transition ease-in-out py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:scale-110 hover:text-gray-100 cursor-pointer"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              onClick={submitHandler}
              className="text-xs sm:text-sm p-4 ml-4  sm:inline-block shadow-md sm:my-0 transition ease-in-out py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500   hover:bg-slate-500 hover:scale-110 hover:text-gray-100 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalSubmit = () => {
  const [submitted, setSubmitted] = useState(false);
  const { ansHandler, ans, nameHandler, game, levelHandler } =
    useContext(GameNameContext);
  const [jointSelected, setJointSelected] = useState([]);

  const [assessmentMeth, setAssessmentMeth] = useState({
    shoulder1: "",
    shoulder2: "",
    shoulder3: "",
    elbow: "",
    wrist: "",
  });
  const [score, setScore] = useState({
    shoulder1: "",
    shoulder2: "",
    shoulder3: "",
    elbow: "",
    wrist: "",
  });
  const [outOf, setOutOf] = useState({
    shoulder1: "",
    shoulder2: "",
    shoulder3: "",
    elbow: "",
    wrist: "",
  });

  const closeHandler = () => {
    setAssessmentMeth({
      shoulder1: "",
      shoulder2: "",
      shoulder3: "",
      elbow: "",
      wrist: "",
    });
    setScore({
      shoulder1: "",
      shoulder2: "",
      shoulder3: "",
      elbow: "",
      wrist: "",
    });
    setOutOf({
      shoulder1: "",
      shoulder2: "",
      shoulder3: "",
      elbow: "",
      wrist: "",
    });
    ansHandler([]);
    setJointSelected([]);
    setSubmitted(false);
    nameHandler("");
    levelHandler(0);
  };

  // useEffect(() => {
  //   console.log(ans);
  // }, [ans]);

  const submitHandler = async () => {
    const data = jointSelected.map((ele) => {
      const e = ele.toLowerCase().replace(/\s/g, "");
      const obj = {
        [e]: {
          assessmentMeth: assessmentMeth[e],
          score: score[e],
          outOf: outOf[e],
          percentage: ((+score[e] / +outOf[e]) * 100).toFixed(2),
        },
      };
      return obj;
    });

    try {
      if (submitted) return;
      if (!game) return;
      const resp = await axios.post("/patient/submitNewSession", {
        ans: [...ans, { feedback: data }],
      });
      if (resp.status === 200) {
        closeHandler();
        setJointSelected([]);
        setSubmitted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
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
              Feedback
            </h5>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body relative px-6">
            <div className="flex flex-col">
              <div className="overflow-x-scroll block min-w-full rounded-md scrollbar-thin scrollbar-thumb-[#389387] scrollbar-track-[#cfece8] scrollbar-thumb-rounded-full sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-white border-b">
                        <tr>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Joint
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Assessment Methodology
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Score
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Out of
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Percentage of Score
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex">
                            <input
                              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-[#298e80]
                              checked:border-[#298e80] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              value={"Shoulder 1"}
                              type="checkbox"
                              checked={
                                jointSelected.length !== 0 &&
                                jointSelected.indexOf("Shoulder 1") > -1
                                  ? true
                                  : false
                              }
                              id={"flexCheckDefaultShoulder1"}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setJointSelected([
                                    ...jointSelected,
                                    "Shoulder 1",
                                  ]);
                                } else {
                                  const filtered = jointSelected.filter(
                                    (ele) => ele !== "Shoulder 1"
                                  );

                                  setJointSelected([...filtered]);
                                }
                              }}
                            />
                            <label
                              className="form-check-label inline-block text-gray-800"
                              htmlFor={"flexCheckDefaultShoulder1"}
                            >
                              Shoulder 1
                            </label>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              name="flexRadioDefault"
                              id={"flexRadioDefaultShoulder1"}
                              value={assessmentMeth.shoulder1}
                              onChange={(e) => {
                                const shoulder1 = e.target.value;
                                setAssessmentMeth({
                                  ...assessmentMeth,
                                  shoulder1,
                                });
                              }}
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              value={score.shoulder1}
                              onChange={(e) => {
                                const shoulder1 = e.target.value;
                                setScore({
                                  ...score,
                                  shoulder1,
                                });
                              }}
                              placeholder=""
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              value={outOf.shoulder1}
                              onChange={(e) => {
                                const shoulder1 = e.target.value;
                                setOutOf({
                                  ...outOf,
                                  shoulder1,
                                });
                              }}
                              placeholder=""
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <div>
                              {" "}
                              {assessmentMeth.shoulder1 &&
                                score.shoulder1 &&
                                outOf.shoulder1 &&
                                (
                                  (score.shoulder1 / outOf.shoulder1) *
                                  100
                                ).toFixed(2) + "%"}
                            </div>
                          </td>
                        </tr>
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex">
                            <input
                              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-[#298e80]
                              checked:border-[#298e80] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              value={"Shoulder 2"}
                              type="checkbox"
                              checked={
                                jointSelected.indexOf("Shoulder 2") > -1
                                  ? true
                                  : false
                              }
                              id={"flexCheckDefaultShoulder2"}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setJointSelected([
                                    ...jointSelected,
                                    "Shoulder 2",
                                  ]);
                                } else {
                                  const filtered = jointSelected.filter(
                                    (ele) => ele !== "Shoulder 2"
                                  );
                                  setJointSelected([...filtered]);
                                }
                              }}
                            />
                            <label
                              className="form-check-label inline-block text-gray-800"
                              htmlFor={"flexCheckDefaultShoulder2"}
                            >
                              Shoulder 2
                            </label>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              placeholder=""
                              value={assessmentMeth.shoulder2}
                              name="flexRadioDefault"
                              id={"flexRadioDefaultShoulder2"}
                              onChange={(e) => {
                                const shoulder2 = e.target.value;
                                setAssessmentMeth({
                                  ...assessmentMeth,
                                  shoulder2,
                                });
                              }}
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              value={score.shoulder2}
                              onChange={(e) => {
                                const shoulder2 = e.target.value;
                                setScore({
                                  ...score,
                                  shoulder2,
                                });
                              }}
                              placeholder=""
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              value={outOf.shoulder2}
                              onChange={(e) => {
                                const shoulder2 = e.target.value;
                                setOutOf({
                                  ...outOf,
                                  shoulder2,
                                });
                              }}
                              placeholder=""
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <div>
                              {" "}
                              {assessmentMeth.shoulder2 &&
                                score.shoulder2 &&
                                outOf.shoulder2 &&
                                (
                                  (score.shoulder2 / outOf.shoulder2) *
                                  100
                                ).toFixed(2) + "%"}
                            </div>
                          </td>
                        </tr>
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex">
                            <input
                              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-[#298e80]
                              checked:border-[#298e80] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              value={"Shoulder 3"}
                              type="checkbox"
                              id={"flexCheckDefaultShoulder3"}
                              checked={
                                jointSelected.indexOf("Shoulder 3") > -1
                                  ? true
                                  : false
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setJointSelected([
                                    ...jointSelected,
                                    "Shoulder 3",
                                  ]);
                                } else {
                                  const filtered = jointSelected.filter(
                                    (ele) => ele !== "Shoulder 3"
                                  );
                                  setJointSelected([...filtered]);
                                }
                              }}
                            />
                            <label
                              className="form-check-label inline-block text-gray-800"
                              htmlFor={"flexCheckDefaultShoulder3"}
                            >
                              Shoulder 3
                            </label>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              placeholder=""
                              value={assessmentMeth.shoulder3}
                              name="flexRadioDefault"
                              id={"flexRadioDefaultShoulder3"}
                              onChange={(e) => {
                                const shoulder3 = e.target.value;
                                setAssessmentMeth({
                                  ...assessmentMeth,
                                  shoulder3,
                                });
                              }}
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              value={score.shoulder3}
                              onChange={(e) => {
                                const shoulder3 = e.target.value;
                                setScore({
                                  ...score,
                                  shoulder3,
                                });
                              }}
                              placeholder=""
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              value={outOf.shoulder3}
                              onChange={(e) => {
                                const shoulder3 = e.target.value;
                                setOutOf({
                                  ...outOf,
                                  shoulder3,
                                });
                              }}
                              placeholder=""
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <div>
                              {" "}
                              {assessmentMeth.shoulder3 &&
                                score.shoulder3 &&
                                outOf.shoulder3 &&
                                (
                                  (score.shoulder3 / outOf.shoulder3) *
                                  100
                                ).toFixed(2) + "%"}
                            </div>
                          </td>
                        </tr>
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex">
                            <input
                              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-[#298e80]
                              checked:border-[#298e80] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              value={"Elbow"}
                              type="checkbox"
                              id={"flexCheckDefaultElbow"}
                              checked={
                                jointSelected.indexOf("Elbow") > -1
                                  ? true
                                  : false
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setJointSelected([...jointSelected, "Elbow"]);
                                } else {
                                  const filtered = jointSelected.filter(
                                    (ele) => ele !== "Elbow"
                                  );
                                  setJointSelected([...filtered]);
                                }
                              }}
                            />
                            <label
                              className="form-check-label inline-block text-gray-800"
                              htmlFor={"flexCheckDefaultElbow"}
                            >
                              Elbow
                            </label>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              value={assessmentMeth.elbow}
                              type="text"
                              name="flexRadioDefault"
                              id={"flexRadioDefaultElbow"}
                              onChange={(e) => {
                                const elbow = e.target.value;
                                setAssessmentMeth({
                                  ...assessmentMeth,
                                  elbow,
                                });
                              }}
                              placeholder=""
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              value={score.elbow}
                              onChange={(e) => {
                                const elbow = e.target.value;
                                setScore({
                                  ...score,
                                  elbow,
                                });
                              }}
                              placeholder=""
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              value={outOf.elbow}
                              onChange={(e) => {
                                const elbow = e.target.value;
                                setOutOf({
                                  ...outOf,
                                  elbow,
                                });
                              }}
                              placeholder=""
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <div>
                              {" "}
                              {assessmentMeth.elbow &&
                                score.elbow &&
                                outOf.elbow &&
                                ((score.elbow / outOf.elbow) * 100).toFixed(2) +
                                  "%"}
                            </div>
                          </td>
                        </tr>
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex ">
                            <input
                              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-[#298e80]
                               checked:border-[#298e80] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              type="checkbox"
                              checked={
                                jointSelected.indexOf("Wrist") > -1
                                  ? true
                                  : false
                              }
                              id="flexCheckDefaultWrist"
                              value={"Wrist"}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setJointSelected([...jointSelected, "Wrist"]);
                                } else {
                                  const filtered = jointSelected.filter(
                                    (ele) => ele !== "Wrist"
                                  );
                                  setJointSelected([...filtered]);
                                }
                              }}
                            />
                            <label
                              className="form-check-label inline-block text-gray-800"
                              htmlFor={"flexCheckDefaultWrist"}
                            >
                              Wrist
                            </label>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              placeholder=""
                              required
                              value={assessmentMeth.wrist}
                              name="flexRadioDefault"
                              id={"flexRadioDefaultWrist"}
                              onChange={(e) => {
                                const wrist = e.target.value;
                                setAssessmentMeth({
                                  ...assessmentMeth,
                                  wrist,
                                });
                              }}
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              value={score.wrist}
                              onChange={(e) => {
                                const wrist = e.target.value;
                                setScore({
                                  ...score,
                                  wrist,
                                });
                              }}
                              placeholder=""
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <input
                              className="outline-none block w-full"
                              type="text"
                              value={outOf.wrist}
                              onChange={(e) => {
                                const wrist = e.target.value;
                                setOutOf({
                                  ...outOf,
                                  wrist,
                                });
                              }}
                              placeholder=""
                              required
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <div>
                              {assessmentMeth.wrist &&
                                score.wrist &&
                                outOf.wrist &&
                                ((score.wrist / outOf.wrist) * 100).toFixed(2) +
                                  "%"}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex my-4 justify-center items-center">
                    <div className="mr-4">
                      <button
                        type="button"
                        onClick={submitHandler}
                        className="text-xs sm:text-sm p-4 sm:inline-block shadow-md sm:my-0 transition ease-in-out py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:scale-110 hover:text-gray-100 cursor-pointer"
                      >
                        Submit
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={closeHandler}
                        className="text-xs sm:text-sm p-4 sm:inline-block shadow-md sm:my-0 transition ease-in-out py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:scale-110 hover:text-gray-100 cursor-pointer "
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
