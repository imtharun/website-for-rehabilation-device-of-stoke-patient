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
  const { userType } = useContext(UserTypeContext);
  const [isPersist, setIsPersist] = useState(false);
  const navigate = useNavigate();
  const persistUser = useCallback(async () => {
    try {
      console.log(userType);
      if (!userType) {
        navigate("/login", { replace: true });
        setIsPersist(false);
      }
      const resp = await axios.get(`/${userType}/dashboard`, {
        withCredentials: true,
      });
      if (resp.status === 200) {
        console.log(resp);
        navigate("/", { replace: true });
        setIsPersist(true);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login", { replace: true });
        setIsPersist(false);
      }
    }
  }, [navigate, userType]);

  // useEffect(() => {
  //   if (!isFetched.current) {
  //     isFetched.current = true;
  //     persistUser();
  //   }
  // }, [persistUser]);

  useEffect(() => {
    persistUser();
  }, [persistUser, userType]);

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
        <Route path="/new-session" element={<NewSession />} />
        <Route path="/game-details" element={<Game />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage-patients" element={<ManagePatients />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
