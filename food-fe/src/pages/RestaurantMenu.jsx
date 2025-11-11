import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "../styling/RestaurantMenu.css";

export default function RestaurantMenu({ setLoginOpen }) {
  const { id } = useParams();
  const { cart, addToCart, increaseQty, decreaseQty, clearCart } = useCart();
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
        <h1>{restaurant.name}</h1>
        <p className="menu-location">
          {restaurant.location} • ⭐ {restaurant.ratings}
        </p>

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
                  <div>
                    <h3>{item.name}</h3>
                    <p className="menu-price">₹ {item.price}</p>
                    <p className="menu-desc">{item.description}</p>
                  </div>
                </div>

                {!cartItem ? (
                  <button
                    className="add-btn"
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        setLoginOpen(true);
                        return;
                      }
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

      <div className="cart-sidebar">
        <h3>Your Cart</h3>

        {cart.length === 0 && <p>No items added.</p>}

        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <span>{item.name}</span>
            <span>x {item.qty}</span>
            <span>₹ {item.price * item.qty}</span>
          </div>
        ))}

        {cart.length > 0 && (
          <div className="cart-footer">
            <hr />
            <div className="cart-total">
              <span>Total:</span>
              <span>
                ₹ {cart.reduce((sum, item) => sum + item.price * item.qty, 0)}
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
