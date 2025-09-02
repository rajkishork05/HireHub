import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocation } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {

    const { isSearch, searchFilter, setSearchFilter, jobs } = useContext(AppContext)
    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocation, setSelectedLocation] = useState([])

    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }
    const handleLocationChange = (location) => {
        setSelectedLocation(
            prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
        )
    }

    useEffect(() => {
      const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
      const matchesLocation = job => selectedLocation.length === 0 || selectedLocation.includes(job.location)
      const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase()   )
      const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

      const newFilterJobs = jobs.slice().reverse().filter(
        job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
      )


      setFilteredJobs(newFilterJobs)
      setCurrentPage(1)
    }, [jobs, selectedLocation , selectedCategories, searchFilter])
    

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
                                        <img onClick={e => setSearchFilter(prev => ({ ...prev, title: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded' >
                                        {searchFilter.location}
                                        <img onClick={e => setSearchFilter(prev => ({ ...prev, location: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}



                            </div>
                        </>
                    )

                }

                <button onClick={(e) => setShowFilter(!showFilter)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden' >
                    {showFilter ? "Close" : "Filters "}
                </button>

                {/* category */}
                <div className={showFilter ? "" : "max-lg:hidden"} >
                    <h4 className='font-medium text-lg py-4' >Search by Categories</h4>
                    <ul className='space-y-4 text-gray-600' >
                        {
                            JobCategories.map((category, index) => (
                                <li className='flex gap-3 items-center' key={index} >
                                    <input className='scale-125' type="checkbox" onChange={() => handleCategoryChange(category)}
                                        checked={selectedCategories.includes(category)} />
                                    {category}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* location */}
                <div className={showFilter ? "" : "max-lg:hidden"} >
                    <h4 className='font-medium text-lg pt-14 py-4' >Search by Locations</h4>
                    <ul className='space-y-4 text-gray-600' >
                        {
                            JobLocation.map((location, index) => (
                                <li className='flex gap-3 items-center' key={index} >
                                    <input className='scale-125' type="checkbox" onChange={() => handleLocationChange(location)} checked={selectedLocation.includes(location)} />
                                    {location}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            {/* job Listing */}
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4' >
                <h3 className='font-medium text-3xl py-2' id='job-list' >Latest Jobs</h3>
                <p className='mb-8' >Get your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' >
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>
                {/* pagination */}
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center space-x-2 mt-10' >
                        <a href="#job_list">
                            <img onClick={() => setCurrentPage(Math.max(currentPage - 1))} src={assets.left_arrow} alt="" />
                        </a>
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                            <a key={index} href="#job-list">
                                <button onClick={() => setCurrentPage(index + 1)} className={`w-10 cursor-pointer h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? "bg-blue-200 text-blue-500" : "text-gray-500"}`}>{index + 1}</button>
                            </a>
                        ))}
                        <a href="#job_list">
                            <img onClick={() => setCurrentPage(Math.min(currentPage + 1), Math.ceil(filteredJobs.length / 6))} src={assets.right_arrow} alt="" />
                        </a>
                    </div>
                )}
            </section>


        </div>
    )
}

export default JobListing
