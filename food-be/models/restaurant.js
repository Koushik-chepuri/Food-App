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
    ratings: 4.8,
    Image: "/images/restaurants/WingStreet.jpg",
  },

  {
    name: "La Pizzeria Napoli",
    cuisine: "Italian",
    location: "Mumbai",
    country: "India",
    menu: [
      {
        name: "Margherita Pizza",
        price: 320,
        description: "Tomato, basil, mozzarella",
        Image: "/images/items/marg-piz.jpg",
      },
      {
        name: "Pepperoni Pizza",
        price: 380,
        description: "Classic pepperoni + cheese",
        Image: "/images/items/pepp-piz.jpg",
      },
      {
        name: "Pasta Alfredo",
        price: 290,
        description: "Rich creamy sauce",
        Image: "/images/items/alfredo.jpg",
      },
      {
        name: "Garlic Bread",
        price: 90,
        description: "Baked fresh",
        Image: "/images/items/garlic-bread.jpg",
      },
    ],
    ratings: 4.4,
    Image: "/images/restaurants/pizz-napoli.jpg",
  },
  {
    name: "Brew & Bloom Café",
    cuisine: "Cafe",
    location: "Bangalore",
    country: "India",
    menu: [
      {
        name: "Cappuccino",
        price: 120,
        description: "Smooth & foamy",
        Image: "/images/items/cappuccino.jpg",
      },
      {
        name: "Iced Caramel Latte",
        price: 160,
        description: "Sweet + bitter harmony",
        Image: "/images/items/iced-caramel.jpg",
      },
      {
        name: "Veg Sandwich",
        price: 90,
        description: "Light & fresh",
        Image: "/images/items/sandwich.jpg",
      },
      {
        name: "Chocolate Brownie",
        price: 80,
        description: "Dense & indulgent",
        Image: "/images/items/brownie.jpg",
      },
    ],
    ratings: 4.6,
    Image: "/images/restaurants/bloom-cafe.jpg",
  },
  {
    name: "Fresh Leaf Bowls",
    cuisine: "Healthy",
    location: "Pune",
    country: "India",
    menu: [
      {
        name: "Greek Salad",
        price: 180,
        description: "Feta, olives, cucumber",
        Image: "/images/items/greek-salad.jpg",
      },
      {
        name: "Chicken Protein Bowl",
        price: 260,
        description: "Chicken + quinoa + greens",
        Image: "/images/items/protein-bowl.jpg",
      },
      {
        name: "Avocado Toast",
        price: 200,
        description: "Sourdough base",
        Image: "/images/items/avocado-toast.jpg",
      },
      {
        name: "Fruit Smoothie",
        price: 140,
        description: "Mixed berries",
        Image: "/images/items/smoothie.jpg",
      },
    ],
    ratings: 4.5,
    Image: "/images/restaurants/leaf-bowl.jpg",
  },
  {
    name: "Cream Cloud Ice Creams",
    cuisine: "Desserts",
    location: "Hyderabad",
    country: "India",
    menu: [
      {
        name: "Belgian Chocolate",
        price: 120,
        description: "Dark & silky",
        Image: "/images/items/bel-choc.jpg",
      },
      {
        name: "Strawberry Gelato",
        price: 110,
        description: "Fresh berry taste",
        Image: "/images/items/straw-gelato.jpg",
      },
      {
        name: "Vanilla Milkshake",
        price: 140,
        description: "Classic & smooth",
        Image: "/images/items/vanilla-shake.jpg",
      },
      {
        name: "Choco Lava Cake",
        price: 170,
        description: "Warm, gooey center",
        Image: "/images/items/lava-cake.jpg",
      },
    ],
    ratings: 4.8,
    Image: "/images/restaurants/cloud-ice.jpg",
  },
  {
    name: "The Royal Feast",
    cuisine: "Fine Dining",
    location: "Delhi",
    country: "India",
    menu: [
      {
        name: "Murgh Musallam",
        price: 580,
        description: "Rich Nawabi dish",
        Image: "/images/items/murg-musallam.jpg",
      },
      {
        name: "Shahi Paneer",
        price: 360,
        description: "Creamy regal taste",
        Image: "/images/items/shahi-paneer.jpg",
      },
      {
        name: "Kesar Pulao",
        price: 240,
        description: "Infused with saffron",
        Image: "/images/items/kesar-pulao.jpg",
      },
      {
        name: "Gulab Jamun",
        price: 120,
        description: "Warm & soft",
        Image: "/images/items/gulab-jamun.jpg",
      },
    ],
    ratings: 4.6,
    Image: "/images/restaurants/fine-dine.jpg",
  },
  {
    name: "El Camino Cantina",
    cuisine: "Mexican",
    location: "Austin",
    country: "America",
    menu: [
      {
        name: "Chicken Tacos",
        price: 9,
        description: "Soft tortillas, pico & lime",
        Image: "/images/items/chicken-tacos.jpg",
      },
      {
        name: "Beef Burrito",
        price: 12,
        description: "Beans, cheese, grilled beef",
        Image: "/images/items/beef-burrito.jpg",
      },
      {
        name: "Chips & Salsa",
        price: 4,
        description: "Fresh and crunchy",
        Image: "/images/items/chips-salsa.jpg",
      },
      {
        name: "Mexican Rice",
        price: 3,
        description: "Seasoned & fluffy",
        Image: "/images/items/mexican-rice.jpg",
      },
    ],
    ratings: 4.4,
    Image: "/images/restaurants/mexican.jpg",
  },
  {
    name: "Smokey Ridge BBQ",
    cuisine: "BBQ",
    location: "Nashville",
    country: "America",
    menu: [
      {
        name: "BBQ Ribs (Half Rack)",
        price: 15,
        description: "Slow smoked",
        Image: "/images/items/bbq-ribs.jpg",
      },
      {
        name: "Pulled Pork Sandwich",
        price: 9,
        description: "With slaw",
        Image: "/images/items/pulled-pork.jpg",
      },
      {
        name: "Cornbread",
        price: 3,
        description: "Buttery & warm",
        Image: "/images/items/cornbread.jpg",
      },
      {
        name: "Smoked Baked Beans",
        price: 4,
        description: "Sweet + smoky",
        Image: "/images/items/bbq-beans.jpg",
      },
    ],
    ratings: 4.6,
    Image: "/images/restaurants/bbq.jpg",
  },
  {
    name: "Green Fork Deli",
    cuisine: "Vegan",
    location: "San Francisco",
    country: "America",
    menu: [
      {
        name: "Quinoa Bowl",
        price: 10,
        description: "Veggies, herbs, tahini",
        Image: "/images/items/quinoa-bowl.jpg",
      },
      {
        name: "Avocado Wrap",
        price: 9,
        description: "Fresh & crisp",
        Image: "/images/items/avocado-wrap.jpg",
      },
      {
        name: "Sweet Potato Fries",
        price: 5,
        description: "Light seasoning",
        Image: "/images/items/sweet-pot-fries.jpg",
      },
      {
        name: "Matcha Latte",
        price: 6,
        description: "Smooth & earthy",
        Image: "/images/items/matcha.jpg",
      },
    ],
    ratings: 4.2,
    Image: "/images/restaurants/deli.jpg",
  },
  {
    name: "Tokyo Street Kitchen",
    cuisine: "Japanese",
    location: "Seattle",
    country: "America",
    menu: [
      {
        name: "Salmon Sushi Roll",
        price: 11,
        description: "Fresh cut salmon",
        Image: "/images/items/salmon-roll.jpg",
      },
      {
        name: "Chicken Ramen",
        price: 13,
        description: "Slow broth, soft noodles",
        Image: "/images/items/chicken-ramen.jpg",
      },
      {
        name: "Veg Gyoza",
        price: 6,
        description: "Pan-fried",
        Image: "/images/items/veg-gyoza.jpg",
      },
      {
        name: "Miso Soup",
        price: 3,
        description: "Classic & warm",
        Image: "/images/items/miso-soup.jpg",
      },
    ],
    ratings: 4.7,
    Image: "/images/restaurants/japanese.jpg",
  },
  {
    name: "Brooklyn Deli Co.",
    cuisine: "Deli",
    location: "New York",
    country: "America",
    menu: [
      {
        name: "Turkey Club Sandwich",
        price: 9,
        description: "Crisp lettuce + bacon",
        Image: "/images/items/turkey-club.jpg",
      },
      {
        name: "Pastrami Sub",
        price: 12,
        description: "NY classic",
        Image: "/images/items/pastrami.jpg",
      },
      {
        name: "Bagel w/ Cream Cheese",
        price: 5,
        description: "Fresh baked",
        Image: "/images/items/bagel.jpg",
      },
      {
        name: "Iced Tea",
        price: 3,
        description: "Strong + refreshing",
        Image: "/images/items/iced-tea.jpg",
      },
    ],
    ratings: 4.5,
    Image: "/images/restaurants/brook-deli.jpg",
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
