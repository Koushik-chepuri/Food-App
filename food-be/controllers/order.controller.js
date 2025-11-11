import { Order } from "../models/order.js";
import { Restaurant } from "../models/restaurant.js";

// CREATE ORDER (at checkout)
export async function createOrder(req, res) {
  try {
    const { restaurantId, items, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items array is required" });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: "Payment method is required" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Country Restriction (Bonus Rule)
    if (req.user.role !== "Admin" && restaurant.country !== req.user.country) {
      return res.status(403).json({
        message: "You cannot order from restaurants in another country",
      });
    }

    // Look up prices from restaurant menu
    const orderItems = items.map(entry => {
    const menuItem = restaurant.menu.id(entry.itemId);
    if (!menuItem) throw new Error(`Menu item ${entry.itemId} not found`);

    return {
        itemId: entry.itemId,
        name: menuItem.name,
        price: menuItem.price,
        quantity: entry.quantity
    };
    });

    // Now calculate total correctly
    const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
    );

    const order = await Order.create({
    user: req.user.id,
    restaurant: restaurantId,
    country: req.user.country,
    items: orderItems,
    paymentMethod,
    status: "PENDING_PAYMENT",
    totalAmount
    });

    res.status(201).json({ status: "success", data: order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// UPDATE PAYMENT STATUS (PAID / FAILED / CASH_ON_DELIVERY)
export async function updatePaymentStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["PAID", "FAILED", "CASH_ON_DELIVERY"].includes(status)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ status: "success", data: order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// UPDATE PAYMENT METHOD (Admin only)
export async function updatePaymentMethod(req, res) {
  try {
    const { id } = req.params;
    const { paymentMethod } = req.body;

    if (!["UPI", "CARD", "COD"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentMethod = paymentMethod;
    await order.save();

    res.json({ status: "success", data: order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// CANCEL ORDER (Admin & Manager)
export async function cancelOrder(req, res) {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "CANCELLED";
    await order.save();

    res.json({ status: "success", data: order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
