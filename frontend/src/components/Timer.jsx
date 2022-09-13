import { useEffect, useRef, useState } from "react";
import axios from "./../api/axios";
import Serial from "../components/Serial";

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
      <h1 className="text-3xl text-center">Timer</h1>
      <div className="text-8xl mt-3  text-center rounded-xl">
        {displaySecondsAsMins(timer)}
      </div>
      <div className="flex px-4 my-5 justify-between">
        <div className="text-center">
          <button
            className="mx-auto -ml-3 w-[5rem] sm:inline-block  transition-all ease-in-out hover:scale-110 bg-gray-200 shadow-md text-sm py-3 rounded-full"
            onClick={toggleStart}
          >
            {!start ? "Start" : "Stop"}
          </button>
        </div>
        <div className="text-center ml-6">
          <button
            onClick={clickHandler}
            className="mx-auto  w-[5rem] sm:inline-block  transition-all ease-in-out hover:scale-110 bg-gray-200 text-sm py-3 shadow-md rounded-full"
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
    <section className="rounded-tl-2xl bg-white p-7 w-full flex justify-center overflow-y-scroll">
      <PomView timeInSeconds={props.timeInSeconds} />
    </section>
  );
};

export default Timer;
