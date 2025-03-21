import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
    const [query, setQuery] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = ()=>{
        dispatch(setSearchedQuery(query))
        navigate('/browse')
    }

    return (
        <div className="text-center">
            <div className="flex flex-col gap-5 my-10">
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-black font-medium">No. 1 Job Search Website</span>
                <h1 className="text-5xl font-bold">Search, Apply & <br /> Get your <span className="text-[#F83002]">Dream Job</span> </h1>
                <p className="font-bold">Welcome to <span className="text-[#F83002]">JobxDevs</span> where we not only provide jobs but filter your skills to match with job</p>
                <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
                    <input
                        type="text"
                        placeholder="Search your dream job"
                        onChange={(e)=>setQuery(e.target.value)}
                        className="outline-none border-none w-full"
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#292F36] cursor-pointer">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
