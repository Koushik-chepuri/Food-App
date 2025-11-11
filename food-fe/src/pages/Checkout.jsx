import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
    const navigate = useNavigate();
  const { cart, total } = useCart();
  const [method, setMethod] = useState(null);

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <h3>Order Summary</h3>
      {cart.map((item) => (
        <p key={item._id}>
          {item.name} x {item.qty}
        </p>
      ))}

      <p><strong>Total:</strong> ₹{total}</p>

      <h3>Payment Method</h3>
      <div className="payment-selection">
        {["UPI", "CARD", "COD"].map((m) => (
          <label key={m}>
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

      <button
      disabled={!method}
      onClick={() => {
        const restaurantId = cart[0]?.restaurantId;
        if (!restaurantId) {
          alert("Restaurant ID missing. Add item again.");
          return;
        }
        navigate(`/payment?restaurant=${restaurantId}&method=${method}`);
      }}
    >
      Proceed to Pay
    </button>

    </div>
  );
}
