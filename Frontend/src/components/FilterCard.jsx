import { useEffect, useState } from "react"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi","Gurugram","Noida","Bangalore","Hyderabad"]
    },{
        filterType: "Industry",
        array: ["Frontend developer","Fullstack developer","Backend developer","AI Engineer","Software Engineer","Senior Staff Engineer","Data Analyst"]
    },{
        filterType: "Salary",
        array: ["0-40k","40k-60k","60k-80k","80k-1Lakh"]
    }
]

const FilterCard = () => {
    const [selectedValue,setSelectedValue] = useState('')
    const dispatch = useDispatch()

    const changeHandler = (value)=>{
        setSelectedValue(value)
    }

    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue))
    },[selectedValue])

    return (
        <div className="w-full bg-white p-3 rounded-md" >
            <h1 className="font-bold text-lg">Filter Jobs</h1>
            <hr className="mt-3"/>
            <RadioGroup value={selectedValue} onValueChange={changeHandler} >
                {
                    filterData.map((item,index)=>(
                        <div key={index}>
                            <h1 className="font-bold text-lg">{item.filterType}</h1>
                            {
                                item.array.map((val,idx)=>{
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={idx} className="flex items-center space-x-2 my-2">
                                            <RadioGroupItem value={val} id={itemId} className="cursor-pointer" />
                                            <Label htmlFor={itemId} >{val}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
