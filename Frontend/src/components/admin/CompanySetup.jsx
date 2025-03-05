import { ArrowLeft, Loader2 } from "lucide-react"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import axios from "axios"
import { COMPANY_API_END_POINT } from "@/utils/constants"
import { toast } from "sonner"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import useGetCompanyById from "@/hooks/useGetCompanyById"

const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const companyId = params.id

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    
    const { singleCompany } = useSelector(store=>store.company)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name ||  "",
            description: singleCompany.description ||  "",
            website: singleCompany.website ||  "",
            location: singleCompany.location ||  "",
            file: singleCompany.file ||  null
        })
    }, [singleCompany])

    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto my-10">
                <form onSubmit={(e) => submitHandler(e)}>
                    <div className="flex items-center gap-5 p-8" >
                        <Button onClick={() => navigate('/admin/companies')} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold cursor-pointer" >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className="font-bold text-xl" >Company Setup</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4" >
                        <div>
                            <Label>Company Name :</Label>
                            <Input
                                type="text"
                                name="name"
                                onChange={(e) => changeEventHandler(e)}
                                value={input.name}
                            />
                        </div>
                        <div>
                            <Label>Description :</Label>
                            <Input
                                type="text"
                                name="description"
                                onChange={(e) => changeEventHandler(e)}
                                value={input.description}
                            />
                        </div>
                        <div>
                            <Label>Website :</Label>
                            <Input
                                type="text"
                                name="website"
                                onChange={(e) => changeEventHandler(e)}
                                value={input.website}
                            />
                        </div>
                        <div>
                            <Label>Location :</Label>
                            <Input
                                type="text"
                                name="location"
                                onChange={(e) => changeEventHandler(e)}
                                value={input.location}
                            />
                        </div>
                        <div>
                            <Label>Company Logo :</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => changeFileHandler(e)}
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 cursor-pointer" >Update</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup

