import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  location: String,
  country: String,
  menu: [menuItemSchema]
});

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// ------------ STATIC SEED DATA ------------

const seedRestaurants = [
  // ----------- INDIA -----------
  {
    name: "Spice Junction",
    cuisine: "North Indian",
    location: "Hyderabad",
    country: "India",
    menu: [
      { name: "Butter Chicken", price: 260, description: "Creamy tomato gravy" },
      { name: "Paneer Tikka Masala", price: 220, description: "Char-grilled paneer, rich sauce" },
      { name: "Chicken Biryani", price: 240, description: "Hyderabadi dum biryani" },
      { name: "Garlic Naan", price: 40, description: "Tandoor baked naan with garlic" }
    ]
  },
  {
    name: "Annapurna Mess",
    cuisine: "South Indian",
    location: "Chennai",
    country: "India",
    menu: [
      { name: "Idli (2 pcs)", price: 30, description: "Soft steamed idlis" },
      { name: "Masala Dosa", price: 70, description: "Crispy dosa, potato stuffing" },
      { name: "Vada", price: 25, description: "Crunchy and savory" },
      { name: "Filter Coffee", price: 25, description: "Strong, local brew" }
    ]
  },
  {
    name: "Roti & Kabab House",
    cuisine: "Mughlai",
    location: "Delhi",
    country: "India",
    menu: [
      { name: "Chicken Seekh Kabab", price: 180, description: "Minced chicken grilled on skewers" },
      { name: "Mutton Rogan Josh", price: 320, description: "Rich Kashmiri curry" },
      { name: "Rumali Roti", price: 20, description: "Thin and soft" },
      { name: "Jeera Rice", price: 120, description: "Cumin flavored" }
    ]
  },

  // ----------- USA -----------
  {
    name: "Burger Barn",
    cuisine: "American Fast Food",
    location: "New York",
    country: "America",
    menu: [
      { name: "Classic Cheeseburger", price: 8, description: "Cheddar, lettuce, onions" },
      { name: "Double Patty Burger", price: 12, description: "Two patties, house sauce" },
      { name: "Fries", price: 3, description: "Crispy and salted" },
      { name: "Chocolate Shake", price: 5, description: "Thick & sweet" }
    ]
  },
  {
    name: "Pancake Station",
    cuisine: "American Breakfast",
    location: "Chicago",
    country: "America",
    menu: [
      { name: "Classic Pancakes", price: 7, description: "Maple syrup + butter" },
      { name: "Chocolate Chip Pancakes", price: 9, description: "Chocolate drizzle" },
      { name: "Scrambled Eggs", price: 4, description: "Light and fluffy" },
      { name: "Hash Browns", price: 4, description: "Crisp potato goodness" }
    ]
  },
  {
    name: "WingStreet Grill",
    cuisine: "American Grill",
    location: "Houston",
    country: "America",
    menu: [
      { name: "BBQ Chicken Wings (6 pcs)", price: 11, description: "Smoked & glazed" },
      { name: "Buffalo Wings (6 pcs)", price: 12, description: "Hot buffalo sauce" },
      { name: "Loaded Nachos", price: 9, description: "Salsa + cheese + jalapeño" },
      { name: "Mac & Cheese", price: 7, description: "Creamy cheddar pasta" }
    ]
  }
];

// ------------ SEED: RUNS ONCE ------------

(async () => {
  try {
    const count = await Restaurant.countDocuments();
    if (count === 0) {
      await Restaurant.insertMany(seedRestaurants);
      console.log("✅ Restaurants seeded successfully");
    }
  } catch (err) {
    console.log("⚠️ Restaurant seed error:", err.message);
  }
})();
