import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  Image: String,
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  location: String,
  country: String,
  Image: String,
  menu: [menuItemSchema],
  ratings: Number,
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
      {
        name: "Butter Chicken",
        price: 260,
        description: "Creamy tomato gravy",
        Image: "/images/items/butter-chicken.jpg",
      },
      {
        name: "Paneer Tikka Masala",
        price: 220,
        description: "Char-grilled paneer, rich sauce",
        Image: "/images/items/paneer-tikka.jpg",
      },
      {
        name: "Chicken Biryani",
        price: 240,
        description: "Hyderabadi dum biryani",
        Image: "/images/items/chicken-bir.jpg",
      },
      {
        name: "Garlic Naan",
        price: 40,
        description: "Tandoor baked naan with garlic",
        Image: "/images/items/garlic-naan.jpg",
      },
    ],
    ratings: 4.3,
    Image: "/images/restaurants/spice-junc.jpg",
  },
  {
    name: "Annapurna Mess",
    cuisine: "South Indian",
    location: "Chennai",
    country: "India",
    menu: [
      {
        name: "Idli (2 pcs)",
        price: 30,
        description: "Soft steamed idlis",
        Image: "/images/items/idly.jpg",
      },
      {
        name: "Masala Dosa",
        price: 70,
        description: "Crispy dosa, potato stuffing",
        Image: "/images/items/mas-dosa.jpg",
      },
      {
        name: "Vada",
        price: 25,
        description: "Crunchy and savory",
        Image: "/images/items/vada.jpg",
      },
      {
        name: "Filter Coffee",
        price: 25,
        description: "Strong, local brew",
        Image: "/images/items/fil-coffee.jpg",
      },
    ],
    ratings: 4.7,
    Image: "/images/restaurants/annapurna-mess.jpg",
  },
  {
    name: "Roti & Kabab House",
    cuisine: "Mughlai",
    location: "Delhi",
    country: "India",
    menu: [
      {
        name: "Chicken Seekh Kabab",
        price: 180,
        description: "Minced chicken grilled on skewers",
        Image: "/images/items/chicken-seekh.jpg",
      },
      {
        name: "Mutton Rogan Josh",
        price: 320,
        description: "Rich Kashmiri curry",
        Image: "/images/items/rog-josh.jpg",
      },
      {
        name: "Rumali Roti",
        price: 20,
        description: "Thin and soft",
        Image: "/images/items/rum-roti.jpg",
      },
      {
        name: "Jeera Rice",
        price: 120,
        description: "Cumin flavored",
        Image: "/images/items/jeera-rice.jpg",
      },
    ],
    ratings: 4.1,
    Image: "/images/restaurants/Roti-and-kebab.jpg",
  },

  // ----------- USA -----------
  {
    name: "Burger Barn",
    cuisine: "American Fast Food",
    location: "New York",
    country: "America",
    menu: [
      {
        name: "Classic Cheeseburger",
        price: 8,
        description: "Cheddar, lettuce, onions",
        Image: "/images/items/cheese-burg.jpg",
      },
      {
        name: "Double Patty Burger",
        price: 12,
        description: "Two patties, house sauce",
        Image: "/images/items/d-patty.jpg",
      },
      {
        name: "Fries",
        price: 3,
        description: "Crispy and salted",
        Image: "/images/items/French_Fries.jpg",
      },
      {
        name: "Chocolate Shake",
        price: 5,
        description: "Thick & sweet",
        Image: "/images/items/chk-shake.jpg",
      },
    ],
    ratings: 4.0,
    Image: "/images/restaurants/burger-barn.jpg",
  },
  {
    name: "Pancake Station",
    cuisine: "American Breakfast",
    location: "Chicago",
    country: "America",
    menu: [
      {
        name: "Classic Pancakes",
        price: 7,
        description: "Maple syrup + butter",
        Image: "/images/items/pancke.jpg",
      },
      {
        name: "Chocolate Chip Pancakes",
        price: 9,
        description: "Chocolate drizzle",
        Image: "/images/items/chk-pancake.jpg",
      },
      {
        name: "Scrambled Eggs",
        price: 4,
        description: "Light and fluffy",
        Image: "/images/items/scrb-eggs.jpg",
      },
      {
        name: "Hash Browns",
        price: 4,
        description: "Crisp potato goodness",
        Image: "/images/items/hash-brn.jpg",
      },
    ],
    ratings: 4.3,
    Image: "/images/restaurants/pancake-stn.jpg",
  },
  {
    name: "WingStreet Grill",
    cuisine: "American Grill",
    location: "Houston",
    country: "America",
    menu: [
      {
        name: "BBQ Chicken Wings (6 pcs)",
        price: 11,
        description: "Smoked & glazed",
        Image: "/images/items/bbq-ch-wings.jpg",
      },
      {
        name: "Buffalo Wings (6 pcs)",
        price: 12,
        description: "Hot buffalo sauce",
        Image: "/images/items/buff-wings.jpg",
      },
      {
        name: "Loaded Nachos",
        price: 9,
        description: "Salsa + cheese + jalapeño",
        Image: "/images/items/nachos.jpg",
      },
      {
        name: "Mac & Cheese",
        price: 7,
        description: "Creamy cheddar pasta",
        Image: "/images/items/mac-cheese.jpg",
      },
    ],
    ratings: 3.9,
    Image: "/images/restaurants/WingStreet.jpg",
  },
];

(async () => {
  try {
    const count = await Restaurant.countDocuments();
    if (count === 0) {
      await Restaurant.insertMany(seedRestaurants);
      console.log("✅ Restaurants seeded successfully");
    }
  } catch (err) {
    console.log("Restaurant seed error:", err.message);
  }
})();
