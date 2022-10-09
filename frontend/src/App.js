import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "./api/axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PatientHome from "./pages/PatientHome";
import DoctorHome from "./pages/DoctorHome";
import NewSession from "./pages/NewSession";
import Game from "./pages/Games";
import Error from "./components/Error";
import "./index.css";

const App = () => {
  const isFetched = useRef(false);
  const [isPersist, setIsPersist] = useState(false);
  const navigate = useNavigate();
  const userType = "doctor";
  const persistUser = useCallback(async () => {
    try {
      const resp = await axios.get("/dashboard");
      console.log(resp);
      if (resp) {
        navigate("/", { replace: true });
        setIsPersist(true);
      }
    } catch (error) {
      if (error.response.status === 401) {
        // navigate("/login", { replace: true });
        setIsPersist(false);
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (!isFetched.current) {
      isFetched.current = true;
      persistUser();
    }
  }, [persistUser]);

  return (
    <div className="font-workSans h-screen min-h-screen">
      <Routes>
        <Route
          index
          path="/"
          element={
            (userType === "patient" && <PatientHome />) ||
            (userType === "doctor" && <DoctorHome />)
          }
        />
        <Route path="/new-session" element={<NewSession />} />
        <Route path="/game-details" element={<Game />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
