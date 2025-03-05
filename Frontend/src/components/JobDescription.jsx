import { useParams } from "react-router-dom"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import axios from "axios"
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { setSingleJob } from "@/redux/jobSlice"
import { toast } from "sonner"

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams()
    const id = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${id}`, { withCredentials: true })
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getjob/${id}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchSingleJob()
    }, [id, dispatch, user?._id])

    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.positions} Openings</Badge>
                        <Badge className="text-[#0A0903] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg cursor-pointer ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#0A0903] hover:bg-[#7fd56b]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job description</h1>
            <div className="my-4">
                <h1 className="font-bold my-1">Role:<span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
                <h1 className="font-bold my-1">Location:<span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
                <h1 className="font-bold my-1">Description :<span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
                <h1 className="font-bold my-1">Experience:<span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} year</span></h1>
                <h1 className="font-bold my-1">Salary:<span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span></h1>
                <h1 className="font-bold my-1">Total Applications:<span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
                <h1 className="font-bold my-1">Posted Date:<span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription
