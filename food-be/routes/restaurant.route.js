import express from "express";
import {
  getAllRestaurants,
  getRestaurantById,
} from "../controllers/restaurant.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getAllRestaurants);
router.get("/:id", protect, getRestaurantById);

export default router;
