import React from 'react'
import Table from "../../Table/index"
import Common from '../common'
import { FiMoreVertical } from "react-icons/fi";
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import shared from './shared';
import AddEdit from '../Employees/AddEdit';
import ApiClient from '../../ApiClient/ApiClient';



const index = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    searchKey: '',
    status: '',

  });
  
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
    { header: "Status", accessor: "status", sort: false ,
      rendor : ()=>(
        <select>
          <option value="present"  className=''>Present</option>
          <option  value = 'absent' className=''>Absent</option>
        </select>
      )
    },
    


    {
      header: "Action",
      accessor: "action",
      sort: false,
      render: (value,row) => (
       
        <Popup trigger={<button className="p-2 rounded hover:bg-gray-100">
          <FiMoreVertical className="text-gray-600" />

        </button>}
        
        position="left top">
          <div className='bg-white flex flex-col py-4 px-8  text-left space-y-5 shadow-md rounded'>
            <button  className='text-left'>Edit</button>
            <button onClick={()=>deleteIetm(row.email)}>Delete</button>
          </div>
        </Popup>

      ),
    },
  ];
  const getData = async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await ApiClient.get(`http://localhost:3000${shared.getAll}?${query}`);
      setData(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  



  //to delete a Specific Item
  const deleteIetm = async (id) => {
    console.log(id)
    await ApiClient.delete(`http://localhost:3000/${shared.getAll}/${id}`).then((res) => console.log(res)).catch((err) => console.log(err))
    getData();
  }

  const handlefilter = (key, e) => {

    const payload = { ...filters, [key]: e.target.value }
    setFilters(payload)
    getData(payload);
  };










  return (
     <Common columns={columns} data={data} getData={getData} handlefilter={handlefilter} deleteIetm={deleteIetm} />
   
   
  )
}

export default index