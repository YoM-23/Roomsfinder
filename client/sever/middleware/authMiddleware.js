import User from "../models/User.JS";

//Middleware to check if authenticated
export const protect = async (req, res, next)=>{
    const {userId} = req.auth;
    if(!userId){
        res.json({success: false, message: "not authenticated"})
        
    } else {
        const user = await User.finfById(userId);
        req.user = user;
        next()
    }

    }