import axios from 'axios';
import React, { useState } from 'react'
import ApiClient from '../ApiClient/ApiClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [data,setData] = useState({
        email : "",
        password : ""
    })
     const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()
    const handlesubmit = async (e) =>{
        e.preventDefault(); // ✅ prevent page reload
        console.log(data)
        const res = await ApiClient.post('/login', data).then(
            (res)=>{

                console.log(res)
                if(res.data.success){
                    localStorage.setItem('token', res.data.data.token)
                    navigate("/")
                }
            }
        ).catch((err)=>console.log(err))
    }



 return (
        <div className="min-h-screen sm:pb-8 flex flex-col gap-10 items-center sm:justify-center bg-gray-100">
            <div className="flex items-center space-x-2 text-purple-700 text-[32px] font-semibold">
                <div className="w-6 h-6 border-2 border-purple-700" />
                <span>LOGO</span>
            </div>

            <div className="flex w-[90%] max-w-6xl rounded-2xl shadow-lg overflow-hidden bg-white">
                <div className="hidden sm:block w-1/2 bg-[#4D007D] text-white p-14 flex flex-col items-center justify-center text-center space-y-6">
                    <img
                        src='https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt="Dashboard Preview"
                        className="rounded-lg w-[520px] h-[284px]"
                    />
                    <h2 className="text-lg font-semibold">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    </h2>
                    <p className="text-sm">
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </p>
                    <div className="flex space-x-2 justify-center">
                        <span className="w-2 h-2 bg-white rounded-full" />
                        <span className="w-2 h-2 bg-white/50 rounded-full" />
                        <span className="w-2 h-2 bg-white/50 rounded-full" />
                    </div>
                </div>

               <form
      onSubmit={handlesubmit}
      className="sm:w-1/2 p-12 flex flex-col items-center mx-auto space-y-6"
    >
      <div className="flex sm:justify-start justify-center w-full sm:pl-15">
        <h2 className="sm:text-xl text-[18px] font-semibold">
          Welcome to Dashboard
        </h2>
      </div>

      <div className="flex flex-col space-y-4 gap-3 w-full sm:pl-15">
        <div className="sm:h-[51px] sm:w-[375px]">
          <label className="text-[14px] font-medium">
            Email Address<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Email Address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="sm:h-[51px] sm:w-[375px]">
          <label className="text-sm font-medium">
            Password<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span
              className="absolute right-3 top-[50%] translate-y-[-50%] text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              title="Toggle password visibility"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className={`${
            data.email && data.password
              ? "bg-purple-600 cursor-pointer"
              : "bg-gray-200 cursor-not-allowed"
          } w-[121px] text-white font-[600] py-2 rounded-full`}
          disabled={!data.email || !data.password}
        >
          Login
        </button>

        <p className="text-sm text-gray-600">
          Don’t have an account?{" "}
          <a onClick={()=>navigate("/register")} className="text-purple-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </form>
            </div>
        </div>
    );
}

export default Login