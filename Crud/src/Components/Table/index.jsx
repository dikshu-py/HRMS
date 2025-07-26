import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import Popup from 'reactjs-popup';
import ApiClient from '../ApiClient/ApiClient';
import Table from '../Global/Table';
import StatusDropdown from '../Global/DropDown';

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
    },500)
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
              <button onClick={() => window.open(row.image, "_blank")}>Download Resume</button>
              <button onClick={() => { deleteItem(row._id); close(); }}>Delete</button>
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
          <img className='rounded-full w-6 h-6' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7AO5QoFLh_DRpDwdWFDkhdMnvNI6xsw3dbw&s' />
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
