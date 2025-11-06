import { Order } from "../models/order.js";
import { Restaurant } from "../models/restaurant.js";

export async function createOrUpdateOrder(req, res) {
  try {
    const { restaurantId, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items array is required" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    // Country restriction (Bonus Rule)
    if (req.user.role !== "Admin" && restaurant.country !== req.user.country) {
      return res.status(403).json({
        message: "You cannot order from restaurants in another country",
      });
    }

    // Find or create cart
    let order = await Order.findOne({
      user: req.user.id,
      restaurant: restaurantId,
      status: "cart",
    });

    if (!order) {
      order = await Order.create({
        user: req.user.id,
        restaurant: restaurantId,
        country: req.user.country,
        items: [],
      });
    }

    // Loop through each menu item
    for (const entry of items) {
      const { itemId, quantity = 1 } = entry;

      const menuItem = restaurant.menu.id(itemId);
      if (!menuItem)
        return res
          .status(404)
          .json({ message: `Menu item ${itemId} not found` });

      const existingItem = order.items.find(
        (i) => i.itemId.toString() === itemId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        order.items.push({
          itemId,
          name: menuItem.name,
          price: menuItem.price,
          quantity,
        });
      }
    }

    // Recalculate total
    order.totalAmount = order.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    await order.save();

    res.status(200).json({ status: "success", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function checkoutOrder(req, res) {
  try {
    const order = await Order.findOne({
      user: req.user.id,
      status: "cart",
    });

    if (!order) {
      return res.status(400).json({ message: "No cart found to checkout" });
    }

    if (req.user.role !== "Admin" && order.country !== req.user.country) {
      return res
        .status(403)
        .json({ message: "You cannot checkout orders from another country" });
    }

    order.status = "placed";
    await order.save();

    res.json({
      status: "success",
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
