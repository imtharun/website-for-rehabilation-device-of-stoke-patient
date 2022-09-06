import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Timer from "../components/Timer";

const NewSession = () => {
  useEffect(() => {
    document.title = "New session";
  }, []);

  return (
    <section className="h-full flex bg-[#cfece8] ">
      <Nav />
      <Timer timeInSeconds={9000} />
    </section>
  );
};

export default NewSession;
