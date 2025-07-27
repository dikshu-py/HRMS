
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiCLient from '../ApiClient/ApiClient'
import Table from "../Global/Table"
import { FiMoreVertical } from "react-icons/fi";
import StatusDropdown from '../Global/DropDown'

import Popup from 'reactjs-popup';


// this Layout is Common in All Recuitment in All Feilds

const common = ({ columns, data, getData, handlefilter, deleteIetm, position, addLeave = false, setIsopen, command, positionOptions, title, nameplate }) => {

  const navigate = useNavigate()
  useEffect(() => {
    getData();
  }, [])
  //to filter Elements based on Codnition


  
  const [profileopen,setProfileopen] = useState(false)













  return (
    <div className="h-screen flex flex-col bg-gray-50 text-[16px]">

      {/* Main Content Wrapper */}
      <div className="flex-1 bg-white px-5 py-8 overflow-hidden">
        <div className="w-full flex justify-between ">
          <h2 className='text-[20px]'>{title}</h2>
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="19" cy="10" r="4" fill="#B70000" />
            </svg>

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5.5C14.7614 5.5 17 7.73858 17 10.5V12.7396C17 13.2294 17.1798 13.7022 17.5052 14.0683L18.7808 15.5035C19.6407 16.4708 18.954 18 17.6597 18H6.34025C5.04598 18 4.35927 16.4708 5.21913 15.5035L6.4948 14.0683C6.82022 13.7022 6.99998 13.2294 6.99998 12.7396L7 10.5C7 7.73858 9.23858 5.5 12 5.5ZM12 5.5V3M10.9999 21H12.9999" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>


           <div className="flex items-center gap-2">
          <img className='rounded-full w-6 h-6' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7AO5QoFLh_DRpDwdWFDkhdMnvNI6xsw3dbw&s' />
        </div>
                <Popup
      trigger={
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <path
            d="M1 1.5L5.29289 5.79289C5.68342 6.18342 6.31658 6.18342 6.70711 5.79289L11 1.5"
            stroke="#4D007D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      position="left top"
      arrow={false}
      closeOnDocumentClick
      on={["click", "hover"]}
      className="z-50"
    >
      {(close) => (
        <div className="bg-white flex flex-col py-4 px-6 text-left space-y-3 shadow-md rounded-md w-48">
          <button
            onClick={() => {
              setIsopen(true);
              setId && setId("userId"); // pass the actual user id
              close();
            }}
            className="text-sm text-left hover:text-purple-700 focus:outline-none"
          >
            Edit Profile
          </button>
          <button
            onClick={() => {
              deleteItem && deleteItem("user@example.com"); // replace with actual
              close();
            }}
            className="text-sm text-left hover:text-purple-700 focus:outline-none"
          >
            Change Password
          </button>
          <button
            onClick={() => {
              // Add handler here
              close();
            }}
            className="text-sm text-left hover:text-purple-700"
          >
            Manage Notification
          </button>
        </div>
      )}
    </Popup>

          </div>
        </div>



        {/* Top Filters/Search */}
        <div className="flex justify-between items-center gap-4 mb-6 mt-[20px]">
          <div className="flex gap-4">
            <StatusDropdown option={positionOptions} handlefilter={handlefilter} command={command} />

          </div>

          <div className="flex gap-4">
            <input
              type="search"
              placeholder="Search"
              className="text-black p-2 px-4 border rounded-3xl border-[#ABABAB]"
              onChange={(e) => handlefilter("searchKey", e)}
            />
            {
              addLeave &&
              <button
                onClick={() => setIsopen(true)}
                className="bg-custom-purple text-white px-10 h-[39px] text-[16px] rounded-3xl hover:border-black"
              >
                Add Leave
              </button>
            }


          </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-full">
            <Table columns={columns} data={data} nameplate={nameplate} />
          </div>
        </div>
      </div>
    </div>
  );



}

export default common