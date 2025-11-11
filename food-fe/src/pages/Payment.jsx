import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api/axios";

export default function Payment() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const method = query.get("method");
  const restaurantId = query.get("restaurant");
  const { cart, clearCart } = useCart();
  const [status, setStatus] = useState("PROCESSING");

  useEffect(() => {
    async function pay() {
      try {
        if (!restaurantId || !method || cart.length === 0) {
          setStatus("FAILED");
          return;
        }

        const items = cart.map(i => ({
        itemId: i._id,
        quantity: i.qty
        }));


        // CREATE ORDER
        const res = await api.post("/orders", {
          restaurantId,
          items,
          paymentMethod: method
        });
        const orderId = res.data.data._id;

        // SIMULATE PAYMENT → update status (requires Admin/Manager per RBAC)
        if (method === "COD") {
          await api.patch(`/orders/${orderId}/pay`, { status: "CASH_ON_DELIVERY" });
          setStatus("SUCCESS");
        } else {
          // pretend gateway success
          await api.patch(`/orders/${orderId}/pay`, { status: "PAID" });
          setStatus("SUCCESS");
        }

        clearCart();
      } catch (e) {
        setStatus("FAILED");
      }
    }
    pay();
  }, [restaurantId, method]);

  if (status === "PROCESSING") return <h2>Processing Payment...</h2>;
  if (status === "FAILED") {
    return (
      <div>
          <h2>Payment Failed!</h2>
          <p style={{ color: "#c00" }}>
          You are not authorized to complete payment.  
          Please contact an Admin or Manager to process this order.
          </p>
          <button onClick={() => navigate("/restaurants")}>
          Back to Restaurants
          </button>
      </div>
    );
  }
    
  return (
    <div>
      <h2>Payment Successful ✅</h2>
      <button onClick={() => navigate("/restaurants")}>Back to Restaurants</button>
    </div>
  );
}
