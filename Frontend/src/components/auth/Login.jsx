import { RadioGroup } from "../ui/radio-group"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { USER_API_END_POINT } from "@/utils/constants"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setUser } from "@/redux/authSlice"
import { Loader2 } from "lucide-react"

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        role: "",
    })
    const { loading,user } = useSelector((store) => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[])

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
                <form
                    onSubmit={(e) => submitHandler(e)}
                    className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg border border-gray-200"
                >
                    <h1 className="font-bold text-2xl text-center mb-6 text-gray-700">Login</h1>
                    <div className="my-4">
                        <Label htmlFor="email">Enter your email:</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="abcd@gmail.com"
                            value={data.email}
                            onChange={(e) => changeEventHandler(e)}
                            name="email"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="my-4">
                        <Label htmlFor="password">Enter your password:</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="John@1236"
                            name="password"
                            value={data.password}
                            onChange={(e) => changeEventHandler(e)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="my-4">
                        <RadioGroup className="flex items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className="cursor-pointer"
                                    onChange={(e) => changeEventHandler(e)}
                                    checked={data.role == "student"}
                                />
                                <Label htmlFor="r1" className="text-gray-600">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                    onChange={(e) => changeEventHandler(e)}
                                    checked={data.role == "recruiter"}
                                />
                                <Label htmlFor="r2" className="text-gray-600">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4 bg-blue-500 text-white flex justify-center items-center py-2 px-4 rounded-md">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please Wait
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full my-4 bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Login
                        </Button>
                    )}
                    <div className="text-center mt-4 text-sm">
                        <span>Don&apos;t have an account? </span>
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            SignUp
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
