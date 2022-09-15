import { useEffect, useRef, useState } from "react";
import axios from "./../api/axios";
import Serial from "../components/Serial";
import "tw-elements";

const PomView = (props) => {
  const firstStart = useRef(true);
  const tick = useRef();

  const finalTime = { hours: 0, minutes: 0, seconds: 0 };

  const [timer, setTimer] = useState(props.timeInSeconds);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (start) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else {
      clearInterval(tick.current);
    }
    return () => clearInterval(tick.current);
  }, [start]);

  const toggleStart = () => {
    setStart(!start);
    console.log(finalTime);
  };

  const getTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const mins = Math.floor(seconds / 60);
    const _seconds = seconds % 60;

    return [hours, mins, _seconds];
  };

  const inSeconds = (hours, minutes, seconds) => {
    let sec = 0;
    if (hours !== 0) {
      sec += hours * 60 * 60;
    }
    if (minutes !== 0) {
      sec += minutes * 60;
    }
    sec += seconds;

    return sec;
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
    const inSec = inSeconds(
      finalTime.hours,
      finalTime.minutes,
      finalTime.seconds
    );
    const totalTrainedTime = props.timeInSeconds - inSec;

    submit(totalTrainedTime, getTime(totalTrainedTime));
  };

  const setTime = (hours, minutes, seconds) => {
    finalTime.hours = hours;
    finalTime.minutes = minutes;
    finalTime.seconds = seconds;
  };

  const displaySecondsAsMins = (seconds) => {
    const [hours, mins, _seconds] = getTime(seconds);
    setTime(hours, mins, _seconds);

    return (
      <div className="flex flex-col sm:flex-row items-center">
        {hours !== 0 && (
          <div className="bg-gray-200 p-3 px-2 w-[8rem] rounded-lg">
            {hours === 0 ? "" : hours.toString()}
          </div>
        )}
        {mins !== 0 && (
          <div className="mt-6 sm:mt-0 sm:ml-6 bg-gray-200 p-3 px-2 w-[8rem] rounded-lg">
            {mins.toString()}
          </div>
        )}
        {/* <div className="mx-2 text-center">{":"}</div> */}
        <div className="mt-6 sm:mt-0 sm:mx-6 bg-gray-200 p-3 px-2 w-[8rem] rounded-lg">
          {_seconds === 0 ? "00" : _seconds.toString()}
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="text-8xl mt-3  text-center rounded-xl">
        {displaySecondsAsMins(timer)}
      </div>
      <div className="flex px-4 my-5 justify-between">
        <div className="text-center">
          <button
            className="mx-auto -ml-3 w-[5rem] sm:inline-block shadow-md sm:my-0 transition ease-in-out hover:scale-110  px-5 text-sm py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100"
            onClick={toggleStart}
          >
            {!start ? "Start" : "Stop"}
          </button>
        </div>
        <div className="text-center ml-6">
          <button
            onClick={clickHandler}
            className="mx-auto w-[5rem] sm:inline-block  transition-all ease-in-out hover:scale-110  shadow-md sm:my-0  px-3 text-sm py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100"
          >
            Submit
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
  return (
    <section className="bg-white p-7 w-full overflow-y-scroll rounded-tl-2xl">
      <h1 className="text-3xl text-center">Timer</h1>
      <div className=" flex justify-around ">
        <div className="p-4 flex">
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
          <div className="p-3 flex flex-col justify-between">
            <h1 className="text-center">
              Current Level: <span>3</span>
            </h1>
            <div className="">
              <button className="m-4 shadow-md sm:my-0 transition ease-in-out hover:scale-110  px-5 text-sm py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100">
                Increase Level
              </button>
              <button className="m-4 shadow-md sm:my-0 transition ease-in-out hover:scale-110  px-5 text-sm py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100">
                Decrease Level
              </button>
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

export default Timer;
