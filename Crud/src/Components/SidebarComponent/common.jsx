
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiCLient from '../ApiClient/ApiClient'
import Table from "../Global/Table"
import { FiMoreVertical } from "react-icons/fi";




// this Layout is Common in All Recuitment in All Feilds

const common = ({columns,data,getData ,handlefilter,deleteIetm ,position,addLeave = false,setIsopen}) => {
   
      const navigate = useNavigate()
      useEffect(()=>{
          getData();
      },[])
      //to filter Elements based on Codnition
     
  
  
     
  
  
  
     

  
  
    
  
  
  
    return (
    <div className="h-full flex flex-col bg-gray-50 text-[16px]">
      {/* Main Content Wrapper */}
      <div className="flex-1 bg-white px-5 py-8 overflow-auto">
        
        {/* Top Filters/Search */}
        <div className="flex justify-between items-center gap-4 mb-6">
          <div className="flex gap-4">
            
            <select onChange={(e)=>handlefilter("position",e)}   className="px-4 py-2 rounded-md text-sm border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none">
             <option value=''>Position</option>
             <option value="Intern" className="">Intern</option>
                <option value="Fulltime" className="">Full Time</option>
                <option value="Junior" className="">Junior</option>
                <option value="Senior" className="">Senior</option>
                <option value="TeamLead" className="">Team Lead</option>
            </select>
          </div>
  
          <div className="flex gap-4">
            <input
              type="search"
              placeholder="Search"
              className="text-black p-2 px-4 border rounded-3xl border-[#ABABAB]"
              onChange={(e)=>handlefilter("searchKey",e)}
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
        <div className="flex-1 ">
          <Table columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
  
  
  
}

export default common