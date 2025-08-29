import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import Popup from 'reactjs-popup';
import ApiClient from '../ApiClient/ApiClient';
import Table from '../Global/Table';
import StatusDropdown from '../Global/DropDown';
import AttendanceDropdown from '../Global/TableDropdown';

const Form = lazy(() => import('../FormData/index'));

const Index = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ searchKey: '', status: '' });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const getData = useCallback(async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await ApiClient.get(`/products?${query}`);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const deleteItem = useCallback(async (id) => {
    try {
      await ApiClient.delete(`/delete/${id}`);
      getData();
    } catch (err) {
      console.error(err);
    }
  }, [getData]);

  const handleFilter = useCallback((key, e) => {
    const payload = { ...filters, [key]: e.target.value };
    setFilters(payload);
    getData(payload);
  }, [filters, getData]);

  const [seachitem,setSearchitem] = useState('')
  //debouncing to mainting each scalibility
  useEffect(()=>{
    const delaydebounce = setTimeout(()=>{
      const payload = {...filters,searchKey:seachitem}
      setFilters(payload)
      getData(payload)
    },200)
     return () => clearTimeout(delaydebounce);
  },[seachitem])


  const handleStatusChange = useCallback(async (row, value) => {
    try {
      if (value === "Selected") {
        const payload = {
          name: row.name || '',
          email: row.email,
          number: row.number || '',
          department: row.position || '',
          position: "Intern",
          experience: row.experience || '',
          joining: new Date(),
          task: 'Dashboard Home page Alignment',
          image: row.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7AO5QoFLh_DRpDwdWFDkhdMnvNI6xsw3dbw&s'
        };

        await ApiClient.post('/emplyee/add', payload);
        await ApiClient.post('/attendence/add', { ...payload, status: "Present" });
      } else {
        await ApiClient.delete(`/employee/${row.email}`);
        await ApiClient.delete(`/attendence/${row.email}`);
      }
     
      await ApiClient.put(`/edit/${row._id}`, { status: value });
      getData();
    } catch (err) {
      console.error(err);
    }
  }, [getData]);

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
      render: (value, row) => {
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
            <option value="New">New</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
//           <AttendanceDropdown className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[value] || "bg-gray-100"}`}
//           options = {[{ label: 'New', value: 'New' },
//     { label: 'Selected', value: 'Selected' },
//   { label: 'Rejected', value: 'Rejected' },
// ,]}
//       value={value}
//       onChange={(newStatus) => handleStatusChange(row, newStatus)}
//     />
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
          trigger={<button className="p-2 rounded hover:bg-gray-100"><FiMoreVertical className="text-gray-600" /></button>}
          position="left top"
        >
          {(close) => (
            <div className='bg-white flex flex-col py-4 px-8 text-left space-y-5 shadow-md rounded'>
              <button  className='text-left'  onClick={() => window.open(row.image, "_blank")}>Download Resume</button>
              <button  className='text-left' onClick={() => { deleteItem(row._id); close(); }}>Delete</button>
            </div>
          )}
        </Popup>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="w-full flex justify-between bg-white px-4 pt-8">
        <h2 className='text-[20px]'>Candidates</h2>
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
                      navigate("/profile")
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

      <div className="flex-1 bg-white px-5 py-8 overflow-auto">
        <div className="flex justify-between items-center gap-4 mb-6">
          <div className="flex gap-4">
            <StatusDropdown
              option={[
                { label: "Select", value: "" },
                { label: "New", value: "New" },
                { label: "Selected", value: "Selected" },
                { label: "Rejected", value: "Rejected" },
              ]}
              handlefilter={handleFilter}
              command="status"
            />

            <StatusDropdown
              option={[
                { label: "Position", value: "" },
                { label: "New", value: "New" },
                { label: "Selected", value: "Selected" },
                { label: "Rejected", value: "Rejected" },
              ]}
              handlefilter={handleFilter}
              command="position"
            />
          </div>

          <div className="flex gap-4">
            <input
              type="search"
              placeholder="Search"
              className="text-black p-2 px-4 border rounded-3xl border-[#ABABAB]"
              //onChange={(e) => handleFilter("searchKey", e)}
              value={seachitem}
              onChange={(e)=>setSearchitem(e.target.value)}
            />
            <button
              onClick={() => setOpen(true)}
              className="bg-custom-purple text-white px-10 h-[39px] rounded-3xl hover:border-black"
            >
              Add Candidate
            </button>
          </div>
        </div>

        <div className="flex-1">
          <Table columns={columns} data={data} />
        </div>
      </div>

      {open && (
        <Suspense fallback={<div>Loading form...</div>}>
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center animate-fade">
            <Form setOpen={setOpen} getData={getData} />
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default React.memo(Index);
