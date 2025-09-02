import { createContext, use, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext()

export const AppContextProvider =(props)=>{

    const [searchFilter, setSearchFilter] = useState({
        title:"",
        location: ""
    })
   const [isSearch, setIsSearch] = useState(false)

   const [jobs, setJobs ] = useState([])

   const[showRecruiterLogin, setShowRecruiterLogin] = useState(false)
   //fetch job data
   const fetchJobs = async()=>{
    setJobs(jobsData)
   }

   useEffect(() => {
     fetchJobs()
   }, [])
   
   
    const value = {
        setSearchFilter, searchFilter,
        isSearch, setIsSearch,
        jobs, setJobs,
        setShowRecruiterLogin, showRecruiterLogin
    }
    return(<AppContext.Provider value={value} >
        {props.children}
    </AppContext.Provider>)
}
