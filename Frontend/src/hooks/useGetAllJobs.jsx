import { setAllJobs } from "@/redux/jobSlice"
import { JOB_API_END_POINT } from "@/utils/constants"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGetAlljobs = () => {
    const {searchedQuery} = useSelector(store=>store.job)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllJobs = async ()=>{
            try{
                const res = await axios.get(`${JOB_API_END_POINT}/getjob?keyword=${searchedQuery}`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs))
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchAllJobs()
    }, [])

}

export default useGetAlljobs
