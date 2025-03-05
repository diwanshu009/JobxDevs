import { createBrowserRouter } from "react-router-dom"
import SignUp from "./components/auth/SignUp"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import { RouterProvider } from "react-router"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import CompanyCreate from "./components/admin/CompanyCreate"
import CompanySetup from "./components/admin/CompanySetup"
import AdminJobs from "./components/admin/AdminJobs"
import JobCreate from "./components/admin/JobCreate"
import Applicants from "./components/admin/Applicants"
import ProtectedRoutes from "./components/admin/ProtectedRoutes"

const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },{
        path:'/signup',
        element:<SignUp/>
    },{
        path:'/login',
        element: <Login/>
    },{
        path: '/jobs',
        element: <Jobs/>
    },{
        path: '/description/:id',
        element: <JobDescription/>
    },
    {
        path: '/browse',
        element : <Browse/>
    },{
        path: '/profile',
        element: <Profile/>
    },{
        path: '/admin/companies',
        element: <ProtectedRoutes> <Companies/></ProtectedRoutes>
    },{
        path: '/admin/companies/create',
        element: <ProtectedRoutes><CompanyCreate/></ProtectedRoutes>
    },{
        path: '/admin/companies/:id',
        element: <ProtectedRoutes><CompanySetup/></ProtectedRoutes>
    },{
        path : '/adminJobs',
        element : <ProtectedRoutes><AdminJobs/></ProtectedRoutes>
    },{
        path : '/adminJobs/create',
        element : <ProtectedRoutes><JobCreate/></ProtectedRoutes>
    },{
        path: '/adminJobs/:id/applicants',
        element : <ProtectedRoutes><Applicants/></ProtectedRoutes>
    }
])

const App = ()=>{
    return (
        <>
            <RouterProvider router={appRouter}/>
        </>
    )
}

export default App