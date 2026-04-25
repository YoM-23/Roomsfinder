import express from 'express';
import { checkAvailabilityAPI, createBooking, getHomeBookings, getUserBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getUserData } from '../controllers/userController.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/home', protect, getHomeBookings);

export default bookingRouter;