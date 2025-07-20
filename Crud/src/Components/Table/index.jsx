import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiCLient from '../ApiClient/ApiClient'
import Table from "../Global/Table"
import { FiMoreVertical } from "react-icons/fi";
import ApiClient from '../ApiClient/ApiClient'
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
    render: () => (
      <button className="p-2 rounded hover:bg-gray-100">
        <FiMoreVertical className="text-gray-600" />
      </button>
    ),
  },
];

  return (
  <div className="h-full flex flex-col bg-gray-50">
    {/* Main Content Wrapper */}
    <div className="flex-1 bg-white px-5 py-8 overflow-auto">
      
      {/* Top Filters/Search */}
      <div className="flex justify-between items-center gap-4 mb-6">
        <div className="flex gap-4">
          <select className="px-4 py-2 pr-12 pl-4 rounded-3xl text-sm border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none">
            <option value="">Select</option>
            <option value="New" className="">New</option>
              <option value="Selected" className="">Selected</option>
              <option value="Rejected" className="">Rejected</option>
          </select>
          <select onChange={(e)=>handlefilter("status",e)}   className="px-4 py-2 pr-12 pl-4 rounded-3xl text-sm border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none">
           <option value="">Postion</option>
           <option value="New" className="">New</option>
              <option value="Selected" className="">Selected</option>
              <option value="Rejected" className="">Rejected</option>
          </select>
        </div>

        <div className="flex gap-4">
          <input
            type="search"
            placeholder="Search"
            className="text-black p-2 px-4 border rounded-3xl border-[#ABABAB]"
            onChange={(e)=>handlefilter("searchKey",e)}
          />
          <button
            onClick={() => navigate("/add-product")}
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
  </div>
);

}

export default index