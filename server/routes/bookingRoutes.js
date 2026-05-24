import express from 'express';
import { 
    checkAvailabilityAPI,
    createBooking,
    getHomeBookings,
    getUserBookings,
    payBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/home', protect, getHomeBookings);
bookingRouter.post('/pay', protect, payBooking);

export default bookingRouter;