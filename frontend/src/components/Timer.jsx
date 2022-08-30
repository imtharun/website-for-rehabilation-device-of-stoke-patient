import { useEffect, useRef, useState } from "react";

const PomView = (props) => {
  const [timer, setTimer] = useState(props.timeInSeconds);
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();

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
  };

  const displaySecondsAsMins = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const mins = Math.floor(seconds / 60);
    const _seconds = seconds % 60;
    return (
      <div className="flex flex-col sm:flex-row items-center">
        {hours !== 0 && (
          <div className="bg-gray-300 p-3 px-2 w-[8rem] rounded-lg">
            {hours === 0 ? "" : hours.toString()}
          </div>
        )}
        {mins !== 0 && (
          <div className="mt-6 sm:mt-0 sm:ml-6 bg-gray-300 p-3 px-2 w-[8rem] rounded-lg">
            {mins.toString()}
          </div>
        )}
        {/* <div className="mx-2 text-center">{":"}</div> */}
        <div className="mt-6 sm:mt-0 sm:mx-6 bg-gray-300 p-3 px-2 w-[8rem] rounded-lg">
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
      <div className="flex sm:justify-around px-4 my-5">
        <div className="text-center ">
          <button
            className="mx-auto  w-[5rem] sm:inline-block  transition-all ease-in-out hover:scale-110 bg-gray-300 text-sm py-3 rounded-full"
            onClick={toggleStart}
          >
            {!start ? "Start" : "Stop"}
          </button>
        </div>
        <div className="text-center ml-6">
          <button
            className="mx-auto  w-[5rem] sm:inline-block  transition-all ease-in-out hover:scale-110 bg-gray-300 text-sm py-3 rounded-full"
            onClick={toggleStart}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const Timer = (props) => {
  return (
    <section className="rounded-tl-2xl bg-white p-7 w-full flex justify-center ">
      <PomView timeInSeconds={props.timeInSeconds} />
    </section>
  );
};

export default Timer;
