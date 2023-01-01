import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";
import asyncHandler from 'express-async-handler'

const userServices = {}


userServices.getUserProcess = asyncHandler(async (req, res) => {
    try {
        const users = await User.find().select('-password').lean()
        if(users) return res.status(200).json({success: true, users})
        
    } catch(error) {
        return res.status(500).json({success: false, error: error.message})
    }
     
})

export default userServices