import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createOrUpdateOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protect, createOrUpdateOrder);

export default router;
