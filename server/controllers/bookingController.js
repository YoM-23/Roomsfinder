import Booking from "../models/Booking.js";
import Home from "../models/Home.js";
import Room from "../models/Room.js";

//Function to check Availability of Room
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: new Date(checkOutDate) },
            checkOutDate: { $gte: new Date(checkInDate) },
        });
        return bookings.length === 0;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

//API to check availability of room
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        res.json({ success: true, isAvailable })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// API to create a new booking
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;

        //Before Booking Check Availability
        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room
        });

        if (!isAvailable) {
            return res.json({ success: false, message: "Room is not available" })
        }

        //Get totalPrice from Room
        const roomData = await Room.findById(room).populate("home");
        if (!roomData) return res.json({ success: false, message: "Room not found" });

        let totalPrice = roomData.pricePerNight;

        // Calculate totalPrice based on nights
        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24)) || 1;

        totalPrice *= nights;

        const booking = await Booking.create({
            user,
            room,
            home: roomData.home._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })

        res.json({ success: true, message: "Booking created successfully", booking })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export const getHomeBookings = async (req, res) => {
    try {
        const homeData = await Home.findOne({ owner: req.auth.userId });
        if (!homeData) {
            return res.json({ success: false, message: "No Home found" });
        }
        const bookings = await Booking.find({ home: homeData._id })
            .populate("room")
            .populate("home")
            .populate("user")
            .sort({ createdAt: -1 });

        //Total Bookings
        const totalBookings = bookings.length;
        //Total Revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)

        res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookings = await Booking.find({ user: userId })
            .populate("room")
            .populate("home")
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}