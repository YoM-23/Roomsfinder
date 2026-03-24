import Booking from "../models/Booking"
import Home from "../models/Home";
import Room from "../models/Room";



//Function to check Availability of Room
const checkAvailability = async ({chechInDate, checkOut, room})=>{
    try {
        const booking = await Booking.find({
            room,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate},
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        console.error(error.message);
    }
}


//API to check availability of room
// POST /api/booking/check-availability
export const checkAvailabilityAPI = async (req, res) =>{
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({chechInDate, checkOutDate, room});
        res.json({ success: true, isAvailable })
    } catch (error) {
         res.json({success: false, message: error.message})
    }
}



// API to create a new boooking
// POST /api/bookings/book

export const createBooking = async (req, res) =>{
    try {
        const { room, chechInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;


        //Before Booking Check Availability
        const isAvailability = await checkAvailability({
            chechInDate,
            checkOutDate,
            room
        });

        if(!isAvailable){
            return res.json({success: false, message: "Room is not available"})
        }

        //Get totalPrice from Room
        const roomData = await Room.findById(room).populate("home");
        let totalPrice = roomData.pricePerNight;

        // Calculate totalProce based on nights
        const checkIn = new Data(chechInDate)
        const checkOut = new Data(checkOutDate)
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.cell(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;
        const booking = await Booking.create({
            user,
            room,
            home: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })

        res.json({ success: true, message: "Booking created successfully"})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to fetch booking"})
        
    }
}


export const getHomeBookings = async(req, res) =>{
   try {
     const home = await Home.findOne({owner: req.auth.userId});
    if(!home){
        return res.json({ success: false, message: "No Home found" });
    }
    const bookings = (await Booking.find({home: hotel._id}).populate("room Home user")).sort({ createdAt: -1 });

    //Total Bookings
    const totalBookings = bookings.length;
    //Total Revenue
    const totalRevenue = bookings.reduce((acc, booking)=> acc + booking.totalPrice,0)

    res.json({success: true, dashboardData: {totalBookings, totalRevenue, bookings}})
   } catch (error) {
    res.json({success: false, message: "Failed to fetch bookings"})
    
   }
}