import Application from "../models/application.model.js"
import Job from "../models/job.model.js"

export const applyJob = async(req,res)=>{
    try{
        const userId = req.id
        const jobId = req.params.id
        if(!jobId){
            return res.status(400).json({
                success:false,
                message:"Job id is required" 
            })
        }
        const existingApplication = await Application.findOne({job:jobId,applicant:userId})
        if(existingApplication){
            return res.status(400).json({
                success:false,
                message:"Already applied for the job"
            })
        }
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not present"
            })
        }
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        })
        job.applications.push(newApplication._id)
        await job.save();
        return res.status(201).json({
            success:true,
            message:"You have applied for the job successfully"
        })
    }catch(err){
        console.log(err)
    }
}

export const getAppliedJobs = async(req,res)=>{
    try{
        const userId = req.id
        const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path: 'company',
                options:{sort:{createdAt:-1}}
            }
        })
        if(!applications){
            return res.status(404).json({
                success:false,
                message:"Not applied for any job"
            })
        }
        return res.status(200).json({
            success:true,
            applications
        })
    }catch(err){
        console.log(err)
    }
}

export const getApplicants = async(req,res)=>{
    try{
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path : 'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        })
        if(!job){
            return res.status(404).json({
                success:false,
                message:"No such jobs found"
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    }catch(err){
        console.log(err)
    }
}

export const updateStatus = async(req,res)=>{
    try{
        const {status} = req.body
        const applicationId = req.params.id
        if(!status){
            return res.status(400).json({
                success:false,
                message:"status is required to update"
            })
        }
        const application = await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(404).json({
                success:false,
                message:"Application not found"
            })
        }
        application.status = status.toLowerCase()
        await application.save()
        
        return res.status(200).json({
            success:true,
            message:"Status updated successfully"
        })
    }catch(err){
        console.log(err)
    }
}