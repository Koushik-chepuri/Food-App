import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/currency";
import "../styling/MyOrders.css";

export default function MyOrders() {
  const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const API = import.meta.env.VITE_API_BASE;

    useEffect(() => {
      async function fetchOrders() {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`${API}/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOrders(res.data.data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
      fetchOrders();
    }, []);

    if (!user)
      return (
        <div className="full-loader">
          <div className="loader"></div>
        </div>
      );

    if (loading)
      return (
        <div className="full-loader">
          <div className="loader"></div>
        </div>
      );

  const canCancel = user.role === "Admin" || user.role === "Manager";

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API}/orders/${id}`,
        { status: "CANCELLED" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: "CANCELLED" } : o))
      );
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 && <p className="no-orders">No orders yet.</p>}

      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order._id} className="order-card">

            <div className="order-header">
              <h3 className="restaurant-name">{order.restaurant?.name}</h3>
              <span className={`badge ${order.status.toLowerCase()}`}>
                {order.status.replace(/_/g, " ")}
              </span>
            </div>

            <p className="order-total">{formatPrice(order.totalAmount, user.country)}</p>

            <div className="items-list">
              {order.items.map((item) => (
                <div key={item.itemId} className="item-row">
                  <span className="item-name">{item.name} <span className="item-qty">× {item.quantity}</span></span>
                  
                  <span className="item-price">{formatPrice(item.price, user.country)}</span>
                </div>
              ))}
            </div>

            {canCancel && !["CANCELLED", "FAILED"].includes(order.status) && (
              <button className="btn-cancel" onClick={() => handleCancel(order._id)}>
                Cancel Order
              </button>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
