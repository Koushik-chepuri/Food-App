import { Restaurant } from "../models/restaurant.js";

export async function getAllRestaurants(req, res) {
  try {
    const {
      search,
      cuisine,
      country,
      //   page = 1,
      //   limit = 10,
      sort = "name",
    } = req.query;

    const query = {};

    // Only apply region filter *if* user exists and is not admin
    if (req.user && req.user.role !== "Admin") {
      query.country = req.user.country;
    }

    // Filtering
    if (country) query.country = country;
    if (cuisine) query.cuisine = { $regex: cuisine, $options: "i" };
    if (search) query.name = { $regex: search, $options: "i" };

    // const skip = (page - 1) * limit;

    const restaurants = await Restaurant.find(query).sort(sort);

    const total = await Restaurant.countDocuments(query);

    res.json({
      status: "success",
      //   page: Number(page),
      //   pages: Math.ceil(total / Number(limit)),
      results: restaurants.length,
      total,
      data: restaurants,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function getRestaurantById(req, res) {
  try {
    const { id } = req.params;

    const query = { _id: id };

    if (req.user && req.user.role !== "Admin") {
      query.country = req.user.country;
    }

    const restaurant = await Restaurant.findOne(query);

    if (!restaurant) {
      return res.status(404).json({
        status: "fail",
        message: "Restaurant not found",
      });
    }

    res.json({
      status: "success",
      data: restaurant,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}
