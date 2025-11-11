import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "../styling/Login.css"; // using same style base for auth pages

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Member"); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
        role, 
      });

      const { token, user } = res.data;
      login(user, token);

      navigate("/restaurants");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className="auth-page">
        <div className="auth-card">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-sub">Join the feast.</p>

          <form onSubmit={handleSubmit} className="auth-form">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-input"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />

            <select
              className="auth-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Member">Member</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>

            <button className="auth-btn" disabled={loading}>
              Sign Up
            </button>
          </form>

          <p className="auth-alt">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>

      {loading && (
        <div className="page-dim">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
