import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiClient from '../../ApiClient/ApiClient';
import { FaLocationArrow } from "react-icons/fa6";  
const Room = () => {

    const { id } = useParams()
    const [user, setUser] = useState()
    const [messagecache,setMessageCache] = useState('')
    const [messages, setMessages] = useState()
    useEffect(() => {
        getUserDetails()
        
    }, [id])    
    useEffect(()=>{
        getConsversationMessages()
    },[id])

    //to Fetch all the User Details 
    const getUserDetails = async () => {
        if(id){
            const res = await ApiClient.get(`/employee/${id}`)

            setUser(res.data.data)

        }
        
    }

    //to Fetch all the User Chat Conversation
    const getConsversationMessages = async () => {
        if(id){
            const res = await ApiClient.get(`/message/${id}`)
        }
        
        console.log("Messages")
        setMessages(res.data)

    }

    const sendMessage = async()=>{
        const res = ApiClient.post(`/message/${id}`,{message : messagecache}).then((res)=> setMessageCache('')).catch((err)=>console.log(err))

    }


    return (
        <div className="flex flex-col h-screen  w-full p-2">
            {/* Header */}
            <div className="flex items-center justify-between bg-white shadow p-4">
                <div className="flex items-center gap-3">
                    <img
                        src="https://randomuser.me/api/portraits/women/65.jpg"
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h2 className="font-semibold text-gray-800">{user?.name || "Rober"}</h2>
                        <p className="text-sm text-green-600">Active</p>
                    </div>
                </div>
                {/* <MoreVertical className="text-gray-500 cursor-pointer" /> */}
            </div>

            {/* Messages */}
           <div className='h-full overflow-auto w-full'>
             {
                
                messages &&  messages.length > 0 ?
                (Object.values(messages).map((message)=>{
                    console.log(message)
                    const isSender = message.receiverId == id
                    return(
                        <div className="flex-1 p-4 space-y-4 bg-gray-100">
                
                <div
                    className={`flex flex-col ${isSender ? "items-end" : "items-start"
                        }`}
                >
                    <div
                        className={`px-4 py-2 rounded-lg max-w-xs ${isSender
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-800"
                            }`}
                    >
                        {message.message}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                        {message.createdAt} {isSender && "✓✓"}
                    </span>
                </div>

            </div>
            
            

                    )
                })):( <div className='h-full w-full items-center text-center'>Tap to Chat</div>)
            }
           </div>
            

            {/* Input Box */}
            <div className="flex items-center gap-3 bg-white p-3 shadow">
                {/* <Mic className="text-gray-500 cursor-pointer" /> */}
                <input
                    type="text"
                    onChange={(e)=>setMessageCache(e.target.value)}
                    value = {messagecache}
                    placeholder="Type something here..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
                />
                {/* <Paperclip className="text-gray-500 cursor-pointer" /> */}
                <button className="bg-green-500 text-white p-2 rounded-full" onClick={()=>sendMessage()}>
                  <FaLocationArrow />
                </button>
            </div>
        </div>
    );
};
export default Room