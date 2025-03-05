import { setAdminJobs } from "@/redux/jobSlice"
import { JOB_API_END_POINT } from "@/utils/constants"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAdminJobs = async ()=>{
            try{
                const res = await axios.get(`${JOB_API_END_POINT}/adminJobs`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAdminJobs(res.data.jobs)) 
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchAdminJobs()
    }, [])

}

export default useGetAdminJobs
