import React from 'react'
import Table from "../../Table/index"
import Common from '../common'
import { FiMoreVertical } from "react-icons/fi";
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import shared from './shared';
import AddEdit from '../Attendence/AddEdit';
import ApiClient from '../../ApiClient/ApiClient';



const index = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    searchKey: '',
    status: '',

  });
    const [id, setId] = useState()

  const handleStatusChange = async (row,value)=>{
       try{
        const payload = {...data,status:value}
        await ApiClient.put(`${shared.getAll}/${row._id}`,payload).then((res)=>console.log(res))
        getData()

       }catch{

       }
      
    }
  

  const columns = [
    {
      header: "Profile", accessor: "image", sort: true,
      render: (value) => (
        <img className='rounded-full w-10 h-10' src={value} />
      )
    },
    { header: "Employee Name", accessor: "name", sort: false },


    { header: "Position", accessor: "position", sort: false },
    { header: "Department", accessor: "department", sort: false },
     { header: "Task", accessor: "task", sort: false },
    {
      header: "Status", accessor: "status", sort: false,
      render: (value, row) => {

        return (
          <select
            value={value} // ✅ this sets the selected option
            onChange={(e) => handleStatusChange(row, e.target.value)}
           className={`text-xs font-medium px-4 py-2 rounded-full border-[1px] border-[#ABABAB]
    ${value === 'Present' ? 'text-green-700 ' : 'text-red-700 bg-red-100'}`}
          >
            <option className='text-green-700' value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        );
      }
    },



    {
          header: "Action",
          accessor: "action",
          sort: false,
          render: (value, row) => (
    
            <Popup
              trigger={
                <button className="p-2 rounded hover:bg-gray-100">
                  <FiMoreVertical className="text-gray-600" />
                </button>
              }
              position="left top"
            >
              {(close) => (
                <div className='bg-white flex flex-col py-4 px-8 text-left space-y-5 shadow-md rounded'>
                  <button
                    onClick={() => {
                      setIsopen(true);
                      setId(row._id);
                      close(); // <-- close popup
                    }}
                    className='text-left'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteIetm(row.email);
                      close(); // <-- close popup
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </Popup>
    
          ),
        },
  ];
  const getData = async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await ApiClient.get(`${shared.getAll}?${query}`);
      console.log(res.data.data,"ress")
      setData(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };





  //to delete a Specific Item
  const deleteIetm = async (id) => {
    console.log(id)
    await ApiClient.delete(`${shared.getAll}/${id}`).then((res) => console.log(res)).catch((err) => console.log(err))
     await ApiClient.delete(`/attendence/${id}`).then((res)=> alert("Removed From Employees")).catch((err)=>console.log(err))
    getData();
  }

  const handlefilter = (key, e) => {

    const payload = { ...filters, [key]: e.target.value }
    setFilters(payload)
    getData(payload);
  };








   const [isOpen, setIsopen] = useState(false)

  return (
    
    <div>
      <Common columns={columns} data={data} getData={getData} title={'Attendence'} handlefilter={handlefilter} deleteIetm={deleteIetm} positionOptions={
        [
  // {label: "Status", value: "", className: "text-green-700" },
  { label: "Present", value: "Present", className: "text-green-700" },
  { label: "Absent", value: "Absent", className: "text-red-700" }
]

      } command={'status'}/>
      {
  isOpen && (
    <div
      className="animate-fade"
    >
      <AddEdit setIsopen={setIsopen} id={id} getData= {getData} />
    </div>
  )
}
    </div>


  )
}

export default index