import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../../ApiClient/ApiClient';

const AddEdit = ({ setIsopen, id ,getData }) => {
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        number: "",
        department: '',
        position: '',
        joining: '',
        status : "Pending"
    })
    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ApiClient.get(`/employee/${id}`);
                if (res.data.success) {
                    const item = res.data.data
                    setFormdata({
                        name: item.name || "",
                        email: item.email || "",
                        number: item.number || "",
                        department: item.department || "",
                        position: item.position || "",
                        joining: item.joining || "",
                    })
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [])





    const handleSubmit =async (e) => {
        e.preventDefault();
        await ApiClient.put(`/employee/${id}`,formdata).then((res)=>{
                if(res.data.success){
                     setIsopen(false)
                }
               
                
    
            }).catch((err)=> console.log(err))
       
        getData();

    }


    return (
        <div className='fixed  inset-0  bg-[rgba(229,229,229,0.5)] z-50 flex items-center justify-centers h-full'>
            <div class="bg-white w-[1080px] h-[397px]  rounded-xl overflow-hidden shadow relative  text-left  mx-auto my-auto">


                <div class="flex items-center  justify-between p-5 border-b rounded-t bg-custom-purple text-white">
                    <h3 class="text-xl font-semibold">
                        Add New Candidate
                    </h3>
                    <button onClick={()=>setIsopen(false)}>X</button>
                    {/* <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="product-modal">
           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button> */}
                </div>


                <div class="p-6 space-y-6">
                    <form onSubmit={handleSubmit}>

                        <div class="grid grid-cols-6 gap-6 gap-y-10">
                            <div class="col-span-6 sm:col-span-3 ">
                                {/* <label for="product-name" class="text-sm font-medium text-gray-900 block mb-2">Full name</label> */}
                                <input value={formdata.name} type="text" onChange={(e) => setFormdata({ ...formdata, name: e.target.value })} name="name" id="name" class="shadow-sm bg-gray-50 border border-custom-purple  text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Full Name" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                {/* <label for="category" class="text-sm font-medium text-gray-900 block mb-2">Email Adress</label> */}
                                <input value={formdata.email} type="text" onChange={(e) => setFormdata({ ...formdata, email: e.target.value })} name="email" id="email" class="shadow-sm bg-gray-50 border border-custom-purple text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Email Adress" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                {/* <label for="brand" class="text-sm font-medium text-gray-900 block mb-2">Phone Number</label> */}
                                <input value={formdata.number} type="text" onChange={(e) => setFormdata({ ...formdata, number: e.target.value })} name="brand" id="brand" class="shadow-sm bg-gray-50 border border-custom-purple text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Phone Number" required />
                            </div>
                             <div class="col-span-6 sm:col-span-3">
                                {/* <label for="price" class="text-sm font-medium text-gray-900 block mb-2">Position</label> */}
                                <input value={formdata.department} type="text" onChange={(e) => setFormdata({ ...formdata, department: e.target.value })} name="price" id="price" class="shadow-sm bg-gray-50 border border-custom-purple text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Position" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                            <select onChange={(e) => setFormdata({ ...formdata, position: e.target.value })} value={formdata.position}  className="px-4 py-2 w-full rounded-md text-sm border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none">
                                
                                <option value="Intern" className="">Intern</option>
                                    <option value="Fulltime" className="">Full Time</option>
                                    <option value="Junior" className="">Junior</option>
                                    <option value="Senior" className="">Senior</option>
                                    <option value="TeamLead" className="">Team Lead</option>
                                </select></div>
                            
                            

                            {/* <div class="col-span-full">
                    <label for="product-details" class="text-sm font-medium text-gray-900 block mb-2">Product Details</label>
                    <textarea value={formdata.detail} id="product-details" onChange={(e)=> setFormdata({...formdata, detail:e.target.value})   }      rows="6" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Details"></textarea>
                </div> */}

                            {/* <div className='text-black'>
                    {
                        !formdata.image && 
                        <div>

                        <input type="file" onChange={handleChange} accept="image/*" />
                        <button type='button' onClick={handleUpload}>Upload</button></div>
                    }
                   
                    {formdata.image && (
                        <div>
                        <p>Uploaded Image:</p>
                        <img src={formdata.image} alt="Uploaded" width="200" />
                        </div>
                    )}
                    </div> */}
                        </div>
                        {/* checkbox */}

                        <div class="  border-gray-200 rounded-b items-center justify-center w-full flex mt-[32px]">






                            <button className={`text-white font-medium rounded-3xl text-sm pt-2 pr-10 pb-2 pl-10  text-center transition 
    ${"aa"
                                    ? "bg-custom-purple  focus:ring-4 focus:ring-cyan-200"
                                    : "bg-gray-400 cursor-not-allowed opacity-60"}
  `}
                                type="submit">Save</button>
                        </div>
                    </form>
                </div>



            </div>

        </div>
    )
}

export default AddEdit