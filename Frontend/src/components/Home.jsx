import Navbar from "./shared/Navbar"
import HeroSection from "./HeroSection"
import CategoryCarousel from "./CategoryCarousel"
import LatestJobs from "./LatestJobs"
import Footer from "./shared/Footer"
import useGetAlljobs from "@/hooks/useGetAlljobs"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Home = () => {
    useGetAlljobs()
    const navigate = useNavigate()
    const {user} = useSelector(store=>store.auth)
    useEffect(() => {
        if(user?.role === 'recruiter'){
            navigate("/admin/companies")
        }
    }, [])
    
    return (
        <div>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            <Footer />
        </div>
    )
}

export default Home
