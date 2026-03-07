import React from 'react'
import { Routes, Route } from 'react-router';
import { ToastContainer } from "react-toastify";
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import VerifyEmail from "./Pages/VerifyEmail"
import Dashboard from './Pages/Dashboard';
import ForgotPassword from "./Pages/ForgotPassword"
import ResetPassword from './Pages/ResetPassword';
export default function App() {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>

      <ToastContainer position="top-center" theme="dark" autoClose={2000}/>
    </div>
  )
}
