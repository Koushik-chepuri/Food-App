import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import restaurantRoutes from "./routes/restaurant.route.js";
import orderRoutes from "./routes/order.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://food-app-z5dg.onrender.com",
    credentials: true,
  })
);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => res.send("API running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
