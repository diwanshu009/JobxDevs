import { LogOut, User2 } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { USER_API_END_POINT } from "@/utils/constants"
import axios from "axios"
import { toast } from "sonner"
import { setUser } from "@/redux/authSlice"

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }
    }

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                    <h1 className="text-2xl font-bold">Jobx<span className="text-[#F83002]">Devs</span></h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" >Companies</Link></li>
                                    <li><Link to="/adminJobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li ><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className="flex items-center gap-2 ">
                                <Link to="/login"><Button variant="outline" className="cursor-pointer">Login</Button></Link>
                                <Link to="/signup"><Button className="cursor-pointer">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="">
                                        <div className="flex gap-4 space-y-2">
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium">{user?.username}</h4>
                                                <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col my-2 text-gray-600">
                                            {
                                                user && user.role === 'student' && (
                                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                        <User2 />
                                                        <Button variant="link"><Link to="/profile">View profile</Link></Button>
                                                    </div>
                                                )
                                            }
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <LogOut />
                                                <Button onClick={logOutHandler} className="cursor-pointer" variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
