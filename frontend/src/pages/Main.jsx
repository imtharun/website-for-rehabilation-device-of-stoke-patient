import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./../index.css";
import Login from "./../pages/Login";
import Signup from "./../pages/Signup";
import PatientHome from "./../pages/PatientHome";
import DoctorHome from "./../pages/DoctorHome";
import NewSession from "./../pages/NewSession";
import Game from "./../pages/Games";
import ManagePatients from "./../pages/ManagePatients";
import { CaretakerHome } from "./../pages/CaretakerHome";
import Error from "./../components/Error";
import Auth from "../components/Auth";
import { UserTypeContext } from "../UserContextProvider";

const App = () => {
  const { userType } = useContext(UserTypeContext);

  return (
    <div className="font-workSans h-screen min-h-screen">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Auth />}>
          <Route
            index
            path="/"
            element={
              (userType === "patient" && <PatientHome />) ||
              (userType === "doctor" && <DoctorHome />) ||
              (userType === "caretaker" && <CaretakerHome />)
            }
          />
          <Route path="/new-session" element={<NewSession />} />
          <Route path="/game-details" element={<Game />} />
          <Route path="/manage-patients" element={<ManagePatients />} />
        </Route>
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
