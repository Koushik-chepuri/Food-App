import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import "../styling/Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const method = query.get("method");
  const restaurantId = query.get("restaurant");
  const { cart, clearCart } = useCart();

  const [status, setStatus] = useState("PROCESSING");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(10);

  const methodLabel = useMemo(() => {
    if (!method) return "N/A";
    return method.toUpperCase() === "COD"
      ? "Cash on Delivery"
      : method.toUpperCase();
  }, [method]);

  useEffect(() => {
    let cancelled = false;

    async function pay() {
      try {
        if (
          !restaurantId ||
          !method ||
          !Array.isArray(cart) ||
          cart.length === 0
        ) {
          setMessage("Missing details or empty cart. Can’t process payment.");
          setStatus("FAILED");
          return;
        }

        const items = cart.map((i) => ({
          itemId: i._id,
          quantity: i.qty,
        }));

        // Create order
        const res = await api.post("/orders", {
          restaurantId,
          items,
          paymentMethod: method,
        });

        const orderId = res?.data?.data?._id;
        if (!orderId) {
          setMessage("Order could not be created.");
          setStatus("FAILED");
          return;
        }

        if (method.toUpperCase() === "COD") {
          await api.patch(`/orders/${orderId}/pay`, {
            status: "CASH_ON_DELIVERY",
          });
        } else {
          await api.patch(`/orders/${orderId}/pay`, { status: "PAID" });
        }

        if (!cancelled) {
          clearCart();
          setMessage("Payment successful. Bon appétit.");
          setStatus("SUCCESS");
        }
      } catch (e) {
        const msg =
          e?.response?.status === 403
            ? "You’re not authorized to complete payment. Ask an Admin/Manager."
            : "Payment failed. Something went sideways.";
        if (!cancelled) {
          setMessage(msg);
          setStatus("FAILED");
        }
      }
    }

    pay();
    return () => {
      cancelled = true;
    };
  }, [restaurantId, method]);

  useEffect(() => {
    if (status !== "SUCCESS") return;
    const t = setInterval(() => setCountdown((s) => (s > 0 ? s - 1 : 0)), 1000);
    const to = setTimeout(() => navigate("/restaurants"), 10000);
    return () => {
      clearInterval(t);
      clearTimeout(to);
    };
  }, [status, navigate]);

  return (
    <div className="pay-root">
      <div className="pay-card">
        <header className="pay-header">
          <h1 className="pay-title">Payment</h1>
          <span
            className={`status-chip ${
              status === "SUCCESS"
                ? "chip-success"
                : status === "FAILED"
                ? "chip-failed"
                : "chip-processing"
            }`}
          >
            {status === "PROCESSING" && "Processing"}
            {status === "SUCCESS" && "Success"}
            {status === "FAILED" && "Failed"}
          </span>
        </header>

        <section className="pay-body">
          <div className="meta-row">
            <div className="meta">
              <span className="meta-label">Method</span>
              <span className="meta-value">{methodLabel}</span>
            </div>
            <div className="meta">
              <span className="meta-label">Items</span>
              <span className="meta-value">
                {Array.isArray(cart) ? cart.length : 0}
              </span>
            </div>
          </div>

          {status === "PROCESSING" && (
            <div className="process-block">
              <div className="loader" aria-label="loading" />
              <p className="muted">
                We’re creating your order and confirming payment…
              </p>
            </div>
          )}

          {status !== "PROCESSING" && (
            <div
              className={`result ${
                status === "SUCCESS" ? "result-success" : "result-failed"
              }`}
              role="alert"
              aria-live="polite"
            >
              {status === "SUCCESS" ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className="icon"
                >
                  <path
                    d="M20 7L9 18l-5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className="icon"
                >
                  <path
                    d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <p>{message}</p>
            </div>
          )}
        </section>

        <footer className="pay-footer">
          {status === "SUCCESS" ? (
            <button
              className="btn btn-olive"
              onClick={() => navigate("/restaurants")}
            >
              Back to Restaurants {countdown > 0 ? `(${countdown})` : ""}
            </button>
          ) : status === "FAILED" ? (
            <div className="btn-row">
              <button className="btn btn-ghost" onClick={() => navigate(-1)}>
                Go Back
              </button>
              <button
                className="btn btn-olive"
                onClick={() => navigate("/restaurants")}
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <button className="btn btn-ghost" disabled>
              Working…
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
