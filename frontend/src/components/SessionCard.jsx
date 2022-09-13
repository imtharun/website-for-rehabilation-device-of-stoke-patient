import React from "react";
import Table from "./Table";
import Recovery from "./Recovery";

const SessionCard = () => {
  return (
    <div className="flex flex-col my-4 justify-between ">
      <div className="w-full bg-gray-300 p-4 rounded-md">
        <h1 className="text-sm sm:text-lg font-medium ml-1 mb-1">Session 99</h1>
        <Table />
        <Buttons />
      </div>
    </div>
  );
};

export const Buttons = () => {
  return (
    <div className="flex flex-col xxxs:flex-row xxxs:justify-between p-4 -mx-2  ">
      <ProgressButton />
      <button className="my-4 shadow-md sm:my-0 transition ease-in-out hover:scale-110  px-5 text-sm py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100">
        Download
      </button>
    </div>
  );
};

const ProgressButton = () => {
  return (
    <div>
      <button
        type="button"
        className="my-4 shadow-md sm:my-0 px-5 transition ease-in-out hover:scale-110   text-sm  py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalFullscreen"
      >
        Progress
      </button>

      <div
        className="modal p-3 fade fixed top-0 left-0 hidden w-full outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModalFullscreen"
        tabindex="-1"
        aria-labelledby="exampleModalFullscreenLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalFullscreenLabel"
              >
                Progress
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              <Recovery />
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="my-4 shadow-md sm:my-0 px-5 transition ease-in-out hover:scale-110   text-sm  py-3 rounded-full bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
