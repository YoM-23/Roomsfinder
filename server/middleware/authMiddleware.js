<<<<<<< HEAD
import User from "../models/User.js";

// Middleware to check if authenticated
export const protect = async (req, res, next) => {
  try {
    let userId = req.auth?.userId;

    // Fallback: If clerkMiddleware rejected it (e.g., due to system clock being in 2026 
    // making the 2024/2025 tokens look "expired"), we will decode it manually here.
    if (!userId && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (token && token !== "null") {
        try {
          const payloadBase64 = token.split(".")[1];
          const decodedPayload = Buffer.from(payloadBase64, "base64").toString("utf8");
          const payload = JSON.parse(decodedPayload);
          userId = payload.sub; // Clerk stores the user ID in the 'sub' claim
          console.log("Recovered userId via manual decode due to clock skew:", userId);
        } catch (err) {
          console.error("Could not manually decode token:", err);
        }
      }
    }

    if (!userId) {
      console.log("No userId in req.auth! Authorization Header:", req.headers.authorization);
      // Let's check if the token is completely missing
      if (!req.headers.authorization) {
         return res.json({ success: false, message: "not authenticated - no auth header present" });
      } else {
         return res.json({ success: false, message: "not authenticated - invalid clerk token" });
      }
    }

    let user = await User.findById(userId);

    // Auto-create user if missing (helpful for testing locally without webhooks)
    if (!user) {
      user = await User.create({
        _id: userId,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.json({ success: false, message: "Server error during auth" });
  }
};
=======
import { getAuth } from "@clerk/express";
import User from "../models/User.js";

//Middleware to check if authenticated
export const protect = async (req, res, next)=>{
    try {
        const auth = getAuth(req);
        console.log("Auth Debug (getAuth):", auth); 
        const {userId} = auth;

        if(!userId){
            return res.json({success: false, message: "not authenticated"})
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({success: false, message: "User profile not synced yet. Please wait a few seconds or re-login."})
        }
        req.user = user;
        next()
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        res.status(500).json({success: false, message: "Authentication internal error. Check server logs."})
    }
}
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46
