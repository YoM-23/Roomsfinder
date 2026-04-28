import Home from "../models/Home.js";
import User from "../models/User.js";

export const registerHome = async (req, res)=>{
    try {
        const {name, address, contact, city} = req.body;
        const owner = req.user._id

        //Check if User Already Registered
        const home = await Home.findOne({owner})
        if (home) {
            return res.json({ success: false, message: "Home Already Registered" })
        }

        await Home.create({name, address, contact, city, owner});

        await User.findByIdAndUpdate(owner, {role: "homeOwner"});

        res.json({success: true, message: "Home Registered Successfully"})
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}