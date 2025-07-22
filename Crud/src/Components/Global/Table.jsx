import React, { useState } from "react";


const Table = ({ columns, data,namplate }) => {
    console.log(data)
  const [sortConfig, setSortConfig] = useState(null);

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig?.key && sortConfig?.direction) {
      sortableData.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        if (typeof valA === "string") {
          return sortConfig.direction === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        } else {
          return sortConfig.direction === "asc" ? valA - valB : valB - valA;
        }
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    if (!key) return;
    let direction = "asc";
    if (sortConfig?.key === key && sortConfig?.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="rounded-3xl shadow-xl overflow-x-auto mt-[16px] h-full   border  sm:min-h-[72vh]">
      <table className="min-w-full text-[16px] font-[400] text-left ">
        <thead>
          <tr className="bg-purple-800 text-white text-xs uppercase">
            {columns.map((col) => (
              <th
                key={col.accessor}
                onClick={() => col.sort && requestSort(col.accessor)}
                className={`py-3 px-5 cursor-${col.sort ? "pointer" : "default"} whitespace-nowrap`}
              >
                {col.header}
                {col.sort && (
                  <span className="ml-1">
                    ⇅
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
                {
                    columns[0].accessor == "id" &&
                    <td className="px-5 py-3 whitespace-nowrap">{idx + 1}</td> 
                }
                
                
              {columns.filter(col => col.accessor != "id" ).map((col) => (
                <td key={col.accessor} className="px-5 py-3 whitespace-nowrap">
                   
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Table