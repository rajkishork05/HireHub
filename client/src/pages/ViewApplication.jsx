import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import Loading from "../components/Loading"
import axios from 'axios'
const ViewApplication = () => {


  const { backendUrl, companyToken } = useContext(AppContext)
  const [applicants, setApplicants] = useState(false)

  const fetchCompanyJobApplications = async () => {

    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", { headers: { token: companyToken } })
      if (data.success) {
        setApplicants(data.applications.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //function to update job application status
  const changeStatus = async (id, status) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/company/change-status", { id, status }, { headers: { token: companyToken } })
      if (data.success) {
        fetchCompanyJobApplications()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications()
    }
  }, [companyToken])


  return applicants ? applicants.length === 0 ? (<div></div>) : (
    <div className='container mx-auto p-4' >
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm ' >
          <thead>
            <tr className='border-b' >
              <th className='py-2 px-4 text-left' >#</th>
              <th className='py-2 px-4 text-left' >User name</th>
              <th className='py-2 px-4 text-left max-sm:hidden ' >Job title</th>
              <th className='py-2 px-4 text-left max-sm:hidden ' >Location</th>
              <th className='py-2 px-4 text-left' >Resume</th>
              <th className='py-2 px-4 text-left' >Action</th>
            </tr>
          </thead>
          <tbody>
            {
              applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
                <tr key={index} className='text-gray-700' >
                  <td className='text-center py-2 px-4 border-b ' >{index + 1}</td>
                  <td className='text-center py-2 px-4 border-b flex justify-center items-center' >
                    <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' src={applicant.userId.image} alt="" />
                    <span>{applicant.userId.name}</span></td>
                  <td className='max-sm:hidden py-2 px-4 border-b' >{applicant.jobId.title}</td>
                  <td className='max-sm:hidden py-2 px-4 border-b' >{applicant.jobId.location} </td>
                  <td className='py-2 px-4 border-b' >
                    <a className='bg-blue-50 text-blue-500 px-3 py-1 inline-flex rounded gap-2 items-center' href={applicant.userId.resume} target='_blank' >
                      Resume <img src={assets.resume_download_icon} alt="" />
                    </a>
                  </td>
                  <td className='py-2 px-4 border-b  relative' >
                    {applicant.status === "Pending"
                      ?

                      <div className='rlative inline-block text-left group' >
                        <button className='text-gray-500 action-button' >...</button>
                        <div className='hidden z-10 absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block' >
                          <button onClick={() => changeStatus(applicant._id, "Accepted")} className='w-full block text-left px-4 py-2 text-blue-500 hover:bg-gray-200' >Accept</button>
                          <button onClick={() => changeStatus(applicant._id, "Rejected")} className='w-full block text-left px-4 py-2 text-red-500 hover:bg-gray-200' >Reject</button>
                        </div>
                      </div>
                      : <div>{applicant.status}</div>
                    }

                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading />
}

export default ViewApplication
