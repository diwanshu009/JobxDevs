import { setSingleCompany } from "@/redux/companySlice"
import { COMPANY_API_END_POINT } from "@/utils/constants"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchSingleCompany = async ()=>{
            try{
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company))
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchSingleCompany()
    }, [companyId, dispatch])

}

export default useGetCompanyById
