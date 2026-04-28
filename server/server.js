import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import homeRouter from "./routes/homeRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
<<<<<<< HEAD

=======
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46

connectDB()
connectCloudinary();

const app = express()
app.use(cors({ origin: true, credentials: true })) //Enable Cross-Origin Resource Sharing

//Middleware
app.use(express.json())
<<<<<<< HEAD
app.use(clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY
}))
=======
app.use(clerkMiddleware({ secretKey: process.env.CLERK_SECRET_KEY }))
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46

//API to listen to clerk webhooks
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res)=> res.send("API is working"))
app.use('/api/user', userRouter)
app.use('/api/homes', homeRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)
<<<<<<< HEAD

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));


// import express from "express"
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from '@clerk/express'
// import clerkWebhooks from "./controllers/clerkWebhooks.js";
// import userRouter from "./routes/userRoutes.js";
// import homeRouter from "./routes/homeRoutes.js";
// import connectCloudinary from "./configs/cloudinary.js";
// import roomRouter from "./routes/roomRoutes.js";
// import bookingRouter from "./routes/bookingRoutes.js";


// connectDB()
// connectCloudinary();

// const app = express()
// app.use(cors()) //Enable Cross-Origin Resource Sharing


// //Middleware
// app.use(express.json())
// app.use(clerkMiddleware())

// //API to listen to clerk webhooks
// app.use("/api/clerk", clerkWebhooks);

// app.get('/', (req, res)=> res.send("API is working"))
// app.use('/api/user', userRouter)
// app.use('/api/homes', homeRouter)
// app.use('/api/rooms', roomRouter)
// app.use('/api/bookings', bookingRouter)

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

=======

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err.stack);
    res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
    if (!process.env.MONGODB_URI) console.error("CRITICAL: MONGODB_URI is missing!");
    if (!process.env.CLERK_SECRET_KEY) console.error("CRITICAL: CLERK_SECRET_KEY is missing!");
});
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46
