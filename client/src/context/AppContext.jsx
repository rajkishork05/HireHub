import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext()

export const AppContextProvider =(props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const {user} = useUser()
    const {getToken} = useAuth()

    const [searchFilter, setSearchFilter] = useState({
        title:"",
        location: ""
    })
   const [isSearch, setIsSearch] = useState(false)

   const [jobs, setJobs ] = useState([])

    const[userData, setUserData] = useState(null)
    const[userApplications, setUserApplications] = useState([])

   const[showRecruiterLogin, setShowRecruiterLogin] = useState(false)
   //fetch job data
   const [companyToken, setCompanyToken] = useState(null)
   const [companyData, setCompanyData] = useState(null)

   const fetchJobs = async()=>{
    try {
        const {data} = await axios.get(backendUrl + "/api/jobs")
        if(data.success){
            setJobs(data.jobs)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
    
   }

   //func to fetch company data 
   const fetchCompanyData = async () => {

    try {
        
        const {data} = await axios.get(backendUrl + "/api/company/company", {headers : {token : companyToken}})
        
        if(data.success){
            setCompanyData(data.company)
            
        }else{
            toast.error(data.message)
        }

    } catch (error) {
        toast.error(error.message)           
    }

   }

   //to fetch user data
   const fetchUserData = async()=>{
    try {
        const token = await getToken()
        const {data}= await axios.get(backendUrl + "/api/users/user", {headers: {Authorization: `Bearer ${token}`}})
        if(data.success){
            setUserData(data.user)

        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
   }

   //fetch user apply application data

   const fetchUserApplications = async()=>{
    try {
        const token = await getToken()
        const {data} = await axios.get(backendUrl + "/api/users/applications",
            {headers: {Authorization: `Bearer ${token}`}}
        )
        if(data.success){
            setUserApplications(data.applications)

        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
   }


   useEffect(() => {
     fetchJobs()

     const storedCompanyToken = localStorage.getItem("companyToken")
     if(storedCompanyToken){
        setCompanyToken(storedCompanyToken)
     }
   }, [])
   
   useEffect(() => {
    if(companyToken){
        fetchCompanyData()
    }
   }, [companyToken])

   useEffect(() => {
     if(user){
        fetchUserData()
        fetchUserApplications()
     }
   }, [user])
   
   
   
    const value = {
        setSearchFilter, searchFilter,
        isSearch, setIsSearch,
        jobs, setJobs,
        setShowRecruiterLogin, showRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl, 
        userData, setUserData,
        userApplications, setUserApplications,
        fetchUserData, 
        fetchUserApplications
    }
    return(<AppContext.Provider value={value} >
        {props.children}
    </AppContext.Provider>)
}
