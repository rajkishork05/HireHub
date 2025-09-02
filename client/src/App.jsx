import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJobs from './pages/Applyjobs'
import Applications from './pages/Applications'
import { AppContext } from './context/AppContext'
import RecruiterLogin from './components/RecruiterLogin'
import Dashboard from './pages/Dashboard'
import AddJobs from './pages/AddJobs'
import ManageJob from './pages/ManageJob'
import ViewApplication from './pages/ViewApplication'
import "quill/dist/quill.snow.css"
const App = () => {

const {showRecruiterLogin} = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin/>}
      {/* <h1 className='text-5xl capitalize font-extrabold text-blue-700' > rahul dev singh </h1> */}
     <Routes>
      <Route path = "/" element = {<Home/>} /> 
      <Route path = "/apply-job/:id" element = {<ApplyJobs/>} /> 
      <Route path = "/applications" element = {<Applications/>} /> 
      
      <Route path = "/dashboard" element = {<Dashboard/>} >
       <Route path='add-job' element = {<AddJobs/> } />
       <Route path='manage-jobs' element = {<ManageJob/> } />
       <Route path='view-applications' element = {<ViewApplication/> } />
      </Route> 

     </Routes> 
    </div>
  )
}

export default App
