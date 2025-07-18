import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Header = () => {


  const token  = localStorage.getItem('token')
  const navigate = useNavigate()
  const location = useLocation(); 

  const hideHeaderRoutes = ['/login', '/register'];
  if (hideHeaderRoutes.includes(location.pathname)) {
    return null;
  }
  return (
    <div className='w-full min-w-screen'>
      <nav className="fixed top-0 left-0 right-0 z-50  bg-white shadow-md rounded-md px-4 py-2 lg:px-2 lg:py-3">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
          <a href="/" className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold ml-8">
           Crud Operations
          </a>
          
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
          </button>
          <button  onClick={()=>{
            localStorage.removeItem('token')
            navigate("/login")
          }}  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Log-Out
        </button>
        </div>
        
      </nav>
     
    </div>
  )
}

export default Header
