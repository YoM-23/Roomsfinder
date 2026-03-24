import Home from "../models/Home.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";

//API to create new room for a home
export const createRoom = async (req, res)=>{
    try {
        const {roomType, priceperNight, amenities} = req.body;
        const Home = await Home.findOne({owner: req.auth.userId})

        if(!home) return res.json({ success: false, message: "No Home found"});


        //upload images to cloudinary
        const uploadImages = req.files.map(async (file) => {
           const response = await cloudinary.uploader.upload(file.path);
           return response.secure_url;
        })

        //Wait for all uploads to complete
        const images = await Promise.all(uploadImages)

        await Room.create({
            home: hotel._id,
            roomType,
            pricePerNight: +priceperNight,
            amenities: JSON.parse(amenities),
            images,
        })
        res.JSON({ success: true, message: "Room created successfully" })
    } catch (error) {
         res.JSON({ success: false, message: error.message })
    }
}


//API to get all rooms
export const getRooms = async (req, res)=>{
    try {
        const rooms = await Room.find({isAvailable: true}).populate({
            path: 'home',
            populate:{
                path: 'owner',
                select: 'image'
            }
        }).sort({createAt: -1 })
        res.json({success: true, rooms});
    } catch (error) {
        res.json({success: false, message: error.message});
    }

}



//API to get all rooms for a specific home
export const getOwnerRooms = async (req, res)=>{
    try {
        const homeData = await Home({owner:req.auth.userId})
        const rooms = await Room.find({home: homeData._id.toString()}).populate("jome");
        res.json({success: true, rooms});
        
    } catch (error) {
         res.json({success: false, message: error,message});
    }
}


//API to toggle availability of a room
export const toggleRoomsAvailability = async (req, res)=>{
    try {
        const { roomId } = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({success: true, message: "Room availability Updated" });
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}