import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ApiClient from '../../ApiClient/ApiClient'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';



const Users = () => {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
  
    
   
    const decoded = jwtDecode(token);
    const userId = decoded.id || decoded._id || decoded.userId
    console.log("User ID:", userId);

    console.log("Decode ID:", decoded);
       

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async () => {
        try {
            const res = await ApiClient.get('/allusers')
            console.log(res.data.data)
            setUsers(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className=' p-4 min-h-full overflow-auto rounded-xl border-1 border-[#ABABAB] '>

            {
                users.length > 0 &&
                users.filter((user)=> user._id != userId).map((user) => {
                    return (
                        <div className='overflow-hidden'>
                            <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700" onClick={()=>navigate(`/discussion/${user._id}`)}>
                            <li class="cursor-pointer pb-3 sm:pb-4 border-b-1 border-[#ABABAB]" >
                                <div class="flex items-center space-x-4 rtl:space-x-reverse mt-2">
                                    <div class="shrink-0">
                                        <img class="w-8 h-8 rounded-full" src={user.image} alt={user.name}/>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {user.name}
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {user.email}
                                        </p>
                                    </div>
                                   
                                </div>
                            </li></ul>
                            
                            </div>
                    )
                })
            }
        </div>
    )
}

export default Users