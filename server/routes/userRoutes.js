import express from "express";
import { protect } from "../middleware/authMiddleware.js";
<<<<<<< HEAD
import {
  getUserData,
  storeRecentSearchedCities,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUserData);
userRouter.post("/store-recent-search", protect, storeRecentSearchedCities);

export default userRouter;
=======
import { getUserData, storeRecentSearchedCities } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/', protect, getUserData);
userRouter.post('/store-recent-search', protect, storeRecentSearchedCities);



export default userRouter
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46
