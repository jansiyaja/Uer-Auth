import React from 'react'
import AdminHeader from '../../Components/AdminHeader'
import { Link } from 'react-router-dom'

const AdminHome = () => {

  return (
  <>
    <AdminHeader/>
   <div className="relative w-full h-screen">
    <img
      className="hidden sm:block absolute w-full h-full object-cover"
      src="/src/Images/adminbackground.jpg"
      alt="Background"
    />
    <div className=" fixed top-0 left-0 w-full h-screen"></div>
    <div className="fixed w-full px-4 py-24 z-50 flex justify-center items-center">
      <div className="max-w-[400px] w-full  bg-white/50 p-8 text-gray-600">
        <h1 className="text-3xl font-bold mb-8">Welcome admin  </h1>
        <Link to="/admin/usersList">
        <h1 className="text-3xl font-bold mb-8 underline"> view Users </h1>
        </Link>
       
        
      </div>
    </div>
  </div>
  </>
   
  )
}

export default AdminHome
