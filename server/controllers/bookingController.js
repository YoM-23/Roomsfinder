import transporter from "../configs/nodemailer.js";
import Booking from "../models/Booking.js"
import Home from "../models/Home.js";
import Room from "../models/Room.js";



//Function to check Availability of Room
const checkAvailability = async ({ checkInDate, checkOutDate, room })=>{
    try {
        const bookings = await Booking.find({
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
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        res.json({ success: true, isAvailable })
    } catch (error) {
         res.json({success: false, message: error.message})
    }
}



// API to create a new boooking
// POST /api/bookings/book

export const createBooking = async (req, res) =>{
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;

        //Before Booking Check Availability
        const isAvailable = await checkAvailability({
            checkInDate,
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
        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

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

        const mailOptions ={
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: 'Home Booking Details',
            html: `
            <h2> Your Booking Details</h2>
            <p>Dear ${req.user.username},</p>
            <p>Thank you for your booking! Here are your details:</p>
            <ul>
                <li><strong>Booking ID:</strong> ${booking._id}</li>
                 <li><strong>Home Name:</strong> ${roomData.home.name}</li>
                  <li><strong>Location:</strong> ${roomData.home.address}</li>
                   <li><strong>Date:</strong> ${booking.checkInDate.toDateString()}</li>
                    <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || '$'} ${booking.totalPrice} /night</li>
                    </ul>
                    <p>We look forward to Welcoming you!</p>
                     <p>If you need to make changes, feel free to contact us.</p>

            `
        }
        if (req.user && req.user.email) {
            await transporter.sendMail(mailOptions).catch(err => console.log("Mail error:", err));
        }

        res.json({ success: true, message: "Booking created successfully"})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to create booking"})
        
    }
}

//API to get all bookings f0r a user
//GET  /api/bookings/user
export const getUserBookings = async (req, res) =>{
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room home").sort({createdAt: -1})
        res.json({success: true, bookings})
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings"});
    }
}

export const getHomeBookings = async(req, res) =>{
    try {
     const home = await Home.findOne({owner: req.user._id});
    if(!home){
        return res.json({ success: false, message: "No Home found" });
    }
    const bookings = await Booking.find({home: home._id}).populate("room home user").sort({ createdAt: -1 });

    //Total Bookings
    const totalBookings = bookings.length;
    //Total Revenue
    const totalRevenue = bookings.reduce((acc, booking)=> acc + booking.totalPrice,0)

    res.json({success: true, dashboardData: {totalBookings, totalRevenue, bookings}})
   } catch (error) {
    res.json({success: false, message: "Failed to fetch bookings"})
    
   }
}

// API to mark a booking as paid (dummy payment handler)
// POST /api/bookings/pay
export const payBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        if(!booking){
            return res.json({ success: false, message: "Booking not found" });
        }
        
        booking.isPaid = true;
        await booking.save();
        
        res.json({ success: true, message: "Payment successful" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Payment failed" });
    }
}