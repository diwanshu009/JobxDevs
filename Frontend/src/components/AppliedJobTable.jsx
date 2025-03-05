import { useSelector } from "react-redux"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const AppliedJobTable = () => {
    const {appliedJobs} = useSelector(store=>store.job)
    return (
        <div>
            <Table>
                <TableCaption>List of applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        appliedJobs?.length <=0 ? <span>You have not applied for any job yet</span> : appliedJobs?.map((appliedJob)=>(
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob?.job?.title}</TableCell>
                                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                                <TableCell className="text-right" ><Badge className={`${appliedJob.status === 'rejected'? 'bg-red-500': appliedJob.status === 'pending'? 'bg-yellow-500' : 'bg-green-500'}`}>{appliedJob?.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
