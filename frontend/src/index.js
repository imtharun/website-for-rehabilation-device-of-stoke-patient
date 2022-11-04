import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import UserContextProvider from "./UserContextProvider";
import ActiveGameContextProvider from "./ActiveGameContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <UserContextProvider>
      <ActiveGameContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ActiveGameContextProvider>
    </UserContextProvider>
  // </React.StrictMode>
);
