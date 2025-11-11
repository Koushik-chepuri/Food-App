import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";
import { useAuth } from "../context/AuthContext";
import "../styling/RestaurantMenu.css";

export default function RestaurantMenu({ setLoginOpen }) {
  const { id } = useParams();
  const { cart, addToCart, increaseQty, decreaseQty, clearCart } = useCart();
  const { user } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMenu() {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/restaurants/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRestaurant(res.data.data);
    }
    fetchMenu();
  }, [id]);

  useEffect(() => {
    clearCart();
  }, [id]);

  const placeOrder = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginOpen(true);
      return;
    }
    navigate(`/checkout?restaurant=${restaurant._id}`);
  };

  if (!restaurant) return <h2 className="loading">Loading menu...</h2>;

  return (
    <div className="menu-layout">
      <div className="menu-container">
        {/* Restaurant Header */}
        <div className="restaurant-header">
          <h1 className="restaurant-name">{restaurant.name}</h1>
          <p className="restaurant-meta">
            {restaurant.location} • ⭐ {restaurant.ratings}
          </p>
          <div className="restaurant-divider"></div>
        </div>

        {/* Menu */}
        <div className="menu-items">
          {restaurant.menu.map((item) => {
            const cartItem = cart.find((i) => i._id === item._id);

            return (
              <div key={item._id} className="menu-item-card">
                <div className="menu-item-left">
                  <img
                    src={item.Image}
                    alt={item.name}
                    className="menu-item-img"
                  />

                  <div className="menu-item-details">
                    <h3>{item.name}</h3>
                    <p className="menu-price">
                      {formatPrice(item.price, user.country)}
                    </p>
                    <p className="menu-desc">{item.description}</p>
                  </div>
                </div>

                {!cartItem ? (
                  <button
                    className="add-btn"
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) return setLoginOpen(true);
                      addToCart(item, restaurant._id);
                    }}
                  >
                    Add +
                  </button>
                ) : (
                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item._id)}>-</button>
                    <span>{cartItem.qty}</span>
                    <button onClick={() => increaseQty(item._id)}>+</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="cart-sidebar">
        <h3 className="cart-title">Your Cart</h3>

        {cart.length === 0 && <p className="cart-empty">No items added.</p>}

        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <span className="item-name">
              {item.name}
              <span className="item-qty"> x {item.qty}</span>
            </span>

            <span>{formatPrice(item.price * item.qty, user.country)}</span>
          </div>
        ))}

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>
                {formatPrice(
                  cart.reduce((sum, item) => sum + item.price * item.qty, 0),
                  user.country
                )}
              </span>
            </div>
            <button className="place-order-btn" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
