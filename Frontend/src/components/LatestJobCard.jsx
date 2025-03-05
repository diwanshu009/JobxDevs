/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'

const LatestJobCard = ({job}) => {
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate(`/description/${job._id}`)} className="p-5 rounded-md shoadow-xl bg-white border border-gray-100 cursor-pointer">
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description} </p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className="text-blue-700 font-bold" variant="ghost">{job?.positions} positions</Badge>
                <Badge className="text-[#0A0903] font-bold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCard
