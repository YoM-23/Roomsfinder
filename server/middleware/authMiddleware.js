import { getAuth } from "@clerk/express";
import User from "../models/User.js";

//Middleware to check if authenticated
export const protect = async (req, res, next)=>{
    try {
        const auth = getAuth(req);
        console.log("Auth Debug (getAuth):", auth); 
        const {userId} = auth;

        if(!userId){
            return res.json({success: false, message: "not authenticated"})
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({success: false, message: "User profile not synced yet. Please wait a few seconds or re-login."})
        }
        req.user = user;
        next()
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        res.status(500).json({success: false, message: "Authentication internal error. Check server logs."})
    }
}