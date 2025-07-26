import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './Components/PRotectedRoute';

// Lazy loaded components
const Login = lazy(() => import('./Components/Auth/Login'));
const Register = lazy(() => import('./Components/Auth/Register'));
const Table = lazy(() => import('./Components/Table'));
const Formdata = lazy(() => import('./Components/FormData'));
const View = lazy(() => import('./Components/FormData/view'));
const Leaves = lazy(() => import('./Components/SidebarComponent/Leaves'));
const Attendence = lazy(() => import('./Components/SidebarComponent/Attendence'));
const Employee = lazy(() => import('./Components/SidebarComponent/Employees'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Table />} />
            <Route path="/add-product" element={<Formdata />} />
            <Route path="/detail/:id" element={<View />} />
            <Route path="/edit/:id" element={<Formdata />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/attendence" element={<Attendence />} />
            <Route path="/employees" element={<Employee />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
