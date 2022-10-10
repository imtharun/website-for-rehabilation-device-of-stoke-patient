import React, { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
const AddOrRemovePatients = () => {
  const mailRef = useRef();
  const [patientMail, setPatientMail] = useState("");

  useEffect(() => {}, []);

  const inputHandler = () => {
    setPatientMail(mailRef.current.value);
  };

  const handler = async (type = "add", mailId) => {
    try {
      const res = await axios.post({ userType: type, mailId: mailId });
      console.log(res);
    } catch (error) {
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
      <div class="flex justify-center mt-5">
        <div class="mb-3 xl:w-96 text-center">
          <label
            for="exampleText0"
            class="form-label inline-block my-6 text-gray-700 text-2xl"
          >
            Add or Remove Patients
          </label>
          <input
            type="text"
            ref={mailRef}
            value={patientMail}
            onChange={inputHandler}
            class="
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
            placeholder="Enter Patient Name"
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
    </section>
  );
};

export default AddOrRemovePatients;
