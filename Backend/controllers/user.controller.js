import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getDataUri from '../utils/datauri.js'
import cloudinary from "../utils/cloudinary.js"

export const register = async (req,res)=>{
    try{
        const {username,email,password,phoneNumber,role} = req.body
        if(!username || !email || !password || !phoneNumber || !role){
            return res.status(400).json({
                success:false,
                message:"Please enter required fields"
            })
        }
        const file = req.file
        if(!file){
            return res.status(400).json({
                success:false,
                message: "Please upload a profile photo"
            })
        }
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content,{
            resource_type: "image"
        })
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists with this email"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        user = await User.create({
            username,
            password:hashedPassword,
            email,
            phoneNumber,
            role,
            profile:{
                profilePhoto: cloudResponse.secure_url,
            }
        })
        const userResponse = {
            _id: user._id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };
        return res.status(201).json({
            success:true,
            message:"Account created successfully",
            user: userResponse
        })
    }catch(err){
        console.log(err)
    }
}

export const login = async (req,res)=>{
    try{
        const {email,password,role} = req.body
        if(!email || !password || !role){
            return res.status(400).json({
                success:false,
                message:"Please enter required fields"
            })
        }
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message: "Please Sign-Up first"
            })
        }
        const isCorrect = await bcrypt.compare(password,user.password)
        if(!isCorrect){
            return res.status(400).json({
                success:false,
                message: "Wrong password"
            })
        }
        if(role !== user.role){
            return res.status(400).json({
                success: false,
                message: "Account doesn't exit with current role"
            })
        }
        user = {
            _id:user._id,
            username:user.username,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        const tokenData = {
            userId : user._id
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn: '1d'})
        return res.status(200).cookie("token",token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            success:true,
            user,
            message:`Welcome back ${user.username}`
        })
    }catch(err){
        console.log(err)
    }
}

export const logout = async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            success:true,
            message:"User logged out successfully"
        })
    }catch(err){
        console.log(err)
    }
}

export const updateProfile = async(req,res)=>{
    try{
        const {username,email,bio,skills,phoneNumber} = req.body
        const file = req.file
        let fileUri = null
        if(file){
            fileUri = getDataUri(file)
        }
        let cloudResponse = null
        if(fileUri){
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "raw", 
            });
        }
        let skillsArray;
        if(skills) {
            skillsArray = skills.split(',')
        }
        const userId = req.id
        let user = await User.findById(userId)
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        if(username) user.username = username
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
        if(cloudResponse && cloudResponse.secure_url){
            user.profile.resume = cloudResponse.secure_url
            user.profile.resumeOriginalName = file.originalname
        }
        await user.save()
        user = {
            _id : user._id,
            username : user.username,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role,
            profile : user.profile
        }
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            user
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}