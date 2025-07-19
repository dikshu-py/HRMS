import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Global/Header'
import Table from "./Components/Table/index"
import Formdata from "./Components/FormData"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import View from "./Components/FormData/view"
import Login from "./Components/Auth/Login"
import Register from  "./Components/Auth/Register"
import PrivateRoutes from './Components/PRotectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
     
      <Routes>
        
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        
      {/* protected Route   */}
      <Route element={<PrivateRoutes />}>
          // only showin if they have token
          <Route path="/" element={<Table />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/add-product" element={<Formdata />} />
          <Route path="/detail/:id" element={<View />} />
          <Route path="/edit/:id" element={<Formdata />} />
        
      </Route>
      </Routes> </BrowserRouter>
  )
}

export default App
