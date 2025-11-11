import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/rbac.middleware.js";
import {
  createOrder,
  updatePaymentStatus,
  updatePaymentMethod,
  cancelOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.patch(
  "/:id/pay",
  protect,
  authorize("Admin", "Manager"),
  updatePaymentStatus
);

router.patch("/:id/method", protect, authorize("Admin"), updatePaymentMethod);

router.delete("/:id", protect, authorize("Admin", "Manager"), cancelOrder);

export default router;
