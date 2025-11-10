import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import "../styling/Restaurant.css";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

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
    setFiltered(
      restaurants.filter((r) =>
        r.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  function handleCuisine(cuisine) {
    if (cuisine === "All") return setFiltered(restaurants);
    setFiltered(restaurants.filter((r) => r.cuisine === cuisine));
  }

  if (loading) return <div className="loading">Loading restaurants...</div>;

  return (
    <div className="restaurants-page">

      <div className="restaurants-header">
        <h1>Restaurants</h1>
        <p>Discover and order from places near you</p>
      </div>

      <div className="restaurants-topbar">
        <input
          type="text"
          placeholder="Search restaurants..."
          className="search-input"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div className="filter-chips">
          {["All", "Indian", "Chinese", "American", "Bakery"].map((c) => (
            <button key={c} onClick={() => handleCuisine(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="restaurants-container">
        {filtered.map((rest) => (
          <RestaurantCard key={rest._id} data={rest} />
        ))}
      </div>
    </div>
  );
}
