import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "../styling/Login.css";
import Navbar from "../components/Navbar";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      const { token, user } = res.data;
      login(user, token);
      navigate("/restaurants");
    } catch (err) {
      alert("Incorrect credentials. Try again.");
    }
  };

  return (
    <>
      {/* <Navbar /> */}

      <div className="auth-page">
        <div className="auth-card">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-sub">Login to continue your feast.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />

            <div className="password-field">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
            />

            <span
                className="toggle-eye"
                onClick={() => setShowPassword((prev) => !prev)}
            >
                {showPassword ?  "🚫👁" : "👁"}
            </span>
            </div>


            <button className="auth-btn">Login</button>
          </form>

          <p className="auth-alt">
            New here? <a href="/signup">Create an account</a>
          </p>
        </div>
      </div>
    </>
  );
}
