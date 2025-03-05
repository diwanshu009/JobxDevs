import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchJobByText } from "@/redux/jobSlice"
import AdminJobTable from "./AdminJobTable"
import useGetAdminJobs from "@/hooks/useGetAdminJobs"

const AdminJobs = () => {
    useGetAdminJobs()
    const [input,setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setSearchJobByText(input))
    },[input])

    return (
        <div>
            <Navbar/>
            <div className="max-w-6xl mx-auto my-10" >
                <div className="flex items-center justify-between my-5">
                    <Input
                    className="w-fit"
                    placeholder="Filter by name, role"
                    onChange={(e)=>setInput(e.target.value)}
                    />
                    <Button className="cursor-pointer" onClick={()=>navigate("/adminJobs/create")} >New Job</Button>
                </div>
                <AdminJobTable/>
            </div>
        </div>
    )
}

export default AdminJobs
