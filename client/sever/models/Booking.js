import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {type: String, ref: "User", required: true},
    room: {type: String, ref: "Room", required: true},
    home: {type: String, ref: "Home", required: true},
    checkInDate: {type: Data, required: true},
    checkOutDate: {type: Data, required: true},
    totalPrice: {type: Number, required: true},
    guests: {type: Number, required: true},
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancalled"],
        default: "pending",
    },
    paymentMethod: {
        type: String,
        required: true,
        default: "Pay At Home",
    },
    isPaid: {Type: Boolean, defualt: false}
    
},{timestamps: true});

const Booking = mongoose.model("Room", bookingSchema);

export default Booking;