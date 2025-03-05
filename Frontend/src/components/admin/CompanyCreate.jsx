import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { COMPANY_API_END_POINT } from "@/utils/constants"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"

const CompanyCreate = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name,setname] = useState()

    const registerCompany = async()=>{
        try{
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{name},{
                headers:{
                    'Content-Type' : 'application/json'
                },
                withCredentials : true
            })
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="max-w-4xl mx-auto">
                <div className="my-10">
                    <h1 className="text-2-xl font-bold" >Your Company Name</h1>
                    <p className="text-gray-500" >What would you like to give your company name?</p>
                </div>

                <Label>Company Name</Label>
                <Input
                type="text"
                className="my-2"
                placeholder="Microsoft, Google"
                onChange = {(e)=>setname(e.target.value)}
                />
                <div className="flex items-center gap-2 my-10" >
                    <Button variant="outline" className="cursor-pointer" onClick={()=>navigate('/admin/companies')} >Cancel</Button>
                    <Button className="cursor-pointer" onClick={registerCompany} >Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
