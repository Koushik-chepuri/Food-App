import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/rbac.middleware.js";
import {
  createOrder,
  updatePaymentStatus,
  updatePaymentMethod,
  cancelOrder,
  getMyOrders,
  getAllOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getMyOrders);
router.get("/all", protect, authorize("Admin"), getAllOrders);
router.patch(
  "/:id/pay",
  protect,
  authorize("Admin", "Manager"),
  updatePaymentStatus
);
router.patch("/:id/method", protect, authorize("Admin"), updatePaymentMethod);
router.delete("/:id", protect, authorize("Admin", "Manager"), cancelOrder);


export default router;
