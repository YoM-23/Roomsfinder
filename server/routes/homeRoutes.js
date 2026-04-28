import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHome } from "../controllers/homeController.js";

const homeRouter = express.Router();

// GET homes
homeRouter.get('/', (req, res) => {
  res.send("All homes");
});

homeRouter.post('/', protect, registerHome);

export default homeRouter;