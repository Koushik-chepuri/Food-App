import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createOrUpdateOrder,
  checkoutOrder,
  cancelOrder,
} from "../controllers/order.controller.js";
import { allowCheckout, authorize } from "../middlewares/rbac.middleware.js";

const router = express.Router();

router.post("/", protect, createOrUpdateOrder);
router.post("/checkout", protect, allowCheckout, checkoutOrder);
router.patch(
  "/:id/cancel",
  protect,
  authorize("Admin", "Manager"),
  cancelOrder
);

export default router;
