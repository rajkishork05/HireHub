import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div className='shadow py-1'>
      <div className='container py-4 2xl:px-20 mx-auto flex justify-between items-center' >
        <img className='w-30 bg-amber-500' src={assets.logo} alt="" />
        <div className='flex gap-4 max-sm:text-xs' >
        <button className='text-gray-500' >Recruiter Login</button>
        <button className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full' >Login</button>
      </div>
      </div>
    </div>
  )
}

export default Navbar
