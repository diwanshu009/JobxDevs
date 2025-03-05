import Job from "../models/job.model.js"

export const createJob = async(req,res)=>{
    try{
        const {title,description,requirements,experienceLevel,salary,location,jobType,positions,company} = req.body
        const userId = req.id
        if(!title || !description || !requirements || !experienceLevel || !salary || !location || !jobType || !positions || !company){
            return res.status(400).json({
                success:false,
                message: "Something is missing"
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel,
            positions,
            company,
            createdBy: userId
        })
        return res.status(201).json({
            job,
            success:true,
            message: "Job created Successfully"
        })
    }catch(err){
        console.log(err)
    }
}

export const getAllJobs = async(req,res)=>{
    try{
        const keyword = req.query.keyword || ""
        const query = {
            $or:[  // syntatical sugar
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        }
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt:-1})
        if(!jobs){
            return res.status(404).json({
                success:false,
                message:"No such jobs found"
            })
        }
        return res.status(200).json({
            success:true,
            jobs
        })
    }catch(err){
        console.log(err)
    }
}

export const getJobById = async(req,res)=>{
    try{
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path: "applications"
        })
        if(!job){
            res.status(404).json({
                success:false,
                message:"Job not found"
            })
        }
        res.status(200).json({
            success:true,
            job
        })
    }catch(err){
        console.log(err)
    }
}

export const adminCreatedJobs = async(req,res)=>{
    try{
        const adminId = req.id
        const jobs = await Job.find({createdBy:adminId}).populate({
            path: 'company',
            createdAt : -1
        })
        if(!jobs){
            res.status(404).json({
                success:false,
                message:"No job created"
            })
        }
        res.status(200).json({
            success:true,
            jobs
        })
    }catch(err){
        console.log(err)
    }
}