import React, { useRef, useState, useEffect, useCallback } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import axios from "./api/axios";
import Main from "./pages/Home";
import Game from "./pages/Games";
import NewSession from "./pages/NewSession";
import { useNavigate } from "react-router-dom";
import Error from "./components/Error";

const App = () => {
  const isFetched = useRef(false);
  const [isPersist, setIsPersist] = useState(false);
  const navigate = useNavigate();

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
    <div className="font-workSans min-h-screen h-screen">
      <Routes>
        <Route index path="/" element={<Main />} />
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
