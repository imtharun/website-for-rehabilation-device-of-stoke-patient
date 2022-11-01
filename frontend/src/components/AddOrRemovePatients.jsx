import React, { useRef, useState } from "react";
import axios from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddOrRemovePatients = () => {
  const mailRef = useRef();
  const [patientMail, setPatientMail] = useState("");

  const inputHandler = () => {
    setPatientMail(mailRef.current.value);
  };

  const handler = async (type = "add", mailId) => {
    try {
      const url = `/caretaker/${type}Patient`;
      console.log(url);
      const res = await axios.post(url, {
        mailId,
      });
      console.log(res);
      if (res.status === 200) {
        toast("Successfully Added", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast("Error Occurred", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  };

  const addHandler = (e) => {
    e.preventDefault();
    handler("add", patientMail);
  };

  const removeHandler = (e) => {
    e.preventDefault();
    handler("remove", patientMail);
  };

  return (
    <section className="bg-white w-full overflow-y-scroll rounded-tl-2xl ">
      <div className="flex justify-center mt-5">
        <div className="mb-3 xl:w-96 text-center">
          <label
            htmlFor="exampleText0"
            className="form-label inline-block my-6 text-gray-700 text-2xl"
          >
            Add or Remove Patients
          </label>
          <input
            type="text"
            ref={mailRef}
            value={patientMail}
            onChange={inputHandler}
            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="exampleText0"
            placeholder="Enter Patient Mail"
          />
        </div>
      </div>
      <div className="flex justify-center my-2">
        <button
          onClick={addHandler}
          className="font-medium mx-2 inline-block  transition ease-in-out hover:scale-110 bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100 shadow-sm px-5 text-sm py-3 rounded-full"
        >
          Add
        </button>
        <button
          onClick={removeHandler}
          className="font-medium mx-2 inline-block  transition ease-in-out hover:scale-110 bg-gray-100 border-slate-500 border  text-slate-500 hover:bg-slate-500 hover:text-gray-100 shadow-sm px-5 text-sm py-3 rounded-full"
        >
          Remove
        </button>
      </div>
      <div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default AddOrRemovePatients;
