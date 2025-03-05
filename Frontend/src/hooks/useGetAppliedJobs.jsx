import { setAppliedJobs } from "@/redux/jobSlice"
import { APPLICATION_API_END_POINT } from "@/utils/constants"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        const fetchAppliedJobs = async()=>{
            try{
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAppliedJobs(res.data.applications))
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchAppliedJobs()
    },[])
}

export default useGetAppliedJobs
