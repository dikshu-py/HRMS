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
import AttendanceDropdown from '../../Global/TableDropdown';

const locales = {
  'en-US': enUS,
};




const index = () => {
  const [data, setData] = useState([])
   const [namelist, setNamelist] = useState([])
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    searchKey: '',
    status : ''

  });
  const [id, setId] = useState()
  const [calendarEvents, setCalendarEvents] = useState([]);




  const handleStatusChange = async (row, newStatus) => {
  try {
    // Update status in backend
   
    await ApiClient.put(`/${shared.path}/${row._id}`, {
      status: newStatus
    });

    // If status changed to "Approve", add to calendar
    if (newStatus === "Approve") {
      const newEvent = {
        title: `Approved: ${row.name}`,
        start: new Date(row.leavedate),
        end: new Date(row.leavedate),
        allDay: true,
        name : row.name,
          desigination : row.desigination,
          image : row.image,
          leavedate  : row.leavedate
      };

      setCalendarEvents(prev => [...prev, newEvent]);
    }

    getData(); // Refresh table data
  } catch (err) {
    console.error(err);
  }
};


  const columns = [
    {
      header: "Profile", accessor: "document", sort: true,
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
   
    { header: "Status", accessor: "status", sort: false,
      render : (value,row) =>{
        const statusColor = {
        Pending: "bg-gray-200 text-gray-800",
        Approve: "bg-green-100 text-green-800",
        Rejected: "bg-red-100 text-red-800",
      };
        
          return (
        // <select
        // value={value}
        //   onChange={(e) => handleStatusChange(row, e.target.value)}
        //   className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[value] || "bg-gray-100"}`}
        // >
          
        //    <option value="Pending" className="">Pending</option>
        //       <option value="Approve" className="">Approve</option>
        //       <option value="Rejected" className="">Rejected</option>
        // </select>
        <AttendanceDropdown 
                  options = {[{ label: 'Pending', value: 'Pending' },
            { label: 'Approve', value: 'Approve' },
          { label: 'Rejected', value: 'Rejected' }]}
              value={value}
              onChange={(newStatus) => handleStatusChange(row, newStatus)}
            />
          )

      }
     },
    
        { header: "Document", accessor: "image", sort: false ,
          render : (value,row) =>{
            return(
              <div onClick={() => window.open(value, "_blank")}>
                <img className='rounded-full w-10 h-10' src='https://static.vecteezy.com/system/resources/previews/006/986/082/non_2x/write-document-user-interface-outline-icon-logo-illustration-free-vector.jpg' />
              </div>
            )
          }
        },
    // {
    //   header: "Action",
    //   accessor: "action",
    //   sort: false,
    //   render: (value, row) => (

    //     <Popup
    //       trigger={
    //         <button className="p-2 rounded hover:bg-gray-100">
    //           <FiMoreVertical className="text-gray-600" />
    //         </button>
    //       }
    //       position="left top"
    //     >
    //       {(close) => (
    //         <div className='bg-white flex flex-col py-4 px-8 text-left space-y-5 shadow-md rounded'>
    //           <button
    //             onClick={() => {
    //               setIsopen(true);
    //               setId(row._id);
    //               close(); // <-- close popup
    //             }}
    //             className='text-left'
    //           >
    //             Edit
    //           </button>
    //           <button
    //             onClick={() => {
    //               deleteIetm(row._id);
    //               close(); // <-- close popup
    //             }}
    //           >
    //             Delete
    //           </button>
    //         </div>
    //       )}
    //     </Popup>

    //   ),
    // },
  ];
  const getData = async (filter =filters ) => {
    try {
      
      const query = new URLSearchParams(filter).toString();
      const res = await ApiClient.get(`/${shared.path}?${query}`);
      setData(res.data.data);
      setPosition("") 
      // Filter approved leaves and format for calendar
      const approvedEvents = res.data.data
        .filter((item) => item.status === "Approve")
        .map((item) => ({
          title: `Approved: ${item.name}`,
          start: new Date(item.leavedate),
          end: new Date(item.leavedate),
          allDay: true,
          name : item.name,
          desigination : item.desigination,
          image : item.image,
          leavedate  : item.leavedate,
          document:item.document
        }));

      setCalendarEvents(approvedEvents);

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    getNameList()

  },[data])
  const getNameList = async (filter =filters ) => {
    try {
     
      const payload = {...filters, status : "Present"}
      const query = new URLSearchParams(payload).toString();
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

    <div className='bg-white'>
      <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row gap-4">

  {/* Left Side (Table/List) */}
 <div className="flex-1 min-h-[calc(100vh-100px)]">
  <Common
    columns={columns}
    data={data}
    getData={getData}
    handlefilter={handlefilter}
    deleteIetm={deleteIetm}
    position={position}
    addLeave={true}
    setIsopen={setIsopen}
    title={'Leaves'}
    nameplate= {true}
    command ={'status'} positionOptions={[
  { label: "Status", value: "", className: "text-yellow-600" },
   { label: "Pending", value: "Pending", className: "text-gray-600" },
  { label: "Approved", value: "Approve", className: "text-green-600" },
  { label: "Rejected", value: "Rejected", className: "text-red-600" }
]}
  />
</div>


  {/* Right Side (Calendar) */}
 <div className="w-full lg:w-[334px] shrink-0 flex flex-col border border-gray-500 bg-white rounded-3xl shadow-md min-h-[calc(100vh-100px)] my-10 overflow-hidden mr-5 ml-[-12px]">
  {/* Header */}
  <div className="bg-[#4D007D] text-white h-[54px] px-4 text-[16px] font-semibold flex items-center">
    Leave Calendar
  </div>

  {/* Calendar */}
  <div className="px-0 mt-0 ">
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      views={['month']}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 300 }}
      toolbar={false}
      selectable={false}
      className="custom-calendar border border-[#E5E5E5] rounded-lg"
      

    />
  </div>

  <p className="text-[16px] text-[#4D007D] mt-2 text-left cursor-pointer px-4">
    Approved Leaves
  </p>

  {/* Scrollable List */}
  <div className="overflow-y-auto px-2 flex-1">
    {Object.entries(calendarEvents).map(([key, it]) => (
      <div key={key} className="flex items-center gap-3 px-2 pb-4 text-black w-full">
        <img src={it.document} className="w-8 h-8 rounded-full" />
        <div className="flex-1">
          <div className="flex justify-between items-center w-full">
            <p className="text-sm font-medium">{it.name}</p>
            <p className="text-xs text-gray-500">{it.leavedate.slice(0, 10)}</p>
          </div>
          <p className="text-sm font-medium">{it.desigination}</p>
        </div>
      </div>
    ))}
  </div>
</div>

</div>

      
      {
  isOpen && (
    <div
      className="animate-fade"
    >
      

      <AddLeave setIsopen={setIsopen} id={id} getData= {getData} data={data}  namelist={namelist} setId={setId}/>
    </div>
  )
}
    </div>
  )
}

export default index