import { MoreHorizontal } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import { toast } from "sonner"
import { APPLICATION_API_END_POINT } from "@/utils/constants"
import axios from "axios"

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)
    const shortListingStatus = ["Accepted", "Rejected"]

    const statusHandler = async(status,id)=>{
        try{
            axios.defaults.withCredentials = true
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status})
            if(res.data.success){
                toast.success(res.data.message)
            }
        }catch(err){
            console.log(err)
            toast.error(err.response.message)
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>Detailed List of Job Applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right" >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((application) => (
                            <tr key={application?.applicant?._id} >
                                <TableCell>{application?.applicant?.username}</TableCell>
                                <TableCell>{application?.applicant?.email}</TableCell>
                                <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        application.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={application?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{application?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{application?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right" >
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32" >
                                            {
                                                shortListingStatus.map((status, index) => {
                                                    return (
                                                        <div key={index} onClick={()=>statusHandler(status,application?._id)} className="flex w-fit items-center my-2 cursor-pointer">
                                                            <Button variant="outline" className="cursor-pointer">{status}</Button>
                                                        </div>
                                                    )
                                                })
                                            }
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

export default ApplicantsTable
