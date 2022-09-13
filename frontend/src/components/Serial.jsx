import React, { useEffect } from "react";

const Serial = () => {
  //   const encoder = new TextEncoder();
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
    document.getElementById("message").innerText += await read();
  };

  useEffect(() => {
    // const connect = document.getElementById("connect-to-serial");
    // const getSerialMessage = document.getElementById("get-serial-message");
    // connect.addEventListener("pointerdown", () => {
    //   init();
    // });
    // getSerialMessage.addEventListener("pointerdown", async () => {
    //   getSerialMessages();
    // });
  }, []);

  return (
    <div className="mt-6 ">
      <div className="flex flex-col sm:flex-row justify-between">
        <button
          onPointerDown={() => {
            init();
          }}
          id="connect-to-serial"
          className="mx-auto inline-block ml-1 transition ease-in-out hover:scale-110 bg-gray-200 px-5 text-sm py-3 rounded-full shadow-md"
        >
          Connect with Serial Device
        </button>
        <button
          onPointerDown={async () => getSerialMessages()}
          id="get-serial-message"
          className="mx-auto inline-block my-5 sm:my-0  transition ease-in-out hover:scale-110 bg-gray-200 shadow-md px-5 text-sm py-3 rounded-full"
        >
          Get serial message
        </button>
      </div>
      <div id="serial-message-container">
        <div id="message" className=""></div>
      </div>
    </div>
  );
};

export default Serial;
