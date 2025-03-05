import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constants"
import { toast } from "sonner"
import { setUser } from "@/redux/authSlice"

// eslint-disable-next-line react/prop-types
const UpdateProfileDialogue = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)

    const [input, setInput] = useState({
        name: user?.username || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill=>skill) || "",
        file: user?.profile?.resume || ""
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("username", input.name)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }
        } catch (err) {
            console.error(err.response?.data);
            toast.error(err.response?.data?.message || "Something went wrong!")
        } finally {
            setLoading(false)
        }
        setOpen(false)
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)} >
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                        <DialogDescription>
                            Update your profile information here, including your Name, Email, Phone Number, Bio, Skills, and Resume.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitHandler} >
                        <div className="grid gap-4 py-4" >
                            <div className="grid grid-cols-4 item-center gap-4">
                                <Label htmlFor="name" className="text-right" >Name</Label>
                                <Input id="name" name="name" value={input.name} type="text"
                                    onChange={(e) => changeEventHandler(e)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 item-center gap-4">
                                <Label htmlFor="email" className="text-right" >Email</Label>
                                <Input id="email" name="email" value={input.email} type="email"
                                    onChange={(e) => changeEventHandler(e)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 item-center gap-4">
                                <Label htmlFor="number" className="text-right" >Number</Label>
                                <Input id="number" name="number" value={input.phoneNumber} onChange={(e) => changeEventHandler(e)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 item-center gap-4">
                                <Label htmlFor="bio" className="text-right" >Bio</Label>
                                <Input id="bio" name="bio" value={input.bio} onChange={(e) => changeEventHandler(e)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 item-center gap-4">
                                <Label htmlFor="skills" className="text-right" >Skills</Label>
                                <Input id="skills" name="skills" value={input.skills}  onChange={(e) => changeEventHandler(e)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 item-center gap-4">
                                <Label htmlFor="file" className="text-right" >Resume</Label>
                                <Input id="file" type="file" name="file" accept="application/pdf" className="col-span-3" onChange={(e) => changeFileHandler(e)} />
                            </div>
                        </div>
                        <DialogFooter>
                            {loading ? (
                                <Button className="w-full my-4 bg-blue-500 text-white flex justify-center items-center py-2 px-4 rounded-md">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please Wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full my-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
                                >
                                    Update Profile
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialogue
