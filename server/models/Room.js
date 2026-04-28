import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
<<<<<<< HEAD
    home: {type: String, ref: "Home", required: true},
    roomType: {type: String, required: true},
    pricePerNight: {type: Number, required: true},
    amenities: {type: Array, required: true},
    images: [{type: String }],
    isAvailable: {type: Boolean, default: true },
=======
    home: {type: String, ref: "Home", required: true },
    roomType: {type: String, required: true },
    pricePerNight: {type: Number, required: true },
    amenities: {type: Array, required: true },
    images: [{type: String }],

     isAvailable: {type: Boolean, default: true },
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46
    
},{timestamps: true});

const Room = mongoose.model("Room", roomSchema);

export default Room;