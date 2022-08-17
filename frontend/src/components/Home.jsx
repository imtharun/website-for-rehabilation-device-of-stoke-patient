import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  CalendarIcon,
  ClockIcon,
  ArrowTopRightIcon,
} from "@radix-ui/react-icons";

const Sections = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000);
  }, []);

  return (
    <section className="rounded-tl-2xl bg-white p-7 w-full">
      <div className="flex justify-between">
        <h1 className="flex items-end text-xl border-b-[1.5px] border-b-black">
          <a className="flex items-center" href="/">
            Total session: <span className="ml-1">99</span>
            <ArrowTopRightIcon className="w-5 h-5" />
          </a>
        </h1>
        <div>
          <h1 className="flex items-center mb-2">
            <CalendarIcon className="mr-1 h-5 w-5" />
            Date:{" "}
            <span className="ml-1">{moment(date).format("MMM DD,YYYY")}</span>
          </h1>
          <h1 className="flex items-center">
            <ClockIcon className="mr-1 h-5 w-5" />
            Time: <span className="ml-1">{moment(date).format("LT")}</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Sections;
