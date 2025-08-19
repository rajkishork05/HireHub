import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocation } from '../assets/assets'

const JobListing = () => {

    const {isSearch, searchFilter, setSearchFilter} = useContext(AppContext)
  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8' >
      
      {/* this is sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4' >
        {/* search filters */}
        {
            isSearch && (searchFilter.title !== "" || searchFilter.location !== "") && (
                <>
                <h3 className='font-medium text-lg mb-4' >
                    Current Search
                </h3>
                <div className='mb-4 text-gray-600' >
                    {searchFilter.title && (
                        <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded' >
                            {searchFilter.title}
                            <img onClick={e => setSearchFilter(prev => ({...prev, title:""}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                        </span>
                    )}
                    {searchFilter.location &&(
                        <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded' >
                            {searchFilter.location}
                            <img onClick={e => setSearchFilter(prev => ({...prev, location:""}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                        </span>
                    )}


                </div>
                </>
            )
           
        }

        {/* category */}
        <div className='max-lg:hidden' >
            <h4 className='font-medium text-lg py-4' >Search by Categories</h4>
            <ul className='space-y-4 text-gray-600' >
                {
                    JobCategories.map((category, index)=>(
                        <li className='flex gap-3 items-center' key={index} >
                            <input className='scale-125' type="checkbox" />
                            {category}
                        </li>
                    ))
                }
            </ul>
        </div>

      {/* location */}
      <div className='max-lg:hidden' >
        <h4 className='font-medium text-lg py-4' >Search by Locations</h4>
        <ul className='space-y-4 text-gray-600' >
            {
                JobLocation.map((location, index)=> (
                    <li className='flex gap-3 items-center' key={index} >
                        <input className='scale-125' type="checkbox" />
                        {location}
                    </li>
                ))
            }
        </ul>
      </div>
      </div>



    </div>
  )
}

export default JobListing
