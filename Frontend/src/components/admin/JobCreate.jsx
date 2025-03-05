import { useState } from "react"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import axios from "axios"
import { JOB_API_END_POINT } from "@/utils/constants"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"

const JobCreate = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        experienceLevel: 0,
        location: "",
        salary: 0,
        jobType: "",
        positions: 0,
        company: "",
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { companies } = useSelector(store => store.company)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value.toLowerCase())
        setInput({ ...input, company: selectedCompany?._id })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_END_POINT}/post`,input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/adminJobs')
            }
        } catch (err) {
            toast.error(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-5" >
                <form onSubmit={(e) => submitHandler(e)} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label>Title :</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={(e) => changeEventHandler(e)}
                            />
                        </div>
                        <div>
                            <Label>Description :</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={(e) => changeEventHandler(e)}
                            />
                        </div>
                        <div>
                            <Label>Requirements :</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={(e) => changeEventHandler(e)}
                            />
                        </div>
                        <div>
                            <Label>Positions available : </Label>
                            <Input
                                type="number"
                                name="positions"
                                value={input.positions}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={(e) => changeEventHandler(e)}
                            />
                        </div>
                        <div>
                            <Label>Location :</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={(e) => changeEventHandler(e)}
                            />
                        </div>
                        <div>
                            <Label>Experience (in years) : </Label>
                            <Input
                                type="number"
                                name="experienceLevel"
                                value={input.experienceLevel}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={(e) => changeEventHandler(e)}
                            />
                        </div>
                        <div>
                            <Label>Salary (in LPA) : </Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={(e) => changeEventHandler(e)}
                            />
                        </div>
                        <div>
                            <Label>Job Type : </Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={(e) => changeEventHandler(e)}
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler} >
                                    <SelectTrigger className="w-[180px] cursor-pointer">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem value={company.name} key={company._id} className="cursor-pointer" >
                                                            {company.name}
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 cursor-pointer" >Post New Job</Button>
                    }
                    {
                        companies.length === 0 && <p className="text-xs text-[#F83002] font-bold text-center my-3" >*Please register a company first before posting a job</p>
                    }
                </form>

            </div>
        </div>
    )
}

export default JobCreate
