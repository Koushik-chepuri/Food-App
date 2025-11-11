import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "../styling/Signup.css";
import Navbar from "../components/Navbar";

export default function Signup() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const [country, setCountry] = useState("India");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/signup", { name, email, password, role, country });
      login(res.data.user, res.data.token);
      nav("/restaurants");
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  };

  return (
    <>
      <div className="auth-page">
        <div className="auth-card">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-sub">Join and begin your feast.</p>

          <form className="auth-form" onSubmit={submit}>
            <input
              className="auth-input"
              placeholder="Full Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />

            <input
              className="auth-input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <select className="auth-input" value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="member">Member</option>
            </select>

            <select className="auth-input" value={country} onChange={(e)=>setCountry(e.target.value)}>
              <option value="India">India</option>
              <option value="America">America</option>
            </select>

            <button className="auth-btn" type="submit">
              Signup
            </button>
          </form>

          {err && <div className="auth-error">{err}</div>}

          <p className="auth-alt">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </>
  );
}
