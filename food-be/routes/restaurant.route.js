import express from "express";
import { getAllRestaurants } from "../controllers/restaurant.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getAllRestaurants);

export default router;
