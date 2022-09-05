import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import axios from "./api/axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [isPersist, setIsPersist] = useState(false);
  const navigate = useNavigate();

  const persistUser = async () => {
    try {
      const resp = await axios.get("/dashboard");
      console.log(resp);
      if (resp) {
        setIsPersist(true);
      }
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login", { replace: true });
        setIsPersist(false);
      }
    }
  };

  useEffect(() => {
    persistUser();
  }, []);

  return (
    <div className="font-workSans min-h-screen h-screen">
      <Routes>
        <Route path="/" element={isPersist && <Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
