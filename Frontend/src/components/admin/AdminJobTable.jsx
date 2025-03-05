import { Eye, MoreHorizontal } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AdminJobTable = () => {
    const { adminJobs, searchJobByText } = useSelector(store=>store.job)
    const [filterJobs,setFilterJobs] = useState(adminJobs)
    const navigate = useNavigate()

    useEffect(()=>{
        const filteredJobs = adminJobs.filter((job)=>{
            if(!searchJobByText){
                return true
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        })
        setFilterJobs(filteredJobs)
    },[adminJobs,searchJobByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right" >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr key = {job?._id}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-35" >
                                            {/* <div onClick={()=>navigate(`/adminJobs/${job._id}`)} className="flex items-center gap-5 w-fit cursor-pointer">
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div> */}
                                            <div onClick={()=>navigate(`/adminJobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer" >
                                                <Eye className="w-4"/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobTable
