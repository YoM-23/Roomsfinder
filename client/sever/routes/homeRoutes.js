import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHome } from "../controllers/homeController.js";

const homeRouter = express.Router();

homeRouter.post('/', protect, registerHome);

export default homeRouter;