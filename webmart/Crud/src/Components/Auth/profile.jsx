import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ApiClient from '../ApiClient/ApiClient';
import {updateUser} from "../Store/userSlice"

const Profile = () => {


    const user = useSelector((state) => state.user);
    console.log(user)
    const dispatch = useDispatch()
    const [form,setForm] = useState({
        name : user.name,
        id : user.id
    })


    const handleSubmit = async (e)=>{
        e.preventDefault()
        const res = await ApiClient.put("/updateprofile", form)
        dispatch(updateUser({ name: res.data.data.name })); 
        console.log("SUcces")
        



    }

    return (
        <div className='w-full h-full flex justify-center'>


            <form class="w-xl mx-auto text-left items-center my-auto" onSubmit={(e)=>handleSubmit(e)}>
                <div class="mb-5 flex">
                    <label for="name" class="w-1/3 my-auto block mb-2 text-md font-medium text-gray-900 dark:text-white">Name</label>
                    <input onChange={(e)=>setForm((prev)=>({...prev , name : e.target.value }))}    type="text" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  value={form.name}/>
                </div>
                <div class="mb-5 flex">
                    <label for="email" class="w-1/3 my-auto block mb-2 text-md font-medium text-gray-900 dark:text-white">Email</label>
                    <input disabled={true} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={user.email}  />
                </div>
                
                
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </form>


        </div>
    )
}

export default Profile