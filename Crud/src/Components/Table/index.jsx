import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiCLient from '../ApiClient/ApiClient'
import Table from "../Global/Table"
import { FiMoreVertical } from "react-icons/fi";
import ApiClient from '../ApiClient/ApiClient'
import StatusDropdown from '../Global/DropDown'
import Popup from 'reactjs-popup';
import Form from'../FormData/index';

const index = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        getData();
    },[])
    //to filter Elements based on Codnition
    const [filters, setFilters] = useState({
  searchKey: '',
  status: '',
  
}); 
    const [open,setOpen] = useState(false)

    const getData = async (filters = {}) => {
        try {
           const query = new URLSearchParams(filters).toString();
           const res = await ApiCLient.get(`/products?${query}`);
          setData(res.data.data);
        } catch (err) {
          console.log(err);
        }
      };



    //to delete a Specific Item
    const deleteIetm = async (id) =>{
        await ApiCLient.delete(`/delete/${id}`).then((res)=>console.log(res)).catch((err)=> console.log(err))
        getData();
    } 

    const handlefilter = (key,e) => {
        const payload  = {...filters , [key]:  e.target.value}
        setFilters(payload)
        getData(payload); 
      };


  const handleStatusChange = async (row,value)=>{
      try{
        if(value == "Selected"){
           const payload = {
          name : row.name || '',
          email : row.email,
          number : row.number || '',
          department :row.position || '',
          position : "Intern",
          experience : row.experience || '',
          joining : new Date(),
          task : 'Dashboard Home page Alignment',
          image : row.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7AO5QoFLh_DRpDwdWFDkhdMnvNI6xsw3dbw&s'
          }
          await ApiCLient.post('/emplyee/add',payload).then((res)=>console.log(res)).catch((err)=> console.log(err))
           await ApiCLient.post('/attendence/add',{...payload, status : "Present"}).then((res)=>console.log(res)).catch((err)=> console.log(err))


        }else{
          await ApiClient.delete(`/employee/${row.email}`).then((res)=> alert("Removed From Employees")).catch((err)=>console.log(err))
          await ApiClient.delete(`/attendence/${row.email}`).then((res)=> alert("Removed From Employees")).catch((err)=>console.log(err))
        }
        console.log(row)
        await ApiClient.put(`/edit/${row._id}`,{status : value})
        
        getData();
       

      }catch(err){
        console.log(err)
      }
    
  }

const columns = [
  { header: "Sr no.", accessor: "id", sort: true },
  { header: "Candidates Name", accessor: "name", sort: false },
  { header: "Email Address", accessor: "email", sort: false },
  { header: "Phone Number", accessor: "number", sort: false },
  { header: "Position", accessor: "position", sort: false },
  {
    header: "Status",
    accessor: "status",
    sort: false,
    render: (value,row) => {
      const statusColor = {
        New: "bg-gray-200 text-gray-800",
        Selected: "bg-green-100 text-green-800",
        Rejected: "bg-red-100 text-red-800",
      };
      return (
        <select
          onChange={(e) => handleStatusChange(row, e.target.value)}
          className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[value] || "bg-gray-100"}`}
        >
          <option value="">{value}</option>
           <option value="New" className="">New</option>
              <option value="Selected" className="">Selected</option>
              <option value="Rejected" className="">Rejected</option>
        </select>

        
      );
    },
  },
  { header: "Experience", accessor: "experience", sort: false },
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
              <div className='bg-white flex flex-col py-4 px-8 text-left space-y-5  shadow-md rounded'>
                <button
                onClick={() => window.open(row.image, "_blank")}
                  // onClick={() => {
                  //   setIsopen(true);
                    
                  //   setId(row._id);
                  //   close(); // <-- close popup
                  // }}
                  className='text-left'
                >
                  Download Resume
                </button>
                <button
                  className='text-left'
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

  return (
  <div className="h-full flex flex-col bg-gray-50">

    <div className="w-full flex justify-between bg-white px-4 pt-8">
              <h2 className='text-[20px] '>Candidates</h2>
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="19" cy="10" r="4" fill="#B70000" />
                </svg>
    
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5.5C14.7614 5.5 17 7.73858 17 10.5V12.7396C17 13.2294 17.1798 13.7022 17.5052 14.0683L18.7808 15.5035C19.6407 16.4708 18.954 18 17.6597 18H6.34025C5.04598 18 4.35927 16.4708 5.21913 15.5035L6.4948 14.0683C6.82022 13.7022 6.99998 13.2294 6.99998 12.7396L7 10.5C7 7.73858 9.23858 5.5 12 5.5ZM12 5.5V3M10.9999 21H12.9999" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
    
    
                <img className='rounded-full w-6 h-6' src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7AO5QoFLh_DRpDwdWFDkhdMnvNI6xsw3dbw&s' />
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
                className="text-sm text-left hover:text-purple-700"
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

    {/* Main Content Wrapper */}
    <div className="flex-1 bg-white px-5 py-8 overflow-auto">
      
      {/* Top Filters/Search */}
      <div className="flex justify-between items-center gap-4 mb-6">
        <div className="flex gap-4">
       <StatusDropdown
  option={[
  { label: "Select", value: "" },
  { label: "New", value: "New" },
  { label: "Selected", value: "Selected" },
  { label: "Rejected", value: "Rejected" }
]}
  handlefilter={handlefilter}
  command="status"
/>

<StatusDropdown
  option={[
  { label: "Position", value: "" },
  { label: "New", value: "New" },
  { label: "Selected", value: "Selected" },
  { label: "Rejected", value: "Rejected" }
]}
  handlefilter={handlefilter}
  command="position"
/>
        </div>

        <div className="flex gap-4">
          <input
            type="search"
            placeholder="Search"
            className="text-black p-2 px-4 border rounded-3xl border-[#ABABAB]"
            onChange={(e)=>handlefilter("searchKey",e)}
          />
          <button
            onClick={() => setOpen(true)}
            className="bg-custom-purple text-white px-10 h-[39px] rounded-3xl hover:border-black"
          >
            Add Candidate
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 ">
        <Table columns={columns} data={data} />
      </div>
    </div>
    {open && (
  <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-10 flex items-center justify-center animate-fade">
    <Form setOpen={setOpen} />
  </div>
)}
  </div>
);

}

export default index