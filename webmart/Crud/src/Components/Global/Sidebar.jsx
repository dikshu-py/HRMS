import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");

  const content = {
    "Recruitment": ["Candidates"],
    "Organization": ["Employees", "Attendence", "Leaves" , "Discussion"],
    "Others": ["Logout"],
  }
  const icons = {
    "Candidates": <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 9.16659H6.66667M4.58333 11.2499V7.08325M12.0833 11.6666C15.0903 11.6666 16.6951 12.6733 17.2609 14.6867C17.5598 15.75 16.6046 16.6666 15.5 16.6666H8.66666C7.56209 16.6666 6.60687 15.75 6.90573 14.6867C7.47159 12.6733 9.07637 11.6666 12.0833 11.6666ZM12.0833 8.33325C13.4722 8.33325 14.1667 7.61897 14.1667 5.83325C14.1667 4.04754 13.4722 3.33325 12.0833 3.33325C10.6944 3.33325 10 4.04754 10 5.83325C10 7.61897 10.6944 8.33325 12.0833 8.33325Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    ,
    "Employees": <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.4209 15.8334H16.6667C17.5871 15.8334 18.3891 15.0634 18.0967 14.1906C17.651 12.8605 16.5546 12.0561 14.6273 11.7775M12.0834 9.05382C12.3259 9.13047 12.6037 9.16675 12.9167 9.16675C14.3056 9.16675 15 8.45246 15 6.66675C15 4.88103 14.3056 4.16675 12.9167 4.16675C12.6037 4.16675 12.3259 4.20303 12.0834 4.27968M7.91667 11.6667C10.7363 11.6667 12.323 12.4044 12.9763 13.8796C13.4236 14.8896 12.4379 15.8334 11.3333 15.8334H4.5C3.39543 15.8334 2.40976 14.8896 2.85702 13.8796C3.51034 12.4044 5.09706 11.6667 7.91667 11.6667ZM7.91667 9.16675C9.30556 9.16675 10 8.45246 10 6.66675C10 4.88103 9.30556 4.16675 7.91667 4.16675C6.52778 4.16675 5.83333 4.88103 5.83333 6.66675C5.83333 8.45246 6.52778 9.16675 7.91667 9.16675Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    ,
    "Attendence": <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.33301 5.33333C6.33301 4.78105 6.78072 4.33333 7.33301 4.33333H8.66634C9.21863 4.33333 9.66634 4.78105 9.66634 5.33333V11.6667C9.66634 12.219 9.21863 12.6667 8.66634 12.6667H7.33301C6.78072 12.6667 6.33301 12.219 6.33301 11.6667V5.33333Z" stroke="#4D007D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M1.33301 8.66667C1.33301 8.11438 1.78072 7.66667 2.33301 7.66667H3.66634C4.21863 7.66667 4.66634 8.11438 4.66634 8.66667V11.6667C4.66634 12.219 4.21863 12.6667 3.66634 12.6667H2.33301C1.78072 12.6667 1.33301 12.219 1.33301 11.6667V8.66667Z" stroke="#4D007D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.333 2C11.333 1.44772 11.7807 1 12.333 1H13.6663C14.2186 1 14.6663 1.44772 14.6663 2V11.6667C14.6663 12.219 14.2186 12.6667 13.6663 12.6667H12.333C11.7807 12.6667 11.333 12.219 11.333 11.6667V2Z" stroke="#4D007D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    ,
    "Leaves": <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.33301 3.33325C8.33301 6.09468 6.09443 8.33325 3.33301 8.33325C6.09443 8.33325 8.33301 10.5718 8.33301 13.3333C8.33301 10.5718 10.5716 8.33325 13.333 8.33325C10.5716 8.33325 8.33301 6.09468 8.33301 3.33325Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M14.583 12.4999C14.583 13.6505 13.6503 14.5833 12.4997 14.5833C13.6503 14.5833 14.583 15.516 14.583 16.6666C14.583 15.516 15.5157 14.5833 16.6663 14.5833C15.5157 14.5833 14.583 13.6505 14.583 12.4999Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>,
    "Discussion": <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.33301 3.33325C8.33301 6.09468 6.09443 8.33325 3.33301 8.33325C6.09443 8.33325 8.33301 10.5718 8.33301 13.3333C8.33301 10.5718 10.5716 8.33325 13.333 8.33325C10.5716 8.33325 8.33301 6.09468 8.33301 3.33325Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M14.583 12.4999C14.583 13.6505 13.6503 14.5833 12.4997 14.5833C13.6503 14.5833 14.583 15.516 14.583 16.6666C14.583 15.516 15.5157 14.5833 16.6663 14.5833C15.5157 14.5833 14.583 13.6505 14.583 12.4999Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    , "Logout": <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.6663 16.6667H5.33301C4.22844 16.6667 3.33301 15.7713 3.33301 14.6667L3.33301 5.33341C3.33301 4.22884 4.22844 3.33342 5.33301 3.33342H11.6663M8.33301 10.0001H17.4997M17.4997 10.0001L14.9997 12.5001M17.4997 10.0001L14.9997 7.50008" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>



  }


  const handleClick = (item) => {
    setActive(item);
    if (item == "Logout") {
      localStorage.removeItem('token')
      navigate("/login")
    }
    else if (item == "Candidates") {
      navigate('/')

    } else {
      navigate(`/${item.toLowerCase()}`)
    }
  }
  return (
    <div className="w-[280px]  text-white  space-y-4 border-r-[1px] border-[#D6D6D6] transition-all ease-in-out duration-400">

      {Object.entries(content).map(([section, items], index) => (
        <div key={index} className='mt-10'>
          <h2 className="font-bold text-sm text-[#A4A4A4] uppercase mb-2 mx-4">{section}</h2>
          <ul className="mt-[16px]">
            {items.map((item, i) => (
              <li key={i} onClick={() => handleClick(item)} className={`${active === item ? "bg-[#F9FAFB]" : ""} relative px-5 py-2 font-semibold    rounded cursor-pointer text-[#4D007D]`}>
                  <div className={`${active === item? "block":"hidden"} absolute -left-1 h-7 w-2 rounded-xl bg-[#6E11B0]`}></div>
                <div className="flex items-center gap-4">
                  {icons[item]}
                  <p>{item}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Sidebar