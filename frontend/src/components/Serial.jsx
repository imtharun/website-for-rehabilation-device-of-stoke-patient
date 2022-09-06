import React, { useEffect } from "react";

const Serial = () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let reader = "";
  const init = async () => {
    if ("serial" in navigator) {
      try {
        const port = await navigator.serial.requestPort();
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

  useEffect(() => {
    init();
    read();
  }, []);

  return (
    <div className="mt-6 ">
      <div className="flex flex-col sm:flex-row justify-between">
        <button className="mx-auto inline-block ml-1 transition ease-in-out hover:scale-110 bg-gray-300 px-5 text-sm py-3 rounded-full">
          Connect with Serial Device
        </button>
        <button className="mx-auto inline-block my-5 sm:my-0  transition ease-in-out hover:scale-110 bg-gray-300 px-5 text-sm py-3 rounded-full">
          Get serial message
        </button>
      </div>
      <div>
        <div id="message" className=""></div>
      </div>
    </div>
  );
};

export default Serial;
