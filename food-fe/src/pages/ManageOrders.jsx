import { useEffect, useState } from "react";
import axios from "axios";
import "../styling/ManageOrders.css";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/currency";

export default function ManageOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data.data);
    }
    fetchOrders();
  }, []);

  const updatePayment = async (id, paymentMethod) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/orders/${id}/method`,
        { paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(prev =>
        prev.map(o => (o._id === id ? { ...o, paymentMethod } : o))
      );
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  const cancelOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update UI immediately
      setOrders(prev =>
        prev.map(o => (o._id === id ? { ...o, status: "CANCELLED" } : o))
      );
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  if (!user || user.role !== "Admin") return <h2>Access Denied</h2>;

  return (
    <div className="manage-orders-container">
      <h2>Manage Orders</h2>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Restaurant</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Change</th>
            <th>Cancel</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.restaurant?.name}</td>
              <td>{order.user?.email}</td>
              <td>{formatPrice(order.totalAmount, user.country)}</td>

              <td>{order.status.replace(/_/g, " ")}</td>

              <td>{order.paymentMethod}</td>

              <td>
                {order.status === "PENDING_PAYMENT" ? (
                  <select
                    className="payment-select"
                    value={order.paymentMethod}
                    onChange={(e) => updatePayment(order._id, e.target.value)}
                    >
                    <option value="COD">COD</option>
                    <option value="UPI">UPI</option>
                    <option value="CARD">CARD</option>
                    </select>

                ) : (
                  <span className="no-change">—</span>
                )}
              </td>

              <td>
                {order.status !== "CANCELLED" ? (
                  <button className="btn-cancel" onClick={() => cancelOrder(order._id)}>
                    Cancel
                  </button>
                ) : (
                  <span className="cancelled-text">Cancelled</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
