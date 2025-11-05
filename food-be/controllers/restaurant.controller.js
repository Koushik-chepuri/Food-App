import { Restaurant } from "../models/restaurant.js";

export async function getAllRestaurants(req, res) {
  try {
    const { search, cuisine, country, page = 1, limit = 10, sort } = req.query;

    const query = {};

    // ---- RBAC: Country Access ----
    // Admin sees everything
    // Manager & Member only see restaurants in THEIR country
    if (req.user.role !== "Admin") {
      query.country = req.user.country;
    }

    // ---- Filtering ----
    if (country) query.country = country; // admin may pass this
    if (cuisine) query.cuisine = { $regex: cuisine, $options: "i" };
    if (search) query.name = { $regex: search, $options: "i" };

    // ---- Pagination ----
    const skip = (Number(page) - 1) * Number(limit);

    // ---- Sorting ----
    // sort=name or sort=-name or sort=price etc
    const restaurants = await Restaurant.find(query)
      .sort(sort || "name")
      .skip(skip)
      .limit(Number(limit));

    const total = await Restaurant.countDocuments(query);

    res.status(200).json({
      status: "success",
      results: restaurants.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: restaurants
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}
