import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiCLient from '../ApiClient/ApiClient'

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

  return (
   
        <div class="bg-white p-8 overflow-auto min-w-screen  mt-20">
             <div className="flex   justify-end">   {/* Add pt-16 (or adjust as per header height) */}
      <button onClick={()=>navigate("/add-product")}   className="bg-blue-400 mt-4 p-2 rounded justify-end  hover:bg-blue-700  hover:border-black">+ Add Data</button>
      
    </div>
    <div className="">
            <input type='search'
            placeholder='Search'
            className='text-black p-2 border-2 rounded-lg border-[#ABABAB]'
            onChange= {handlesearch}
            >
            </input>
          </div>
   
  <h2 class="text-2xl mb-4">Classes List</h2>
  {console.log(localStorage.getItem('token  '))}
  {/* <!-- Classes Table --> */}
  <div class="relative overflow-auto">
    <div class="overflow-x-auto rounded-lg">
      {
        
        <table class="min-w-full bg-white border mb-20">
        <thead>
          <tr class="bg-[#2B4DC994] text-center text-xs md:text-sm font-thin text-white">
            <th class="p-0">
              <span class="block py-2 px-3 border-r border-gray-300">Id</span>
            </th>
            <th class="p-0">
              <span class="block py-2 px-3 border-r border-gray-300">Name</span>
            </th>
            <th class="p-0">
              <span class="block py-2 px-3 border-r border-gray-300">category</span>
            </th>
            <th class="p-0">
              <span class="block py-2 px-3 border-r border-gray-300">Price</span>
            </th>
            
            <th class="p-4 text-xs md:text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
            {console.log(data.data)}
            { data.length > 0 && 
                data.map((item,index)=>{
                    return (
                        <tr class="border-b text-xs md:text-sm text-center text-gray-800">
                            <td class="p-2 md:p-4">{index +1}</td>
                            <td class="p-2 md:p-4">{item.name}</td>
                            <td class="p-2 md:p-4">{item.category}</td> 
                            <td class="p-2 md:p-4">{item.price}</td>
                            
                            <td class="relative p-2 md:p-4 flex justify-center space-x-2">
                            <button onClick={()=>navigate(`detail/${item._id}`)}     class="bg-amber-600 text-white px-3 py-1 rounded-md text-xs md:text-sm">View</button>    
                            <button onClick={()=>navigate(`edit/${item._id}`)} class="bg-blue-500 text-white px-3 py-1 rounded-md text-xs md:text-sm">Edit</button>
                            <button onClick={()=>deleteIetm(item._id)}   class="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm">Delete</button>
                            </td>
                        </tr>

                    )
                })
            }
          
          
         
        </tbody>
      </table>
      }
    </div>
  </div>
</div>
    
  )
}

export default index