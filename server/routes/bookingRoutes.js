import express from 'express';
import { 
    checkAvailabilityAPI,
    createBooking,
    getHomeBookings,
    getUserBookings,
    payBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
<<<<<<< HEAD

=======
import { getUserData } from '../controllers/userController.js';
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/home', protect, getHomeBookings);
bookingRouter.post('/pay', protect, payBooking);

export default bookingRouter;