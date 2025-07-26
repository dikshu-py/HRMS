import React from 'react'
import Table from "../../Table/index"
import Common from '../common'
import { FiMoreVertical } from "react-icons/fi";
import { useState } from 'react';
import ApiClient from '../../ApiClient/ApiClient';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import AddEdit from './AddEdit';




const index = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    searchKey: '',
    status: '',

  });
  const [id, setId] = useState()
  const columns = [
    {
      header: "Profile", accessor: "image", sort: true,
      render: (value) => (
        <img className='rounded-full w-10 h-10' src={value} />
      )
    },
    { header: "Employee Name", accessor: "name", sort: false },
    { header: "Email Address", accessor: "email", sort: false },
    { header: "Phone Number", accessor: "number", sort: false },
    { header: "Position", accessor: "position", sort: false },
    { header: "Department", accessor: "department", sort: false },
    {
      header: "Date of Joining", accessor: "joining", sort: false,
      render: (value) => (
        new Date(value).toLocaleDateString("en-GB").slice(0, 10)
      )
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
      const res = await ApiClient.get(`/emplyee?${query}`);
      setData(res.data.data);
      
      setPosition("")

    } catch (err) {
      console.log(err);
    }
  };



  const [position,setPosition] = useState('')
  const [isOpen, setIsopen] = useState(false)
  //to delete a Specific Item
  const deleteIetm = async (id) => {
   
    await ApiClient.delete(`/employee/${id}`).then((res) => console.log(res)).catch((err) => console.log(err))
    getData();
  }

  const handlefilter = (key, e) => {

    const payload = { ...filters, [key]: e.target.value }
    setFilters(payload)
    getData(payload);
  };










  return (

    <div>
      <Common columns={columns} data={data} getData={getData} handlefilter={handlefilter} deleteIetm={deleteIetm} title={'Employee'}  position={position} command={'position'}  positionOptions={[{ label: "Position", value: "" },
  { label: "Intern", value: "Intern" },
  { label: "Full Time", value: "Fulltime" },
  { label: "Junior", value: "Junior" },
  { label: "Senior", value: "Senior" },
  { label: "Team Lead", value: "TeamLead" }]}/>
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