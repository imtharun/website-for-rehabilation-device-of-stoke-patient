import React, { useEffect, useContext } from "react";
import { GameNameContext } from "../ActiveGameContextProvider";

const Serial = (props) => {
  //   const encoder = new TextEncoder();
  const { start } = useContext(GameNameContext);
  const decoder = new TextDecoder();
  let reader = "";
  const init = async () => {
    if ("serial" in navigator) {
      try {
        console.log(navigator);
        const port = await navigator.serial.requestPort();
        console.log("Port", port);
        await port.open({ baudRate: 9600 });
        reader = port.readable.getReader();
        let signals = await port.getSignals();

        console.log(signals);
      } catch (error) {
        console.error("There was an error opening the serial port:", error);
      }
    } else {
      console.error(
        "Web serial doesn't seem to be enabled in your browser. Try enabling it by visiting:"
      );
      console.error(
        "chrome://flags/#enable-experimental-web-platform-features"
      );
      console.error("opera://flags/#enable-experimental-web-platform-features");
      console.error("edge://flags/#enable-experimental-web-platform-features");
    }
  };

  const read = async () => {
    try {
      const readerData = await reader.read();
      console.log(readerData);
      return decoder.decode(readerData.value);
    } catch (error) {
      const errorMessage = `Error reading data ${error}`;
      console.log(errorMessage);
      return errorMessage;
    }
  };

  const getSerialMessages = async () => {
    init();

    const message = document.getElementById("message");
    message.innerText += await read();
  };
  useEffect(() => {}, []);

  return (
    <div className="mt-6 ">
      <div className="flex flex-col sm:flex-row justify-between">
        <button
          onPointerDown={() => {
            init();
          }}
          id="connect-to-serial"
          className="text-xs sm:text-sm mx-auto inline-block ml-1my-4 shadow-md sm:my-0 transition ease-in-out hover:scale-110  px-5 py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100"
        >
          Connect with Serial Device
        </button>
        {/* <button
          onPointerDown={async () => getSerialMessages()}
          id="get-serial-message"
          className="text-xs sm:text-sm mx-auto inline-block my-5 sm:my-0 sm:ml-2 shadow-md  transition ease-in-out hover:scale-110  px-5 py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100"
        >
          Get serial message
        </button> */}
      </div>
      <div id="serial-message-container">
        <div className="bg-gray-100 p-3 mx-auto max-w-lg max-h-60 overflow-y-scroll mt-8 rounded-md">
          <div>Serial Monitor</div>
          <div id="message" className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Serial;
