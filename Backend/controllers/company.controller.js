import Company from '../models/company.model.js'
import getDataUri from '../utils/datauri.js'
import cloudinary from '../utils/cloudinary.js'

export const registerCompany = async (req,res)=>{
    try{
        const {name} = req.body
        if(!name){
            return res.status(400).json({
                success:false,
                message:"Please enter company name"
            })
        }
        const companyName = await Company.findOne({name})
        if(companyName){
            return res.status(400).json({
                success:false,
                message:"Company is already registered"
            })
        }
        const company = await Company.create({
            name,
            userId:req.id
        })
        return res.status(201).json({
            success: true,
            message: "Company registered successfully",
            company
        })
    }catch(err){
        console.log(err)
    }
}

export const getCompany = async (req,res)=>{
    try{
        const userId = req.id
        const companies = await Company.find({userId})
        if(!companies){
            return res.status(404).json({
                success:false,
                message:"Companies not found"
            })
        }
        return res.status(200).json({
            success:true,
            companies
        })
    }catch(err){
        console.log(err)
    }
}

export const getCompanybyId = async (req,res)=>{
    try{
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(404).json({
                success:false,
                message:"Company not found"
            })
        }
        return res.status(200).json({
            success:true,
            company
        })
    }catch(err){
        console.log(err)
    }
}

export const updateCompany = async(req,res)=>{
    try{
        const {name, description, website, location} = req.body
        const file = req.file
        let logo
        if(file){
            const fileUri = getDataUri(file)
            const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content)
            logo = cloudinaryResponse.secure_url
        }

        const updatedData = {name, description, website, location, logo}
        const company = await Company.findByIdAndUpdate(req.params.id,updatedData,{new:true})
        if(!company){
            return res.status(404).json({
                success:false,
                message:"Company not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Company details updated",
        })
    }catch(err){
        console.log(err)
    }
}