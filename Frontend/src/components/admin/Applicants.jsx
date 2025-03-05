import { useEffect } from "react"
import Navbar from "../shared/Navbar"
import ApplicantsTable from "./ApplicantsTable"
import { toast } from "sonner"
import axios from "axios"
import { APPLICATION_API_END_POINT } from "@/utils/constants"
import { useParams } from "react-router-dom"
import { setApplicants } from "@/redux/applicationSlice"
import { useDispatch, useSelector } from "react-redux"

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()

    const { applicants } = useSelector(store=>store.application)

    useEffect(()=>{
        const fetchAllApplicants = async()=>{
            try{
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials: true})
                dispatch(setApplicants(res.data.job))
            }catch(err){
                console.log(err)
                toast.error(err.response.data.message)
            }
        }
        fetchAllApplicants()
    },[])

    return (
        <div className="max-w-7xl mx-auto" >
            <Navbar/>
            <div>
                <h1 className="font-bold text-xl my-5" >Applicants ({applicants?.applications?.length})</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants
