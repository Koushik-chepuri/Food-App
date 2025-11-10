import { useNavigate } from "react-router-dom";
import "../styling/RestaurantCard.css";
import "../styling/Restaurant.css";

export default function RestaurantCard({ data }) {
  const { name, ratings, location, Image: image } = data;
  const navigate = useNavigate();

  return (
    <div className="restaurant-card" onClick={() => navigate(`/restaurants/${data._id}`)}>
      <div className="restaurant-img-wrapper">
        <img src={image} alt={name} className="restaurant-img" />
        <span className="rating-badge">⭐ {ratings}</span>
      </div>

      <div className="restaurant-details">
        <h3>{name}</h3>
        <p>{location}</p>
      </div>
    </div>
  );
}
