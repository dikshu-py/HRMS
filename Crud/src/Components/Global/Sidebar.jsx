import React from 'react'

const Sidebar = () => {

    const content = {
        "Recruitment": ["Candidates"],
        "Organization": ["Employees","Attendence","Leaves"],
        "Others": ["Logout"],
    }
  return (
    <div className="w-[280px]  text-white p-4 space-y-4 border-r-[1px] border-[#D6D6D6] ">
    {Object.entries(content).map(([section, items], index) => (
      <div key={index}>
        <h2 className="font-bold text-sm text-[#A4A4A4] uppercase mb-2">{section}</h2>
        <ul className="space-y-1 mt-[16px] gap-[16px]">
          {items.map((item, i) => (
            <li key={i} className="px-5 py-2 font-semibold    rounded cursor-pointer text-[#4D007D]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
  )
}

export default Sidebar