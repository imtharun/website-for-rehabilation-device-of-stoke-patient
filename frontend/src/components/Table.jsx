import React from "react";

const Table = () => {
  const cols = ["S No", "Angle1", "Angle2", "Angle3", "Angle4"];
  const rows = [
    { sno: 1, Angle1: 2.2, Angle2: 1.22, Angle3: 34.3, Angle4: 565.6 },
    { sno: 2, Angle1: 2.2, Angle2: 1.22, Angle3: 34.3, Angle4: 565.6 },
    { sno: 3, Angle1: 2.2, Angle2: 1.22, Angle3: 34.3, Angle4: 565.6 },
    { sno: 4, Angle1: 2.2, Angle2: 1.22, Angle3: 34.3, Angle4: 565.6 },
    { sno: 5, Angle1: 2.2, Angle2: 1.22, Angle3: 34.3, Angle4: 565.6 },
  ];

  return (
    <div className="flex flex-col  max-w-3xl ml-2 sm:mx-auto">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full ">
              <thead className="bg-gray-100 border-b">
                <tr>
                  {cols.map((col) => {
                    return (
                      <th
                        scope="col"
                        className="text-sm font-medium px-6 py-4 text-left"
                      >
                        {col}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  return (
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {row.sno}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap ">
                        {row.Angle1}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {row.Angle2}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {row.Angle3}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {row.Angle4}
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
  );
};

export default Table;
