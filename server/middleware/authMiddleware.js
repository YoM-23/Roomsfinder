import User from "../models/User.js";

//Middleware to check if authenticated
export const protect = async (req, res, next)=>{
    const {userId} = req.auth;
    if(!userId){
        return res.json({success: false, message: "not authenticated"})
    } else {
        try {
            const user = await User.findById(userId);
            req.user = user;
            next()
        } catch (error) {
            res.json({success: false, message: error.message})
        }
    }
}