import { useEffect, useRef, useState, useContext } from "react";
import axios from "./../api/axios";
import Serial from "../components/Serial";
import { GameNameContext } from "../ActiveGameContextProvider";
import "tw-elements";

const PomView = (props) => {
  const [ans, setAns] = useState([]);
  const { game, start, startHandler } = useContext(GameNameContext);
  const firstStart = useRef(true);
  const tick = useRef();

  const [timer, setTimer] = useState(0);
  // const [start, setStart] = useState(false);

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
  }, [props.timeInSeconds, start, timer]);

  const toggleStart = () => {
    startHandler(!start);
  };

  const addHandler = () => {
    if (!start) {
      setTimer(0);
      const obj = { game, timer, timeInHMS: getTime(timer) };
      setAns([...ans, obj]);
      console.log(ans);
    }
  };

  useEffect(() => {
    if (ans.length === 0) {
      console.log("Empty");
    } else {
      console.log(ans);
    }
  }, [ans]);

  const getTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const mins = Math.floor(seconds / 60);
    const _seconds = seconds % 60;

    return { hours, mins, _seconds };
  };

  const submit = async () => {
    console.log(start);
    try {
      console.log(ans);
      const res = await axios.post({ ans });

      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const clickHandler = async () => {
    if (start) {
      console.log(game);
      const obj = { game, timer, timeInHMS: getTime(timer) };
      setAns([...ans, obj]);
      setTimer(0);
    }
    startHandler(false);

    if (game) {
      submit();
    }
  };

  const displaySecondsAsMins = (seconds) => {
    const {
      //  hours,
      mins,
      _seconds,
    } = getTime(seconds);

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
      <div className="flex px-4 my-5 justify-center items-center">
        <div className="text-center">
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
        <div className="ml-4">
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
        <div className="ml-4 text-center">
          <button
            disabled={game === "" || start || timer === 0}
            onClick={addHandler}
            data-bs-toggle="modal"
            data-bs-target="#exampleModalLg"
            className={`text-xs sm:text-sm mx-auto w-[5rem] sm:inline-block shadow-md sm:my-0 transition ease-in-out px-5  py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 ${
              game === "" || start || timer === 0
                ? "opacity-50 cursor-not-allowed"
                : " opacity-100 hover:bg-slate-500 hover:scale-110 hover:text-gray-100 cursor-pointer"
            }`}
          >
            Add
          </button>
          <Modal />
        </div>
        <div className="text-center ml-4">
          <button
            onClick={clickHandler}
            disabled={ans.length === 0}
            className={`text-xs mr-3 sm:text-sm mx-auto w-[5rem] sm:inline-block shadow-md sm:my-0 transition ease-in-out py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 ${
              ans.length === 0
                ? "opacity-50 cursor-not-allowed"
                : " opacity-100 hover:bg-slate-500 hover:scale-110 hover:text-gray-100 cursor-pointer"
            }`}
          >
            Submit
          </button>
        </div>
        <div className="text-center ml-4">
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

const Timer = (props) => {
  const [level, setLevel] = useState(3);

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
              <IncreaseAndDecreaseButtons setLevel={setLevel} />
            </div>
          </div>
        </div>
        <PomView timeInSeconds={props.timeInSeconds} />
      </div>
    </section>
  );
};

const Input = (props) => {
  const { nameHandler } = useContext(GameNameContext);

  const radioChangeHandler = (event) => {
    nameHandler(event.target.value);
  };
  return (
    <div className="form-check pb-1">
      <input
        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#298e80] checked:border-[#298e80] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio"
        name="flexRadioDefault"
        onChange={radioChangeHandler}
        value={props.game}
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

const IncreaseAndDecreaseButtons = (props) => {
  const maxLevel = 5;
  const defaultLevel = 3;
  return (
    <div className="flex flex-col justify-center items-center mt-4 ">
      <div className="mb-0 sm:mb-4 ">
        <button
          onClick={() => {
            props.setLevel((prev) => {
              return prev === maxLevel ? prev : prev + 1;
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
            props.setLevel((prev) => {
              return prev === defaultLevel ? prev : prev - 1;
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

const Modal = () => {
  const JOINTS = ["Shoulder 1", "Shoulder 2", "Shoulder 3", "Elbow", "Wrist"];
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
            {JOINTS.map((ele, index) => {
              return (
                <div key={index + 1} className="flex">
                  <div>{ele}</div>
                  <div className="">
                    <div className="border-b-[1.5px] border-black ml-4  pl-0 ">
                      <input
                        className="outline-none block w-full"
                        placeholder="Min ROM"
                        type="text"
                        required
                      />
                    </div>
                    <div className="border-b-[1.5px] border-black ml-4 pl-0">
                      <input
                        className="outline-none block w-full"
                        placeholder="Max ROM"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="">
              <button className="opacity-100 hover:bg-slate-500 hover:scale-110 hover:text-gray-100 cursor-pointer block py-2 px-4 transition ease-in-out rounded-full bg-gray-100 border-slate-500 border  text-slate-500">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
