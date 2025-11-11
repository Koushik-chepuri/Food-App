import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true }, // menu item _id
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  country: { type: String, required: true },

  items: [orderItemSchema],

  paymentMethod: { type: String, enum: ["UPI", "CARD", "COD"], required: true },

  status: {
    type: String,
    enum: ["PENDING_PAYMENT", "PAID", "FAILED", "CASH_ON_DELIVERY"],
    default: "PENDING_PAYMENT",
  },

  totalAmount: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
});


export const Order = mongoose.model("Order", orderSchema);
