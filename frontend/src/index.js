import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./UserContextProvider";
import ActiveGameContextProvider from "./ActiveGameContextProvider";
import Loader from "./components/Loader";
const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <UserContextProvider>
    <ActiveGameContextProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </ActiveGameContextProvider>
  </UserContextProvider>
  // </React.StrictMode>
);
