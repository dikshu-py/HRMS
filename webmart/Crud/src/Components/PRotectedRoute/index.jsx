//utils/PrivateRoutes.js

import {
    Outlet,
    Navigate
} from 'react-router-dom'
import Header from '../Global/Header'
import Sidebar from '../Global/Sidebar'

const PrivateRoutes = () => {
    let auth = localStorage.getItem('token')
    

  if (!auth) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" />
  }

  // Authenticated: render layout + child routes
  return (
    <div className="flex flex-col min-h-screen w-screen">
  {/* <Header /> */}

  <div className="flex flex-1 overflow-hidden  ">
    <Sidebar />

    <main className="flex-1 bg-gray-100  overflow-auto">
      <Outlet />
    </main>
  </div>
</div>

  )
}



export default PrivateRoutes