import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";
import "../styling/Checkout.css";
import { useAuth } from "../context/AuthContext";
import axios from "axios"; // ✅ YOU FORGOT THIS

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cart, total } = useCart();
  const [method, setMethod] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");

  const restaurantId = cart[0]?.restaurantId;

  useEffect(() => {
    if (!restaurantId) return;

    async function fetchRestaurant() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/restaurants/${restaurantId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRestaurantName(res.data.data.name);
      } catch (err) {
        console.log("Failed to load restaurant:", err);
      }
    }

    fetchRestaurant();
  }, [restaurantId]);

  if (!user) return null;

  return (
    <div className="checkout-root">
      <div className="checkout-card">
        <h2 className="checkout-title">Checkout</h2>

        {restaurantName && (
          <p className="restaurant-info">
            From: <span>{restaurantName}</span>
          </p>
        )}

        <div className="summary">
          <h3 className="section-title">Order Summary</h3>

          <div className="items">
            {cart.map((item) => (
              <div key={item._id} className="item-row">
                <div className="item-left">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">x {item.qty}</span>
                </div>

                <span className="item-line-total">
                  {formatPrice(
                    Number(item.price) * Number(item.qty),
                    user.country
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="total-row">
            <span>Total</span>
            <strong>{formatPrice(total, user.country)}</strong>
          </div>
        </div>

        <div className="payment-method">
          <h3 className="section-title">Payment Method</h3>

          <div className="method-options">
            {["UPI", "CARD", "COD"].map((m) => (
              <label
                key={m}
                className={`method ${method === m ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="method"
                  value={m}
                  onChange={() => setMethod(m)}
                />
                {m}
              </label>
            ))}
          </div>
        </div>

        <button
          className="btn-olive checkout-btn"
          disabled={!method}
          onClick={() =>
            navigate(`/payment?restaurant=${restaurantId}&method=${method}`)
          }
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}
