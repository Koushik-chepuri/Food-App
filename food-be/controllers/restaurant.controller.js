import { Restaurant } from "../models/restaurant.js";

export async function getAllRestaurants(req, res) {
  try {
    const { search, cuisine, page = 1, limit = 10, sort } = req.query;

    const query = {};

    // Normalize role casing just in case
    const role = req.user.role.toLowerCase();

    if (role === "admin") {
      if (req.query.country) query.country = req.query.country;
    } else {
      query.country = req.user.country;
    }

    // ---- Filtering ----
    if (cuisine) query.cuisine = { $regex: cuisine, $options: "i" };
    if (search) query.name = { $regex: search, $options: "i" };

    // ---- Pagination & Sorting ----
    const skip = (Number(page) - 1) * Number(limit);

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
      data: restaurants,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}
