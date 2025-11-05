import { Order } from "../models/order.js";
import { Restaurant } from "../models/restaurant.js";

export async function createOrUpdateOrder(req, res) {
  try {
    const { restaurantId, itemId, quantity = 1 } = req.body;

    // Verify restaurant exists and matches user country (bonus restriction)
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    // If user is not admin, they may only order from restaurants in their country
    if (req.user.role !== "Admin" && restaurant.country !== req.user.country) {
      return res.status(403).json({ message: "Access denied: Different country" });
    }

    // Find or create an active cart for this user & restaurant
    let order = await Order.findOne({
      user: req.user.id,
      restaurant: restaurantId,
      status: "cart"
    });

    if (!order) {
      order = await Order.create({
        user: req.user.id,
        restaurant: restaurantId,
        country: req.user.country,
        items: []
      });
    }

    // Get the menu item from restaurant
    const menuItem = restaurant.menu.id(itemId);
    if (!menuItem) return res.status(404).json({ message: "Menu item not found" });

    // Check if item already in cart
    const existing = order.items.find(i => i.itemId.toString() === itemId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      order.items.push({
        itemId,
        name: menuItem.name,
        price: menuItem.price,
        quantity
      });
    }

    // Update total
    order.totalAmount = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    await order.save();

    res.status(200).json({ status: "success", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
