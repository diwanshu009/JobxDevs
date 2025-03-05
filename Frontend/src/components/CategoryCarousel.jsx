import { useDispatch } from "react-redux"
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { useNavigate } from "react-router-dom"
import { setSearchedQuery } from "@/redux/jobSlice"

const category = [
    "Frontend developer",
    "Backend developer",
    "FullStack developer",
    "Software Engineer",
    "Senior Staff Engineer",
    "AI Engineer",
    "Devops Engineer",
    "Mobile developer",
    "Data Analyst",
    "Data Scientist",
    "Hardware Engineer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query))
        navigate('/browse')
    }
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, key) => (
                            <CarouselItem className="md:basis-1/2 lg-basis-1/3" key={key}>
                                <Button className="rounded-full cursor-pointer" onClick={()=>searchJobHandler(cat)}>{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="cursor-pointer" />
                <CarouselNext className="cursor-pointer" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
