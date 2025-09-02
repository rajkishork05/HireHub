import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Dashboard = () => {

    const navigate = useNavigate()

  return (
    <div className='min-h-screen' >

        {/* navbar recruiter */}

        <div className='shadow ' >
            <div className='px-5 flex justify-between items-center' >
            <img onClick={()=> navigate("/")}  className='w-20 cursor-pointer ' src={assets.logo} alt="" />
            <div className='flex items-center gap-3' >
                <p className='max-sm:hidden' >Welcome, Recruiter</p>
                <div className='relative group' >
                    <img src={assets.company_icon} alt="" />
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12' >
                        <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm' >
                            <li className='py-1 pr-10 px-2 cursor-pointer' >Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <div className='flex items-start' >
            {/* sidebar */}
            <div className='inline-block min-h-screen border-r-2 border-neutral-300' >
                <ul className='flex flex-col items-start pt-5 text-gray-800' >
                    <NavLink className={({isActive})=> `flex items-center p-3 sm:p-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-red-100 border-r-4 border-red-500'} ` }  to={"/dashboard/add-job"}>
                    <img className='min-w-4' src={assets.add_icon} alt="" />
                    <p className='max-sm:hidden'>Add Job</p>
                    </NavLink>

                    <NavLink  className={({isActive})=> `flex items-center p-3 sm:p-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-green-100 border-r-4 border-green-500'} ` } to={"/dashboard/manage-jobs"}>
                    <img className='min-w-4' src={assets.home_icon} alt="" />
                    <p className='max-sm:hidden'>Manage Jobs</p>
                    </NavLink>

                    <NavLink  className={({isActive})=> `flex items-center p-3 sm:p-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'} ` } to={"/dashboard/view-applications"}>
                    <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                    <p className='max-sm:hidden'>View Applications</p>
                    </NavLink>
                </ul>
            </div>

            <div>
                <Outlet/>
            </div>

        </div>
      
    </div>
  )
}

export default Dashboard
