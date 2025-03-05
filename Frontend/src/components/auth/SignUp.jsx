import { RadioGroup } from "../ui/radio-group"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constants"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { Loader2 } from "lucide-react"
import { setLoading } from "@/redux/authSlice"

const SignUp = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phoneNo: "",
        password: "",
        role: "",
        file: "",
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading,user } = useSelector((store) => store.auth)

    const changeEventHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setData({ ...data, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("username", data.name)
        formData.append("email", data.email)
        formData.append("phoneNumber", data.phoneNo)
        formData.append("password", data.password)
        formData.append("role", data.role)
        if (data.file) formData.append("file", data.file)
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate("/login")
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
                    <h1 className="font-bold text-2xl text-center mb-6 text-gray-700">Sign Up</h1>
                    <div className="my-4">
                        <Label htmlFor="name">Enter your name:</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={data.name}
                            onChange={(e) => changeEventHandler(e)}
                            name="name"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
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
                        <Label htmlFor="phoneNo">Enter your phone number:</Label>
                        <Input
                            id="phoneNo"
                            type="text"
                            placeholder="8080808800"
                            value={data.phoneNo}
                            onChange={(e) => changeEventHandler(e)}
                            name="phoneNo"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="my-4">
                        <Label htmlFor="password">Enter your password:</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="John@1236"
                            value={data.password}
                            onChange={(e) => changeEventHandler(e)}
                            name="password"
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
                                    checked={data.role === "student"}
                                    onChange={(e) => changeEventHandler(e)}
                                />
                                <Label htmlFor="r1" className="text-gray-600">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                    checked={data.role === "recruiter"}
                                    onChange={(e) => changeEventHandler(e)}
                                />
                                <Label htmlFor="r2" className="text-gray-600">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="my-4 flex items-center gap-2">
                        <Label htmlFor="file" className="text-gray-600">Profile Picture</Label>
                        <Input
                            id="file"
                            type="file"
                            accept="image/*"
                            className="cursor-pointer"
                            onChange={(e) => changeFileHandler(e)}
                            name="file"
                        />
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
                            Sign Up
                        </Button>
                    )}
                    <div className="text-center mt-4 text-sm">
                        <span>Already have an account? </span>
                        <Link to="/login" className="text-green-500 hover:underline">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp
