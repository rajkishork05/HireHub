import React from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
const Navbar = () => {

  const {openSignIn} = useClerk()

  const {user} = useUser()


  return (
    <div className='shadow py-1'>
      <div className='container py-1 2xl:px-20 mx-auto flex justify-between items-center' >
        <img className='w-20' src={assets.logo} alt="" />
        {
          user 
          ? 
          <div className='flex item-center gap-3' >
            <Link to={"/applications"} >Applied Jobs </Link>
            <p></p>
            <p>Hi, {user.firstName+" "+user.lastName}</p>
            <UserButton/>
          </div>
          :
        <div className='flex gap-4 max-sm:text-xs' >
        <button className='text-gray-500' >Recruiter Login</button>
        <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full' >Login</button>
      </div>}
      </div>
    </div>
  )
}

export default Navbar
