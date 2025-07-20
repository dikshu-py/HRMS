import React, { useEffect } from 'react'
import Table from "../../Table/index"
import Common from '../common'
import { FiMoreVertical } from "react-icons/fi";
import { useState } from 'react';
import ApiClient from '../../ApiClient/ApiClient';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import AddLeave from './AddLeave';
import shared from './shared';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calender.css'; // Custom overrides (see below)

import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
};




const index = () => {
  const [data, setData] = useState([])
   const [namelist, setNamelist] = useState([])
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    searchKey: '',
    status : 'Present'

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
    {
      header: "Date", accessor: "leavedate", sort: false,
      render: (value) => (
        new Date(value).toLocaleDateString("en-GB").slice(0, 10)
      )
    },

    { header: "Reason", accessor: "reason", sort: false },
   
    { header: "Status", accessor: "status", sort: false },
    

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
                  deleteIetm(row._id);
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
  const getData = async (filter =filters ) => {
    try {
      console.log(filter)
      const query = new URLSearchParams(filter).toString();
      const res = await ApiClient.get(`/${shared.path}`);
      setData(res.data.data);
      setPosition("")

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    getNameList()

  },[data])
  const getNameList = async (filter =filters ) => {
    try {
      console.log(filter)
      const query = new URLSearchParams(filters).toString();
      const res = await ApiClient.get(`${shared.namelist}?${query}`);
      setNamelist(res.data.data);
      setPosition("")

    } catch (err) {
      console.log(err);
    }
  };



  const [position,setPosition] = useState('')
  const [isOpen, setIsopen] = useState(false)
  //to delete a Specific Item
  const deleteIetm = async (idx) => {
    console.log(idx)
    await ApiClient.delete(`/${shared.path}/${idx}`).then((res) => console.log(res)).catch((err) => console.log(err))
    getData();
  }

  const handlefilter = (key, e) => {

    const payload = { ...filters, [key]: e.target.value }
    setFilters(payload)
    getData(payload);
  };




  

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Approved Leave',
    start: new Date(2024, 8, 8), // September is 8 (0-indexed)
    end: new Date(2024, 8, 8),
    allDay: true,
  },
];




   const [value, setValue] = useState(new Date());

  return (

    <div className=''>
      <div className="max-w-[1440px] mx-auto w-full flex  ">
  {/* Left Side (Table/List) */}
  <div className="flex-1">
    {/* Leave table */}
    <Common
      columns={columns}
      data={data}
      getData={getData}
      handlefilter={handlefilter}
      deleteIetm={deleteIetm}
      position={position}
      addLeave={true}
      setIsopen={setIsopen}
    />
  </div>

  {/* Right Side (Calendar) */}
  <div className="w-[334px] shrink-0 rounded-lg overflow-hidden shadow-md border bg-white">
    <div className="bg-purple-700 text-white px-4 py-2 text-sm font-semibold">
      Leave Calendar
    </div>

    <Calendar
      localizer={localizer}
      events={events}
      views={['month']}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 350 }}
      toolbar={false}
      selectable={false}
      className="custom-calendar"
    />

    <p className="text-sm text-purple-700 mt-2 text-center underline cursor-pointer mb-4 ">
      Approved Leaves
    </p>

    {/* Optional user list below the calendar */}
    <div className="flex items-center gap-3 px-4 pb-4">
      <img src="/path/to/profile.jpg" className="w-8 h-8 rounded-full" />
      <div>
        <p className="text-sm font-medium">Cody Fisher</p>
        <p className="text-xs text-gray-500">8/09/24</p>
      </div>
    </div>
  </div>
</div>

      
      {
  isOpen && (
    <div
      className="animate-fade"
    >
      <AddLeave setIsopen={setIsopen} id={id} getData= {getData} data={data}  namelist={namelist} />
    </div>
  )
}
    </div>
  )
}

export default index