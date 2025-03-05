import { useSelector } from "react-redux"
import LatestJobCard from "./LatestJobCard"

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job)
    return (
        <div className="max-w-7xl mx-auto my-20">
            <h1 className="text-4xl font-bold text-[#F83002]"><span className="text-black">Latest & top </span> Job Openings</h1>
            <div className="grid grid-cols-3 gap-4 my-5">
                {
                    allJobs.length <=0 ? <span>No latest job Openings</span> :
                    allJobs?.slice(0,6).map((job)=>(
                        <LatestJobCard key={job._id} job={job} />
                    ))
                }
            </div>
        </div>
    )
}

export default LatestJobs
