import React from 'react'
import NavBar from '../Components/NavBar'

const home = () => {

  return (
  <>
    <NavBar/>
   <div className="relative w-full h-screen">
    <img
      className="hidden sm:block absolute w-full h-full object-cover"
      src="/src/Images/background.png"
      alt="Background"
    />
    <div className=" fixed top-0 left-0 w-full h-screen"></div>
    <div className="fixed w-full px-4 py-24 z-50 flex justify-center items-center">
      <div className="max-w-[400px] w-full  bg-white/50 p-8 text-cyan-800">
        <h1 className="text-3xl font-bold mb-8">Welcom home</h1>
        
      </div>
    </div>
  </div>
  </>
   
  )
}

export default home
