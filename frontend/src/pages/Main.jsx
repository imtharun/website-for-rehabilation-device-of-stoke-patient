import React, {
  useRef,
  useState,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Login from "./../pages/Login";
import Signup from "./../pages/Signup";
import PatientHome from "./../pages/PatientHome";
import DoctorHome from "./../pages/DoctorHome";
import NewSession from "./../pages/NewSession";
import Game from "./../pages/Games";
import "./../index.css";
import ManagePatients from "./../pages/ManagePatients";
import { CaretakerHome } from "./../pages/CaretakerHome";
import Error from "./../components/Error";
import { UserTypeContext } from "../UserContextProvider";

const App = () => {
  // const isFetched = useRef(false);
  const { userType, isUserPersistent, persistentHandler } =
    useContext(UserTypeContext);

  const navigate = useNavigate();
  const persistUser = useCallback(async () => {
    try {
      console.log(
        "running persist user callback",
        "setIsUserPersistent",
        isUserPersistent
      );
      if (!userType) {
        navigate("/login", { replace: true });
        persistentHandler(false);
        return;
      }
      const resp = await axios.get(`/${userType}/dashboard`, {
        withCredentials: true,
      });
      if (resp.status === 200) {
        navigate("/", { replace: true });
        persistentHandler(true);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login", { replace: true });
        persistentHandler(false);
      }
    }
  }, [userType]);

  // useEffect(() => {
  //   if (!isFetched.current) {
  //     isFetched.current = true;
  //     persistUser();
  //   }
  // }, [persistUser]);

  useEffect(() => {
    persistUser();
  }, [userType]);

  return (
    <div className="font-workSans h-screen min-h-screen">
      <Routes>
        <Route
          index
          path="/"
          element={
            (userType === "patient" && <PatientHome />) ||
            (userType === "doctor" && <DoctorHome />) ||
            (userType === "caretaker" && <CaretakerHome />)
          }
        />
        {userType && <Route path="/new-session" element={<NewSession />} />}
        {userType && <Route path="/game-details" element={<Game />} />}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {userType && (
          <Route path="/manage-patients" element={<ManagePatients />} />
        )}
        {userType && <Route path="/*" element={<Error />} />}
      </Routes>
    </div>
  );
};

export default App;
