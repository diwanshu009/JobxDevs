import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import userRoute from './routes/user.route.js'
import { connectDB } from './db/index.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'
const app = express()

const corsOptions = {
    origin: true, 
    credentials: true, 
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors(corsOptions))

app.use('/api/v1/user',userRoute)
app.use('/api/v1/company',companyRoute)
app.use('/api/v1/job',jobRoute)
app.use('/api/v1/application',applicationRoute)

app.listen(process.env.PORT,()=>{
    connectDB()
    .then(()=>{
        console.log("database connected")
    })
    .catch((err)=>{
        console.log(err)
    })
    console.log(`Server is running on ${process.env.PORT}`)
})