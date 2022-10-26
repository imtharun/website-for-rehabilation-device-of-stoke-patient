import React from "react";

const Table = (props) => {
  return (
    <div className="flex flex-col mx-auto rounded-md max-w-3xl p-2">
      <div className="p-2">
        <div className="">
          <div className="overflow-x-scroll block min-w-full rounded-md scrollbar-thin scrollbar-thumb-[#389387] scrollbar-track-[#cfece8] scrollbar-thumb-rounded-full">
            <div className="overflow-w-hidden rounded-md">
              <table className="min-w-full rounded-md">
                <thead className="bg-gray-100 border-b-[1.5px] ">
                  <tr>
                    <th
                      scope="col"
                      rowSpan={2}
                      className="text-sm whitespace-nowrap font-medium px-4 py-4 text-center"
                    >
                      {props.cols[0]}
                    </th>
                    <th
                      scope="col"
                      rowSpan={2}
                      className="text-sm whitespace-nowrap font-medium px-4 py-4 text-center"
                    >
                      {props.cols[1]}
                    </th>
                    {props.cols[2].map((col, index) => {
                      return (
                        <th
                          key={index + 1}
                          scope="col"
                          colSpan={2}
                          className="text-sm text-center whitespace-nowrap font-medium px-4 py-4 "
                        >
                          {col}
                        </th>
                      );
                    })}
                    <th
                      scope="col"
                      rowSpan={2}
                      className="text-sm whitespace-nowrap font-medium px-4 py-4 text-center"
                    >
                      {props.cols[3]}
                    </th>
                    <th
                      scope="col"
                      rowSpan={2}
                      className="text-sm whitespace-nowrap font-medium px-4 py-4 text-center"
                    >
                      {props.cols[4]}
                    </th>
                  </tr>
                  <tr>
                    {props.rows[0].roms.map((ele, index) => {
                      return (
                        <th
                          key={index + 1}
                          className="text-sm whitespace-nowrap font-medium px-4 py-4 text-center"
                        >
                          {index % 2 === 0 ? "Min Rom" : "Max Rom"}
                        </th>
                      );
                    })}
                    {props.rows[0].roms.map((ele, index) => {
                      return (
                        <th
                          key={index + 1}
                          className="text-sm whitespace-nowrap font-medium px-4 py-4 text-center"
                        >
                          {index % 2 === 0 ? "Max Rom" : "Min Rom"}
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  {props.rows.map((row, index) => {
                    return (
                      <tr
                        key={index + 1}
                        className="bg-white border-b-[1.5px] transition duration-300 ease-in-out hover:bg-gray-100 text-center"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                          {row.gameName}
                        </td>
                        <td className="text-sm w-[150px] max-w-[150px] break-wor font-light px-6 py-4">
                          {row.joints}
                        </td>
                        {row.roms.map((ele, index) => {
                          return (
                            <>
                              <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                {ele.minRom}
                              </td>
                              <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                {ele.maxRom}
                              </td>
                            </>
                          );
                        })}
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {row.timeDuration}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                          {row.currentLevel}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
