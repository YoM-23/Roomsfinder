import { getAuth } from "@clerk/express";
import User from "../models/User.js";

//Middleware to check if authenticated
export const protect = async (req, res, next)=>{
    const auth = getAuth(req);
    console.log("Auth Debug (getAuth):", auth); 
    const {userId} = auth;
    if(!userId){
        return res.json({success: false, message: "not authenticated"})
    } else {
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.json({success: false, message: "User profile not synced yet. Please wait a few seconds or re-login."})
            }
            req.user = user;
            next()
        } catch (error) {
            res.json({success: false, message: error.message})
        }
    }
}