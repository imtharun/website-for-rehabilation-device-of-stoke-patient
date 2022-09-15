import { useEffect, useRef, useState } from "react";
import axios from "./../api/axios";
import Serial from "../components/Serial";
import "tw-elements";

const PomView = (props) => {
  const firstStart = useRef(true);
  const tick = useRef();

  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState(false);

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
    setStart(!start);
  };

  const getTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const mins = Math.floor(seconds / 60);
    const _seconds = seconds % 60;

    return { hours, mins, _seconds };
  };

  const submit = async (totalTrainedTime, totalTrainedTimeInHMS) => {
    try {
      const res = await axios.post({
        totalTrainedTime,
        totalTrainedTimeInHMS,
      });

      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const clickHandler = () => {
    setStart(false);

    console.log(timer, getTime(timer));
    submit(timer, getTime(timer));
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
        <div className="mt-6 xs:mt-0 xs:ml-6 bg-gray-200 p-3 px-2 w-[8rem] rounded-lg">
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
      <div className="flex px-4 my-5 justify-center">
        <div className="">
          <button
            className="text-xs sm:text-sm mx-auto -ml-3 w-[5rem] sm:inline-block shadow-md sm:my-0 transition ease-in-out hover:scale-110  px-5  py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100"
            onClick={toggleStart}
          >
            {!start ? "Start" : "Stop"}
          </button>
        </div>
        <div className="text-center ml-6">
          <button
            onClick={clickHandler}
            className="text-xs sm:text-sm mx-auto -ml-3 w-[5rem] sm:inline-block shadow-md sm:my-0 transition ease-in-out hover:scale-110 py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100"
          >
            Submit
          </button>
        </div>
        <div className="text-center ml-6">
          <button
            onClick={() => {
              setTimer(0);
            }}
            className="text-xs sm:text-sm mx-auto -ml-3 w-[5rem] sm:inline-block shadow-md sm:my-0 transition ease-in-out hover:scale-110 py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100"
          >
            Clear
          </button>
        </div>
      </div>
      <div>
        <Serial />
      </div>
    </div>
  );
};

const Timer = (props) => {
  const [level, setLevel] = useState(3);
  return (
    <section className="bg-white p-6 w-full overflow-y-scroll rounded-tl-2xl">
      <h1 className="text-3xl text-center">Timer</h1>
      <div className=" flex flex-col forTimer:flex-row justify-around ">
        <div className="p-4 flex flex-col forCard:flex-row forCard:justify-around  sm:justify-center items-center">
          <div>
            <Input game="Bird Dodge" />
            <Input game="Burst" />
            <Input game="Block & Ball" />
            <Input game="Car Dodge" />
            <Input game="Copter Block" />
            <Input game="Drop balls" />
            <Input game="Hit Catch" />
            <Input game="Hurdles" />
            <Input game="Newton Balls" />
            <Input game="Trace" />
            <Input game="Veggie Pick" />
            <Input game="Windows" />
          </div>
          <div className="p-3 flex flex-col mt-5 sm:mt-4 sm:mx-4">
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
  return (
    <div className="form-check">
      <input
        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#cfece8] checked:border-[#cfece8] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio"
        name="flexRadioDefault"
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
      <div className="mb-0 sm:mb-4">
        <button
          onClick={() => {
            props.setLevel((prev) => {
              return prev === `maxLevel ? prev : prev + 1;
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

export default Timer;
