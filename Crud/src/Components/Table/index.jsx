import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiCLient from '../ApiClient/ApiClient'
import Table from "../Global/Table"
import { FiMoreVertical } from "react-icons/fi";
const index = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        getData();
    },[])

    const getData = async (searchKey = "") => {
        try {
          const res = await ApiCLient.get(`http://localhost:3000/products?search=${searchKey}`);
          setData(res.data.data);
        } catch (err) {
          console.log(err);
        }
      };



    //to delete a Specific Item
    const deleteIetm = async (id) =>{
        await ApiCLient.delete(`http://localhost:3000/delete/${id}`).then((res)=>console.log(res)).catch((err)=> console.log(err))
        getData();
    } 

    const handlesearch = (e) => {
        const value = e.target.value;
        getData(value); // call API with search key
      };


  

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
    render: (value) => {
      const statusColor = {
        New: "bg-gray-200 text-gray-800",
        Selected: "bg-green-100 text-green-800",
        Rejected: "bg-red-100 text-red-800",
      };
      return (
        <select

          className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[value] || "bg-gray-100"}`}
        >
          <option value="">{value}</option>
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
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select className="px-4 py-2 rounded-md text-sm border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none">
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex gap-4">
          <input
            type="search"
            placeholder="Search"
            className="text-black p-2 px-4 border rounded-3xl border-[#ABABAB]"
            onChange={handlesearch}
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