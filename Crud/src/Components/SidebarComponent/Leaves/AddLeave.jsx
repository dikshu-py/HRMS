

import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../../ApiClient/ApiClient';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import shared from '../Leaves/shared';


const AddLeave = ({ setIsopen, id ,getData ,data,namelist}) => {
    const [formdata, setFormdata] = useState({
        name : "",
        desigination :'',
        leavedate : new Date(),
        image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7AO5QoFLh_DRpDwdWFDkhdMnvNI6xsw3dbw&s',
        reason :'',
        status : "Pending"
    })
    useEffect(()=>{
        if(id){
            const foundItem = data.find((item) => item._id === id);
            if (foundItem) {
        setFormdata({
            name: foundItem.name || '',
            desigination: foundItem.desigination || '',
            leavedate: foundItem.leavedate ? new Date(foundItem.leavedate) : new Date(),
            image: foundItem.image || '',
            reason: foundItem.reason || '',
        })}
        }
        if (namelist.length > 0 && !formdata.name) {
    setFormdata((prev) => ({
      ...prev,
      name: namelist[0].name,
    }));
  }
        
    
    },[])
    






    const handleSubmit =async (e) => {
        e.preventDefault();
        if(id){
            
            await ApiClient.put(`/${shared.path}/${id}`,formdata).then((res)=>{
            console.log("a")
                if(res.data.success){
                     setIsopen(false)
                }
               
                
    
            }).catch((err)=> console.log(err))
        }else{
            await ApiClient.post(`/${shared.path}/add`,formdata).then((res)=>{
            console.log("a")
                if(res.data.success){
                     setIsopen(false)
                }
               
                
    
            }).catch((err)=> console.log(err))
        }
        
       
        getData();

    }


    return (
        <div className='fixed  inset-0  bg-black/50 z-50 flex items-center justify-centers h-full'>
            <div class="bg-white w-[1080px] h-[397px]  rounded-xl  shadow relative  text-left  mx-auto my-auto">


                <div class="flex items-center  justify-center p-5 border-b rounded-t bg-custom-purple text-white">
                    <h3 class="text-xl font-semibold">
                        Add New Leave
                    </h3>
                    {/* <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="product-modal">
           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button> */}
                </div>


                <div class="p-6 space-y-6">
                    <form onSubmit={handleSubmit}>

                        <div class="grid grid-cols-6 gap-6 gap-y-10">
                            <div class="col-span-6 sm:col-span-3 ">
                                {/* <label for="product-name" class="text-sm font-medium text-gray-900 block mb-2">Full name</label> */}
                                <select onChange={(e) => setFormdata({ ...formdata, name: e.target.value })} value={formdata.name}  className="px-4 py-2 w-full rounded-md text-sm border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none">
                                {namelist.map((item) => (
                                    <option key={item.name} value={item.name}>
                                    {(item.name)}
                                    </option>
                                ))}
                                                                
                                
                                </select>

                               
                            
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                {/* <label for="category" class="text-sm font-medium text-gray-900 block mb-2">Email Adress</label> */}
                                <input value={formdata.desigination} type="text" onChange={(e) => setFormdata({ ...formdata, desigination: e.target.value })} name="desigination" id="desigination" class="shadow-sm bg-gray-50 border border-custom-purple text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Desigination" required />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <DatePicker
                                    selected={formdata.leavedate}
                                    onChange={(date) => setFormdata({ ...formdata, leavedate: date })}
                                    name="leavedate"
                                    id="leavedate"
                                    minDate={new Date()}
                                    className="text-black w-full p-2 border border-gray-300 rounded"
                                    placeholderText="Select a date"
                                    required
                                />
                                </div>
                             <div class="col-span-6 sm:col-span-3">
                                {/* <label for="price" class="text-sm font-medium text-gray-900 block mb-2">Position</label> */}
                                <input value={formdata.image} type="text" onChange={(e) => setFormdata({ ...formdata, image: e.target.value })} name="price" id="price" class="shadow-sm bg-gray-50 border border-custom-purple text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Position" required />
                            </div>
                             <div class="col-span-6 sm:col-span-3">
                                {/* <label for="price" class="text-sm font-medium text-gray-900 block mb-2">Position</label> */}
                                <input value={formdata.reason} type="text" onChange={(e) => setFormdata({ ...formdata, reason: e.target.value })} name="price" id="price" class="shadow-sm bg-gray-50 border border-custom-purple text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Position" required />
                            </div>
                          
                            
                            

                            

                           
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

export default AddLeave