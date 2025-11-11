import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import "../styling/Restaurant.css";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  useEffect(() => {
    async function getRestaurants() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/restaurants", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const data = res.data.data || res.data;
        setRestaurants(data);
        setFiltered(data);
      } catch (err) {
        console.log("Error fetching restaurants:", err.message);
      } finally {
        setLoading(false);
      }
    }
    getRestaurants();
  }, []);

  function handleSearch(value) {
    setQuery(value);
    setSelectedCuisine("All");

    if (!value.trim()) return setFiltered(restaurants);

    const q = value.toLowerCase();
    const result = restaurants.filter((r) =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.menu.some((item) => item.name.toLowerCase().includes(q))
    );

    setFiltered(result);
  }

  function handleCuisine(cuisine) {
    setSelectedCuisine(cuisine);
    setQuery("");

    if (cuisine === "All") return setFiltered(restaurants);

    const result = restaurants.filter(
      (r) => r.cuisine.toLowerCase() === cuisine.toLowerCase()
    );

    setFiltered(result);
  }

  if (loading) return <div className="loading">Loading restaurants...</div>;

  const cuisines = [
    "All",
    "North Indian",
    "South Indian",
    "Mughlai",
    "Italian",
    "Cafe",
    "Healthy",
    "Desserts",
    "BBQ",
    "Japanese",
    "Deli",
    "Mexican",
    "American Breakfast",
    "Grill",
  ];

  return (
    <div className="restaurants-page">
      <div className="restaurants-header">
        <h1>Restaurants</h1>
        <p>Discover and satisfy your craving.</p>
      </div>

      <div className="restaurants-topbar">
  <input
    type="text"
    placeholder="Search restaurants, cuisines or dishes..."
    className="search-input"
    value={query}
    onChange={(e) => handleSearch(e.target.value)}
  />

  <div className="filter-block">
    {/* <label>Filter</label> */}
    <select
      className="cuisine-select"
      value={selectedCuisine}
      onChange={(e) => handleCuisine(e.target.value)}
    >
      {cuisines.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  </div>
</div>


      <div className="restaurants-container">
        {filtered.length > 0 ? (
          filtered.map((rest) => <RestaurantCard key={rest._id} data={rest} />)
        ) : (
          <div className="no-results">No restaurants match your search.</div>
        )}
      </div>

      {/* <footer className="site-footer">
        Forkit © 2025 — Made with <span className="love">❤️</span>
      </footer> */}
    </div>
  );
}
